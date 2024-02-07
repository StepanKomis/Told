const Database = require("../Database");
const Hash = require("../Hash");
const db = new Database();
const hash = new Hash();

class Auth {
  /**
   * Register a new user
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @returns {boolean} Returns true if the user was registered, false if the username is already in use
   */
  async registerUser(username, password) {
    if (!this.validateInput([username])) return "Invalid input";
    if (await this.existingUser(username)) {
      return false;
    }
    password = await hash.toHash(password);
    db.insert("users", ["username", "password"], [username, password]);
    return true;
  }

  /**
   * Authenticate a user using their username and password
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @returns {number} The user ID if the authentication is successful, otherwise 0
   */
  async loginUser(username, password) {
    try {
      const user = await db.select(
        "users",
        ["id", "password"],
        'username = "' + username + '"'
      );

      if (user.length === 0) {
        // User not found
        return 0;
      }

      const isPasswordMatch = await hash.isSame(user[0].password, password);

      if (!isPasswordMatch) {
        // Incorrect password
        return 0;
      }
      return user[0].id;
    } catch (error) {
      // Handle other potential errors
      console.error("Error during login:", error);
      return 0;
    }
  }

  /**
   * Validate the input data
   * @param {Array} inputs - The input data to be validated
   * @returns {boolean} Returns true if the input is valid, false otherwise
   */
  validateInput(inputs) {
    return true;
  }

  /**
   * Check if a user with the given username already exists
   * @param {string} username - The username of the user
   * @returns {boolean} Returns true if the user exists, false otherwise
   */
  async existingUser(username) {
    const userData = await db.select(
      "users",
      ["id"],
      'username = "' + username + '"'
    );
    if (Array.isArray(userData) && userData.length === 0) {
      return false;
    }
    return true;
  }
}

module.exports = Auth;
