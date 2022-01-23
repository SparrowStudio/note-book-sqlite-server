/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 16:59:02
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 17:39:38
 */
const jwt = require("jsonwebtoken");
function generateToken(paylod, expiresIn = 60 * 60 * 2) {
	return jwt.sign(paylod, "token", {
		expiresIn
	});
}

module.exports = generateToken;
