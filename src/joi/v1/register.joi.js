/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-25 21:52:53
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-25 21:54:22
 */
const Joi = require("joi");

const register = Joi.object({
	name: Joi.string()
		.min(2)
		.max(10)
		.required(),
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

module.exports = {
	register
};
