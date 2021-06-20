const express = require("express");
const router = express.Router();
const SqliteDB = require("../db/index");
// const { cherry } = require("../utils");

/**
 * 获取tags类型详情
 */
router.get("/type", async (req, res) => {
	try {
		const db = await SqliteDB.init();
		const list = await db.all("SELECT name, color, background, description, created_at, updated_at FROM tags_type");
		const result = {};
		list.forEach(value => {
			const { name, ...other } = value;
			result[name] = other;
		});
		res.json({ data: result });
	} catch (error) {
		console.log(error);
		res.json({ error: "xxx" });
	}
});

/**
 * 获取tags个数
 */
router.get("/", async (req, res) => {
	try {
		const db = await SqliteDB.init();
		const list = await db.all("SELECT COUNT(name) AS tatol FROM tags GROUP BY name");
		res.json({ data: list });
	} catch (error) {
		console.log(error);
		res.json({ error: "xxx" });
	}
});

/**
 * 新增 tags
 */
router.post("/type", async (req, res) => {
	try {
		const { name, color, background, description } = req.body;
		const db = await SqliteDB.init();
		const time = new Date().valueOf();
		const list = await db.run("INSERT INTO tags_type (name, color, background, description, created_at, updated_at) VALUES (?,?,?,?,?,?)", [name, color, background, description, time, time]);
		res.json({ data: list });
	} catch (error) {
		console.log(error);
		res.json({ error: "xxx" });
	}
});

/**
 * 新增 tags
 */
router.put("/type", async (req, res) => {
	try {
		const { name, color, background, description } = req.body;
		const db = await SqliteDB.init();
		const time = new Date().valueOf();
		const list = await db.run("INSERT INTO tags_type (name, color, background, description, updated_at) VALUES (?,?,?,?,?,?)", [name, color, background, description, time, time]);
		res.json({ data: list });
	} catch (error) {
		console.log(error);
		res.json({ error: "xxx" });
	}
});

module.exports = router;
