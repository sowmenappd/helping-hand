import db from "./db";

class PostController {
  constructor() {}

  private constructQueryByType(schema: string, type: "help" | "social") {
    return `SELECT * FROM ${schema}.posts WHERE type = \"${type}\"`;
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
}

export default new PostController();
