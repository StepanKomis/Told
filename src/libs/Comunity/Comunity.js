const Database = require("../Database");
const db = new Database();
class Comunity {
  constructor(identifyer) {
    if (typeof identifyer === "undefined") {
      return;
    }
    if (typeof identifyer === "string") {
      this.name = identifyer;
    } else if (typeof identifyer === "number") {
      this.name = identifyer.name;
    }
  }
  /**
   * Creates a new community with the given name and owner.
   * @param {string} name - The name of the community.
   * @param {number} ownerId - The ID of the owner of the community.
   * @returns {Promise<any>} - The result of the database operation.
   */
  async createNewComunity(name, ownerId) {
    if (await this.exists(name)) {
      throw new Error("already exists comunity with this name");
    }
    const result = await db.insert(
      "comunities",
      ["name", "admin"],
      [name, ownerId]
    );
    this.getComunityId();
    this.founder = ownerId;
    return result;
  }
  /**
   * Checks if a community with the given name exists in the database.
   * @param {string} name - The name of the community.
   * @returns {boolean} - Whether a community with the given name exists or not.
   */
  async exists(name) {
    if (await db.existingTable("comunities", 'name = "' + name + '"')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns the id of the community.
   * @param {string} name - The name of the community.
   * @returns {number} The id of the community.
   */
  async getComunityId(name) {
    if (!name) {
      name = this.name;
    }
    const result = await db.getId("comunities", 'name = "' + name + '"');
    this.id = result;
    return result;
  }
  /**
   * Returns the id of the community.
   * @returns {number} The id of the community.
   */
  getId() {
    return this.id;
  }
  /**
   * Sets the description of the community.
   * @param {string} desc - The description of the community.
   */
  async setDescription(desc) {
    this.description = desc;
    return await db.update(
      "comunities",
      ["description"],
      [this.description],
      "id = " + this.id
    );
  }
  /**
   * Loads the data of the community with the given name from the database.
   * @param {string} name - The name of the community.
   */
  async loadComunityData(name) {
    if (!this.id) {
      await this.getComunityId(name);
    }
    const comunityData = await db.select(
      "comunities",
      ["name", "description", "admin", "createdAt"],
      "id = " + this.id
    );
    this.admin = comunityData[0].admin;
    this.name = comunityData[0].name;
    this.description = comunityData[0].description;
    this.createdAt = comunityData[0].createdAt;
  }
  /**
   * Returns an object containing the data of the community.
   * @returns {object} The data of the community.
   */
  getComunityData() {
    return {
      id: this.getId(),
      name: this.getName(),
      description: this.getDescription(),
      admin: this.getAdmin(),
      createdAt: this.createdAt,
    };
  }
  /**
   * Returns the description of the community.
   * @returns {string} The description of the community.
   */
  getDescription() {
    return this.description;
  }
  /**
   * Returns the founder of the community.
   * @returns {number} The id of the founder of the community.
   */
  getAdmin() {
    return this.admin;
  }
  /**
   * Sets the name of the community.
   * @param {string} name - The name of the community.
   */
  setName(name) {
    this.name = name;
    db.update("comunities", ["name"], [this.name], "id = " + this.id);
  }
  /**
   * Returns the name of the community.
   * @returns {string} The name of the community.
   */
  getName() {
    return this.name;
  }
}

module.exports = Comunity;
