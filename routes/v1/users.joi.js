/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:56:58
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 12:52:56
 */
const Joi = require("joi");

const login = Joi.object({
	email: Joi.string()
		.email({
			// minDomainSegments: 2,
			tlds: { allow: ["com", "net"] }
		}).required(),
	password: Joi.string()
		.length(16).required()
});

module.exports = { login };
