export const makeAuthConfigWithToken = (token: string) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export const getCredentialConfig = () => {
  return {
    auth: {
      username: process.env.REACT_APP_HARPERDB_USERNAME || "",
      password: process.env.REACT_APP_HARPERDB_PASSWORD || "",
    },
  };
};
