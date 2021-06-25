import client from "./http_client";
import Database from "./db";

class AuthController {
  constructor() {}

  async login({ username, password }: any) {
    try {
      const config = {
        auth: {
          username: process.env.REACT_APP_HARPERDB_USERNAME || "",
          password: process.env.REACT_APP_HARPERDB_PASSWORD || "",
        },
      };

      const res = await Database.authenticate({ username, password }, config);
      const { operation_token: token, refresh_token } = res.data;

      const userRes = await Database.findBy(
        "users",
        "username",
        username,
        config
      );

      const userObj = userRes.data[0];
      const finalObj = { ...userObj, token, refresh_token };
      return finalObj;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async signup({ username, password, first_name, last_name, imgB64 }: any) {
    try {
      await Database.createUser({
        username,
        password,
        first_name,
        last_name,
        imgB64,
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default new AuthController();
