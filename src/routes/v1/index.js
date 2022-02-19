/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:54:06
 * @LastEditors: bubao
 * @LastEditTime: 2022-02-19 13:08:05
 */
const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const usersRouter = require("./users");
const registerRouter = require("./register");
const workspaceRouter = require("./workspace");

router.use("/v1/auth", authRouter);
router.use("/v1/user", usersRouter);
router.use("/v1/register", registerRouter);
router.use("/v1/workspace", workspaceRouter);
// router.use("/v1//workspace_list/:user_id", workspaceRouter);
// router.use("/v1/app", workspaceRouter);
// router.use("/v1/view", workspaceRouter);
// router.use("/v1/doc", workspaceRouter);
// router.use("/v1/trash", workspaceRouter);
// router.use("/v1/sync", workspaceRouter);
// router.use("/v1/password_change", workspaceRouter);

module.exports = router;
