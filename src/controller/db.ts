import client from "./http_client";

class Database {
  constructor() {}

  public async executeSQLQuery(query: string, config: any): Promise<any> {
    const command = {
      operation: "sql",
      sql: query,
    };

    return client.post("/", command, config);
  }

  public async authenticate(
    { username, password }: any,
    config: any
  ): Promise<any> {
    return client.post(
      "/",
      {
        operation: "create_authentication_tokens",
        username,
        password,
      },
      config
    );
  }

  public async createUser({
    username,
    password,
    first_name,
    last_name,
    imgB64,
  }: any) {
    try {
      await client.post(
        "/",
        {
          operation: "add_user",
          role: "helpinghand_user",
          username: username,
          password: password,
          active: true,
        },
        {
          auth: {
            username: process.env.REACT_APP_HARPERDB_USERNAME || "",
            password: process.env.REACT_APP_HARPERDB_PASSWORD || "",
          },
        }
      );
      await this.addOne(
        "users",
        {
          first_name,
          last_name,
          imgB64,
          username,
        },
        {
          auth: {
            username: process.env.REACT_APP_HARPERDB_USERNAME || "",
            password: process.env.REACT_APP_HARPERDB_PASSWORD || "",
          },
        }
      );

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async addOne(table: string, entry: any, config?: any): Promise<any> {
    return client.post(
      "/",
      {
        operation: "insert",
        schema: "development",
        table: table,
        records: [entry],
      },
      config
    );
  }

  public async findBy(
    table: string,
    key: string,
    value: any,
    config?: any,
    attributes: string[] = ["*"]
  ): Promise<any> {
    return client.post(
      "/",
      {
        operation: "search_by_value",
        schema: "development",
        table,
        search_attribute: key,
        search_value: value,
        get_attributes: attributes,
      },
      config
    );
  }
}

export default new Database();
