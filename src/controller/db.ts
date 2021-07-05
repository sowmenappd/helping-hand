import client from "./http_client";
import { getCredentialConfig } from "./misc";

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

  public async refreshToken(refresh_token: string, config: any) {
    return client.post(
      "/",
      {
        operation: "refresh_operation_token",
        refresh_token,
      },
      config
    );
  }

  public async createUser({
    email,
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
        getCredentialConfig()
      );
      await this.addOne(
        process.env.NODE_ENV,
        "users",
        {
          first_name,
          last_name,
          imgB64,
          username,
          email,
        },
        getCredentialConfig()
      );

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async addOne(
    schema: string,
    table: string,
    entry: any,
    config?: any
  ): Promise<any> {
    return client.post(
      "/",
      {
        operation: "insert",
        schema: schema,
        table: table,
        records: [entry],
      },
      config
    );
  }

  public async updateOne(
    schema: string,
    table: string,
    id: string,
    entry: any,
    config?: any
  ): Promise<any> {
    return client.post(
      "/",
      {
        operation: "update",
        schema: schema,
        table: table,
        records: [{ ...entry, id }],
      },
      config
    );
  }

  public async findBy(
    schema: string,
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
        schema,
        table,
        search_attribute: key,
        search_value: value,
        get_attributes: attributes,
      },
      config
    );
  }

  public async deleteOne(
    schema: string,
    table: string,
    key: string,
    value: string,
    config: any
  ): Promise<any> {
    const query = `DELETE FROM ${schema}.${table} WHERE ${key} = ${value}`;
    return this.executeSQLQuery(query, config);
  }
}

export default new Database();
