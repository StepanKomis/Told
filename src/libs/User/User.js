const Database = require("../Database");
const db = new Database();
const Auth = require("../Auth/Auth");
const auth = new Auth();
const Hash = require("../Hash");
const hash = new Hash();

class User {
  isLoggedIn = false;
  constructor(id) {
    this.id = id;

    this.initializeUserData();
  }
  /**
   * initializes the user's data
   */
  async initializeUserData() {
    try {
      const userData = await db.select(
        "users",
        ["username", "first_name", "last_name", "bio", "joinedAt"],
        "id = " + this.id
      );
      if (userData.length === 0) {
        throw new Error("User not found");
      }
      this.username = userData.username;
      this.first_name = userData.first_name || null;
      this.last_name = userData.last_name || null;
      this.bio = userData.bio || null;
      this.joinedAt = userData.joinedAt;
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Edits the user's password.
   * @param {string} password The user's new password.
   * @returns {boolean} Returns true if the password was changed, false otherwise.
   */
  async editPassword(password) {
    if (auth.loginUser(this.username, password) !== this.id) {
      return false;
    }
  }
  /**
   * Edits the user's password.
   * @param {string} password The user's new password.
   * @returns {boolean} Returns true if the password was changed, false otherwise.
   */
  /**
   * Edits the user's password.
   * @param {string} password The user's new password.
   * @returns {boolean} Returns true if the password was changed, false otherwise.
   */
  async createNewPassword(password) {
    password = await hash.toHash(password);
    db.update("users", ["password"], [password], "id = " + this.id);
    return true;
  }
  /**
   * Logs the user in.
   */
  logIn() {
    this.isLoggedIn = true;
  }
  /**
   * Logs the user out.
   */
  logOut() {
    this.isLoggedIn = false;
  }
}

module.exports = User;
