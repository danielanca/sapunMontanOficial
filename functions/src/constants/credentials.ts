export const adminUser = {
  email: "admin@riona.ro",
  password: "123"
};

const SessionIDs = ["ABCJWT", "ABCJWT"];
export const getSessionID = () => {
  return SessionIDs[0];
};

export const getAuthToken = (body: any) => {
  let authToken = JSON.parse(body);
  let TOKEN = authToken.authCookie;

  if (TOKEN === getSessionID()) {
    return true;
  } else return false;
};

export const emailAuth = {
  email: "somethingelse@gmail.com",
  password: "yuppassowrd"
};
