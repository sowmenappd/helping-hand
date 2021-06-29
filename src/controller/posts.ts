import db from "./db";

class PostController {
  constructor() {}

  private constructSearchPostsQueryBySearchKeywords(searchTerms: string[]) {
    const repeatFor = (attr: string, terms: string[]): string => {
      let sql = "";

      for (let i = 0; i < terms.length; i++) {
        if (terms[i] !== "") {
          sql +=
            `${attr} LIKE \"%${terms[i]}%\"` +
            (i === terms.length - 1 ? "" : " OR ");
        }
      }
      return sql;
    };

    const titlePatterns = repeatFor("title", searchTerms);
    const descPatterns = repeatFor("description", searchTerms);
    const tagPatterns = repeatFor("tags", searchTerms);

    const q = `SELECT * FROM ${process.env.NODE_ENV}.posts WHERE ${titlePatterns} or ${descPatterns} or ${tagPatterns}`;
    console.log(q);
    return q;
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

    const queryFetchAllowedFriendIds1 = `SELECT user1 as username, friends, blocked FROM ${process.env.NODE_ENV}.connections WHERE user2=\"${ownUsername}\" AND NOT blocked`;
    const queryFetchAllowedFriendIds2 = `SELECT user2 as username, friends, blocked FROM ${process.env.NODE_ENV}.connections WHERE user1=\"${ownUsername}\" AND NOT blocked`;

    return Promise.all([
      db.executeSQLQuery(queryFetchAllowedFriendIds1, config),
      db.executeSQLQuery(queryFetchAllowedFriendIds2, config),
    ])
      .then((values: any) => {
        const array1 = values[0].data;
        const array2 = values[1].data;
        const allIdsStringArray = [...array1, ...array2].map(
          (x) => `"${x.username}"`
        );

        const allIdsString = allIdsStringArray.toString();

        const queryFetchAllowedPosts = `
      SELECT DISTINCT
      posts.id, title, description, tags, username, author, datetimeISO, connections.friends, connections.blocked 
      FROM ${process.env.NODE_ENV}.posts
      LEFT JOIN ${process.env.NODE_ENV}.connections
      ON (connections.user1 = posts.username OR connections.user2 = posts.username) 
      WHERE (username IN (${allIdsString}) AND (connections.user1 = \"${ownUsername}\" OR connections.user2 = \"${ownUsername}\"))
      ORDER BY ${orderBy} ${order}
      ;
      `;

        return db
          .executeSQLQuery(queryFetchAllowedPosts, config)
          .then(async ({ data: otherPosts }: any) => {
            console.log("received", otherPosts);

            const queryMyPosts = `
            SELECT id, title, description, tags, username, author, datetimeISO
            FROM ${process.env.NODE_ENV}.posts WHERE username = \"${ownUsername}\" 
            `;

            const { data: myPosts } = await db.executeSQLQuery(
              queryMyPosts,
              config
            );
            return [...otherPosts, ...myPosts];
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
    OUTER JOIN ${process.env.NODE_ENV}.connections
    ON (connections.user1 = post_messages.owner OR connections.user2 = post_messages.owner)
    WHERE postId=\"${post.id}\" 
    GROUP BY post_messages.id, owner, message, replyTo, postId, connections.friends 
    ORDER BY post_messages.__createdtime__ ASC
    `;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    console.log(sqlQuery);
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
    ON (connections.user1 = post_messages.owner OR connections.user2 = post_messages.owner)
    WHERE postId="${post.id}" 
    AND 
    ((owner=\"${post.username}\" AND replyTo=\"${otherUser}\") 
    OR (owner=\"${otherUser}\" AND replyTo=\"${post.username}\")) 
    GROUP BY post_messages.id, owner, message, replyTo, postId, connections.friends
    ORDER BY post_messages.__createdtime__ ASC`;

    console.log(sqlQuery);
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
    return db.addOne(
      process.env.NODE_ENV,
      "connections",
      { blocked, friends, user1, user2 },
      config
    );
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

  public async search(query: string, token: string) {
    const constructedSQL = this.constructSearchPostsQueryBySearchKeywords(
      query.split(" ").filter((t) => t !== "")
    );
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    return db.executeSQLQuery(constructedSQL, config);
  }
}

export default new PostController();
