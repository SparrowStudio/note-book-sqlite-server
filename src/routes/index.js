/**
 * @Description:
 * @author: bubao
 * @Date: 2021-06-19 12:47:41
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 11:55:59
 */
const express = require("express");
const router = express.Router();
const v1Router = require("./v1/index");
/* GET home page. */
router.get("/", function(req, res, next) {
	res.json({ title: "Express" });
});

router.use("/api", v1Router);

module.exports = router;
