require("express-session");

module.exports = (session) => {
  session.SessionData = {
    userId: 0,
    username: "",
    isAuthenticated: false,
  };
};
