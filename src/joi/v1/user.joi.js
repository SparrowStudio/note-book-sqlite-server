/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-24 23:47:11
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 23:59:48
 */
const Joi = require("joi");

const update_user_info = Joi.object({
	name: Joi.string()
		.min(2)
		.max(10)
		.required()
});

const update_user_password = Joi.object({
	password: Joi.string()
		.length(16)
		.alphanum()
		.required()
});

const forgot_user_password = Joi.object({
	email: Joi.string()
		.email({
			// minDomainSegments: 2,
			tlds: { allow: ["com", "net"] }
		})
		.required(),
	captcha: Joi.string()
		.length(6)
		.alphanum()
		.required(),
	password: Joi.string()
		.length(16)
		.alphanum()
		.required()
});

const update_user_email = Joi.object({
	email: Joi.string()
		.email({
			// minDomainSegments: 2,
			tlds: { allow: ["com", "net"] }
		})
		.required(),
	captcha: Joi.string()
		.length(6)
		.alphanum()
		.required()
});
module.exports = {
	update_user_info,
	update_user_password,
	forgot_user_password,
	update_user_email
};
