import client from "./http_client";

const login: any = async ({ username, password }: any) => {
  try {
    const res = await client.post(
      "/",
      {
        operation: "create_authentication_tokens",
        username,
        password,
      },
      {
        auth: {
          username: process.env.REACT_APP_HARPERDB_USERNAME || "",
          password: process.env.REACT_APP_HARPERDB_PASSWORD || "",
        },
      }
    );

    const { operation_token: token, refresh_token } = res.data;
    const userRes = await client.post(
      "/",
      {
        operation: "search_by_value",
        schema: "development",
        table: "users",
        search_attribute: "username",
        search_value: username,
        get_attributes: ["*"],
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const userObj = userRes.data[0];
    const finalObj = { ...userObj, token, refresh_token };
    return finalObj;
  } catch (err) {
    return Promise.reject(err);
  }
};

const signup: any = async ({
  username,
  password,
  first_name,
  last_name,
  imgB64,
}: any) => {
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
    await addOne(
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
};

const addOne: any = (table: string, entry: any, config?: any) => {
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
};

export default {
  addOne,
  login,
  signup,
};
