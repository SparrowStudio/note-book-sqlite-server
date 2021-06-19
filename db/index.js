const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");
// const { init } = require("../app");

class SqliteDB {
	constructor(filename) {
		if (this.instance) {
			return this.instance;
		}
		this.instance = SqliteDB.init(filename);
		return this.instance;
	}

	static init(filename) {
		if (this.instance) {
			return this.instance;
		}
		this.instance = sqlite.open({
			filename: filename || path.join(__dirname, "database.db"),
			driver: sqlite3.Database
		});
		return this.instance;
	}
}
module.exports = SqliteDB;
