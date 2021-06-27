import db from "./db";

class PostController {
  constructor() {}

  private constructQueryByPostType(
    schema: string,
    myUsername: string,
    type: "help" | "social",
    orderBy: string,
    order: string
  ) {
    return `
    SELECT 
    DISTINCT posts.id, title, description, tags, username, author, datetimeISO, 
    connections.blocked, connections.friends 
    FROM ${schema}.posts 
    FULL OUTER JOIN ${schema}.connections 
    ON (posts.username = connections.user1 OR posts.username = connections.user2) 
    WHERE posts.type = \"${type}\" AND (connections.blocked = false OR NOT connections.blocked OR posts.username=\"${myUsername}\")
    ORDER BY posts.${orderBy} ${order};
    `;
  }

  private constructQueryForSearchKeywords(searchTerms: string[]) {
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
    orderBy: string = "__createdtime__",
    order: string = "DESC"
  ) {
    const query = this.constructQueryByPostType(
      process.env.NODE_ENV,
      ownUsername,
      type,
      orderBy,
      order
    );
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    return db.executeSQLQuery(query, config).then(({ data: posts }) => {
      let uniquePosts = posts.filter(
        (post: any, idx: Number, self: any) =>
          idx === self.findIndex((p: any) => p.id === post.id)
      );
      return uniquePosts;
    });
  }

  public async fetchPostMessages(post_id: string, token: string) {
    const sqlQuery = `SELECT * from ${process.env.NODE_ENV}.post_messages WHERE postId = \"${post_id}\" ORDER BY __createdtime__ ASC`;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    return db.executeSQLQuery(sqlQuery, config);
  }

  public async addPost(post: any, token: string) {
    console.log(post);
    return db.addOne("posts", post, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  public async addPostMessage(
    postId: string,
    postOwner: string,
    message: string,
    owner: string,
    firstTime: boolean,
    token: string
  ) {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    if (firstTime) {
      await db.addOne(
        "connections",
        { blocked: false, friends: false, user1: postOwner, user2: owner },
        config
      );
    }
    return db.addOne("post_messages", { postId, message, owner }, config);
  }

  public async search(query: string, token: string) {
    const constructedSQL = this.constructQueryForSearchKeywords(
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
