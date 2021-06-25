import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_HARPERDB_HOST,
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err.response);
    if (err.response.status === 401) {
      return Promise.reject({
        message: "Invalid credentials. Please try again.",
      });
    } else if (err.response.status >= 500 && err.response.status <= 599) {
      return Promise.reject({
        message: "Cannot contact server. Please try again.",
      });
    }
    return Promise.reject(err);
  }
);

export default {
  post: client.post,
  get: client.get,
  put: client.put,
  patch: client.patch,
  delete: client.delete,
  head: client.head,
};
