import db from "./db";

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

      const res = await db.authenticate({ username, password }, config);
      const { operation_token: token, refresh_token } = res.data;

      const userRes = await db.findBy(
        process.env.NODE_ENV,
        "users",
        "username",
        username,
        config
      );

      const userObj = userRes.data[0];
      delete userObj.password;
      const finalObj = { ...userObj, token, refresh_token };
      return finalObj;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async signup({
    email,
    username,
    password,
    first_name,
    last_name,
    imgB64,
  }: any) {
    try {
      await db.createUser({
        username,
        password,
        first_name,
        last_name,
        imgB64,
        email,
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateProfile(
    id: string,
    changes: { first_name: string; last_name: string; bio: string },
    token: string
  ) {
    try {
      return db.updateOne(process.env.NODE_ENV, "users", id, changes, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default new AuthController();
