const conn = require("../database/connection");

class Database {
  /**
   *
   * @param {string} table - The name of the table to insert into.
   * @param {string[]} rows - The names of the columns to insert.
   * @param {string[]} values - The values to insert into the columns.
   * @returns {Promise<any>} A promise that resolves to the result of the query.
   */
  async insert(table, rows, values) {
    const query = await this.newInsertQuery(table, rows, values);
    return new Promise((resolve, reject) => {
      conn.query(query, (err, data) => {
        if (err) {
          console.error(err);
          reject(false);
        }
        resolve(true);
      });
    });
  }

  /**
   * Creates an SQL insert query.
   * @param {string} table - The name of the table to insert into.
   * @param {string[]} rows - The names of the columns to insert.
   * @param {string[]} values - The values to insert into the columns.
   * @returns {string} The SQL insert query.
   */
  async newInsertQuery(table, rows, values) {
    let query = "INSERT INTO " + table;
    query += "(" + this.addArrayToString(rows, ", ") + ") VALUES ";
    query += '("' + this.addArrayToString(values, '", "') + '");';
    return query;
  }

  /**
   *
   * @param {string} table
   * @param {string[]} rows
   * @param {string} condition
   */
  async select(table, rows, condition) {
    return new Promise((resolve, reject) => {
      const query = this.newSelectQuery(table, rows, condition);
      conn.query(query, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(data);
      });
    });
  }

  /**
   * @param {string} table
   * @param {string[] || string} rows
   * @param {string} condition
   */
  newSelectQuery(table, rows, condition) {
    let query = "SELECT ";
    if (typeof rows != "string") {
      rows = this.addArrayToString(rows, ", ");
    }
    query += rows;
    query += " FROM " + table;
    if (condition) {
      query += " WHERE " + condition;
    }
    return query;
  }

  /**
   *
   * @param {string[]} strArr
   * @param {string} spacer
   */
  addArrayToString(strArr, spacer) {
    /**
     *
     * @type {string}
     */
    let str = strArr[0];
    for (let i = 1; i < strArr.length; i++) {
      str += spacer + strArr[i];
    }
    return str;
  }

  /**
   *
   * @param {string[]} array1
   * @param {string[]} array2
   * @param {string} separator
   * @param {string} connection
   */
  valueParesToString(array1, array2, separator, connection) {
    if (array1.length !== array2.length) {
      throw new Error("Rows and values must have the same length");
    }
    let str = "";
    for (let i = 0; i < array1.length; i++) {
      str += array1[i] + connection + this.surroundByQuotes(array2[i]);
      if (i < array1.length - 1) {
        str += separator;
      }
    }
    return str;
  }
  /**
   * Surrounds a string with double quotes.
   * @param {string} str - The string to be surrounded.
   * @returns {string} The input string surrounded by double quotes.
   */
  surroundByQuotes(str) {
    return `"${str}"`;
  }
  /**
   *
   * @param {string} table
   * @param {string[]} rows
   * @param {string} condition
   */
  update(table, rows, values, condition) {
    return new Promise((resolve, reject) => {
      const query = this.newUpdateQuery(table, rows, values, condition);
      conn.query(query, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(data);
      });
    });
  }
  /**
   *
   * @param {string} table
   * @param {string[]} rows
   * @param {string} condition
   */
  newUpdateQuery(table, rows, values, condition) {
    let query = "UPDATE " + table;
    query += " SET ";
    query += this.valueParesToString(rows, values, ", ", " = ");
    query += " WHERE " + condition;
    return query;
  }
  /**
   * Checks if a table exists in the database based on a given condition.
   * @param {string} table - The name of the table to check.
   * @param {string} condition - The condition to check for.
   * @returns {boolean} Whether the table exists or not.
   */
  async existingTable(table, condition) {
    return new Promise((resolve, reject) => {
      let selectQuery = this.newSelectQuery(table, "1", condition);
      let query = "SELECT EXISTS (" + selectQuery + ");";
      conn.query(query, (err, data) => {
        if (err) {
          reject(false);
        }
        let result = data[0]["EXISTS (" + selectQuery + ")"];
        if (result === 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async getId(table, condition) {

    const data = await this.select(table, "id", condition);
    return data[0].id;
  }

}

module.exports = Database;
