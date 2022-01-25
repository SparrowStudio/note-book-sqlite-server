/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:54:06
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-25 22:16:17
 */
const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const authRouter = require("./auth");
const registerRouter = require("./register");

router.use("/v1/users", usersRouter);
router.use("/v1/auth", authRouter);
router.use("/v1/register", registerRouter);

module.exports = router;
