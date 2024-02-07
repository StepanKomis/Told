const bcrypt = require("bcrypt");

class Hash {
  constructor(salt) {
    this.saltRounds = salt || 10;
  }

  /**
   * Generates a hash using the bcrypt algorithm.
   * @param {string} string - The string to hash.
   * @returns {string} The hashed string.
   */
  async toHash(string) {
    try {
      const salt = await bcrypt.genSaltSync(this.saltRounds);
      const hash = await bcrypt.hashSync(string, salt);
      return hash;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Compares two strings to determine if they are the same.
   * @param {string} hash - The hash to compare.
   * @param {string} string - The string to compare against the hash.
   * @returns {boolean} `true` if the strings are the same, `false` otherwise.
   */
  async isSame(hash, string) {
    return await bcrypt.compareSync(string, hash);
  }

  /**
   * Sets the salt rounds for the hash algorithm.
   * @param {number} [salt=10] - The number of rounds to use for the salt.
   */
  setSalt(salt = 10) {
    this.saltRounds = salt;
  }
}

module.exports = Hash;
