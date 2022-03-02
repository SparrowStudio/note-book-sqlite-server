/**
 * @Description:
 * @author: bubao
 * @Date: 2022-02-19 13:01:28
 * @LastEditors: bubao
 * @LastEditTime: 2022-03-02 15:47:27
 */
const Joi = require("joi");

const login = Joi.object({
	email: Joi.string()
		.email({
			// minDomainSegments: 2,
			tlds: { allow: ["com", "net"] }
		})
		.required(),
	password: Joi.string()
		.length(16)
		.alphanum()
		.required()
});

module.exports = { login };
