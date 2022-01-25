/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:54:06
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-26 00:41:58
 */
const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const authRouter = require("./auth");
const registerRouter = require("./register");
const worksapceRouter = require("./workspace");

router.use("/v1/users", usersRouter);
router.use("/v1/auth", authRouter);
router.use("/v1/register", registerRouter);
router.use("/v1/worksapce", worksapceRouter);

module.exports = router;
