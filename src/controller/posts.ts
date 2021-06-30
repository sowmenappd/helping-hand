import db from "./db";

class PostController {
  constructor() {}

  private constructSearchPostsQueryConditionsBySearchKeywords(
    searchTerms: string[]
  ) {
    const repeatFor = (attr: string, terms: string[]): string => {
      let sql = "";

      for (let i = 0; i < terms.length; i++) {
        if (terms[i] !== "") {
          sql +=
            `${attr} LIKE "%${terms[i]}%"` +
            (i === terms.length - 1 ? "" : " OR ");
        }
      }
      return sql;
    };

    const titlePatterns = repeatFor("title", searchTerms);
    const descPatterns = repeatFor("description", searchTerms);
    const tagPatterns = repeatFor("tags", searchTerms);

    const q = `${titlePatterns} or ${descPatterns} or ${tagPatterns}`;
    console.log("searchSQL", q);
    return q;
  }

  public async getBlockedUsernamesForUser(ownUsername: string, config: any) {
    const getBlocksQuery1 = `SELECT user2 as username FROM development.connections
    WHERE user1 = "${ownUsername}" AND blocked`;
    const getBlocksQuery2 = `SELECT user1 as username FROM development.connections
    WHERE user2 = "${ownUsername}" AND blocked`;
    return Promise.all([
      db.executeSQLQuery(getBlocksQuery1, config),
      db.executeSQLQuery(getBlocksQuery2, config),
    ]).then(([ids1, ids2]) => {
      const u1 = ids1.data.map((d: any) => d.username);
      const u2 = ids2.data.map((d: any) => d.username);
      return [...u1, ...u2];
    });
  }

  public async fetchPosts(
    type: "help" | "social",
    ownUsername: string,
    token: string,
    orderBy: string = "posts.__createdtime__",
    order: string = "DESC"
  ) {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const blockedIds = await this.getBlockedUsernamesForUser(
      ownUsername,
      config
    );
    const blockedIdsString = blockedIds.map((id) => `"${id}"`).toString();

    console.log("blockedIdsString", blockedIdsString);

    let fetchPostsQuery = `SELECT DISTINCT posts.id, title, posts.type, description, tags, username, author, datetimeISO, connections.friends FROM ${process.env.NODE_ENV}.posts LEFT JOIN ${process.env.NODE_ENV}.connections ON ((connections.user1 = posts.username AND connections.user2 = "${ownUsername}") OR (connections.user2 = posts.username AND connections.user1 = "${ownUsername}")) WHERE posts.type = "${type}"`;
    if (blockedIds.length > 0) {
      fetchPostsQuery += ` AND posts.username NOT IN (${blockedIdsString})`;
    }

    console.log(fetchPostsQuery);
    return db.executeSQLQuery(fetchPostsQuery, config).then((res) => res.data);
  }

  public async fetchPostMessages(post: any, token: string) {
    console.log(
      "Fetching all message for post",
      post.id,
      "owner",
      post.username
    );
    const sqlQuery = `
    SELECT DISTINCT
    post_messages.id, owner, message, replyTo, postId, connections.friends 
    FROM ${process.env.NODE_ENV}.post_messages 
    FULL OUTER JOIN ${process.env.NODE_ENV}.connections
    ON (connections.user1 = post_messages.owner OR connections.user2 = post_messages.owner)
    WHERE postId="${post.id}"
    AND ((connections.user1 = post_messages.owner AND connections.user2 = post_messages.replyTo) OR (connections.user2 = post_messages.owner AND connections.user1 = post_messages.replyTo))
    ORDER BY post_messages.__createdtime__ ASC
    `;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    console.log("fetchPostMessagesQuery", sqlQuery);
    return db.executeSQLQuery(sqlQuery, config);
  }

