import db from "./db";

class PostController {
  constructor() {}

  private constructQueryByType(schema: string, type: "help" | "social") {
    return `SELECT * FROM ${schema}.posts WHERE type = \"${type}\"`;
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

    const q = `SELECT * FROM development.posts WHERE ${titlePatterns} or ${descPatterns} or ${tagPatterns}`;
    console.log(q);
    return q;
  }

  public async fetchPosts(type: "help" | "social", token: string) {
    const query = this.constructQueryByType(process.env.NODE_ENV, type);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    return db.executeSQLQuery(query, config);
  }

  public async addPost(post: any, token: string) {
    console.log(post);
    return db.addOne("posts", post, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
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
