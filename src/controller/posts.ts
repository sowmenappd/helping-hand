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
}

export default new PostController();
