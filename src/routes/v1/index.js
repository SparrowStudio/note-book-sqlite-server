/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:54:06
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-26 02:10:27
 */
const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const authRouter = require("./auth");
const registerRouter = require("./register");
const workspaceRouter = require("./workspace");

router.use("/v1/users", usersRouter);
router.use("/v1/auth", authRouter);
router.use("/v1/register", registerRouter);
router.use("/v1/workspace", workspaceRouter);

module.exports = router;
