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

  async fetchUserStats(username: string, token: string) {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const handsCountQuery = `SELECT COUNT(id) as hands FROM ${process.env.NODE_ENV}.post_messages WHERE owner = "${username}"`;
      const friendsCountQuery = `SELECT COUNT(id) as friends FROM ${process.env.NODE_ENV}.post_messages WHERE owner = "${username}"`;
      const postsCountQuery = `SELECT COUNT(id) as posts FROM ${process.env.NODE_ENV}.posts WHERE username = "${username}"`;

      const data = await Promise.all([
        db.executeSQLQuery(handsCountQuery, config),
        db.executeSQLQuery(friendsCountQuery, config),
        db.executeSQLQuery(postsCountQuery, config),
      ]);

      const [handsCountData, friendsCountData, postsCountData] = data;
      const obj = {
        hands: handsCountData.data[0].hands,
        friends: friendsCountData.data[0].friends,
        posts: postsCountData.data[0].posts,
      };
      return obj;
    } catch (err) {
      console.log(err.message);
      Promise.reject(err);
    }
  }
}

export default new AuthController();