  public async fetchPostMessagesForParticipatingUser(
    post: any,
    otherUser: string,
    token: string
  ) {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const sqlQuery = `
    SELECT DISTINCT
    post_messages.id, owner, message, replyTo, postId, connections.friends
    FROM ${process.env.NODE_ENV}.post_messages 
    FULL OUTER JOIN ${process.env.NODE_ENV}.connections
    ON ((connections.user1 = post_messages.owner AND connections.user2 = post_messages.replyTo) OR (connections.user2 = post_messages.owner AND connections.user1 = post_messages.replyTo))
    WHERE postId="${post.id}" 
    AND 
    ((owner="${post.username}" AND replyTo="${otherUser}") 
    OR (owner="${otherUser}" AND replyTo="${post.username}")) 
    ORDER BY post_messages.__createdtime__ ASC`;

    console.log("fetchPostMessagesForParticipatingUserQuery", sqlQuery);
    return db.executeSQLQuery(sqlQuery, config);
  }

  public async addPost(post: any, token: string) {
    console.log(post);
    return db.addOne(process.env.NODE_ENV, "posts", post, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  public async addConnection(
    friends: boolean,
    blocked: boolean,
    user1: string,
    user2: string,
    token: string
  ) {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    // first search if connection exists
    const connectionExistsQuery = `SELECT id 
    FROM ${process.env.NODE_ENV}.connections
    WHERE (user1 = "${user1}" AND user2 = "${user2}") OR (user2 = "${user1}" AND user1 = "${user2}")
    `;
    const { data } = await db.executeSQLQuery(connectionExistsQuery, config);

    if (data.length >= 1) {
      console.log("connection exists update");
      return this.updateConnection(friends, blocked, user1, user2, token);
    } else {
      return db.addOne(
        process.env.NODE_ENV,
        "connections",
        { blocked, friends, user1, user2 },
        config
      );
    }
  }

  public async updateConnection(
    friends: boolean,
    blocked: boolean,
    user1: string,
    user2: string,
    token: string
  ) {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const query = `
    UPDATE ${process.env.NODE_ENV}.connections 
    SET friends = "${friends}", blocked = "${blocked}" 
    WHERE 
    (user1 = "${user1}" AND user2 = "${user2}") 
    OR 
    (user1 = "${user2}" AND user2 = "${user1}")
    `;
    return db.executeSQLQuery(query, config);
  }

  public async addPostMessage(
    postId: string,
    senderUsername: string,
    replyToUsername: string,
    message: string,
    firstTime: boolean,
    token: string
  ) {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    if (firstTime) {
      await this.addConnection(
        false,
        false,
        senderUsername,
        replyToUsername,
        token
      );
    }
    return db.addOne(
      process.env.NODE_ENV,
      "post_messages",
      { postId, message, owner: senderUsername, replyTo: replyToUsername },
      config
    );
  }

  public async search(query: string, ownUsername: string, token: string) {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const blockedIds = await this.getBlockedUsernamesForUser(
      ownUsername,
      config
    );
    const blockedIdsString = blockedIds.map((id) => `"${id}"`).toString();

    console.log("blockedIdsString", blockedIdsString);

    let searchPostsQuery = `SELECT DISTINCT posts.id, title, posts.type, description, tags, username, author, datetimeISO, connections.friends FROM ${process.env.NODE_ENV}.posts LEFT JOIN ${process.env.NODE_ENV}.connections ON ((connections.user1 = posts.username AND connections.user2 = "${ownUsername}") OR (connections.user2 = posts.username AND connections.user1 = "${ownUsername}")) WHERE posts.type = "help" AND `;
    if (blockedIds.length > 0) {
      searchPostsQuery += ` posts.username NOT IN (${blockedIdsString}) AND `;
    }

    const searchQueryConditions =
      this.constructSearchPostsQueryConditionsBySearchKeywords(
        query.split(" ").filter((t) => t !== "")
      );
    searchPostsQuery += searchQueryConditions;
    return db.executeSQLQuery(searchPostsQuery, config);
  }
}

export default new PostController();
