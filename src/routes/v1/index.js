/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:54:06
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 23:22:28
 */
const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const authRouter = require("./auth");

router.use("/v1/users", usersRouter);
router.use("/v1/auth", authRouter);

module.exports = router;
