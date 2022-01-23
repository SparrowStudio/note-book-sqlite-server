/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:54:06
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 11:55:17
 */
const express = require("express");
const router = express.Router();

const usersRouter = require("./users");

router.use("/v1/users", usersRouter);

module.exports = router;
