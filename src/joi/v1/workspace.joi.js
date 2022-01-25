/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-25 23:28:29
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-26 02:19:59
 */
const Joi = require("joi");

const create_workspace = Joi.object({
	name: Joi.string().min(2).max(10).required(),
	description: Joi.string().required(),
	user_id: Joi.string().uuid().required()
});

const update_workspace = Joi.object({
	id: Joi.string().uuid(),
	name: Joi.string().min(2).max(10).required(),
	description: Joi.string().required(),
	user_id: Joi.string().uuid().required()
});

const delete_workspace = Joi.object({
	id: Joi.string().uuid()
});

const read_workspace = Joi.object({
	id: Joi.string().uuid()
});
const read_workspace_list = Joi.object({
	page: Joi.string().allow("").default(1).custom((value, helpers) => {
		console.log("value: " + value);
		if (!value) {
			return 1;
		}
		if (isNaN(value)) {
			return helpers.error("any.invalid");
		}
		return value - 0;
	}, "page must be a number"),
	size: Joi.string().allow("").default(10).custom((value, helpers) => {
		console.log("value: " + value);

		if (!value) {
			return 10;
		}
		if (isNaN(value)) {
			return helpers.error("any.invalid");
		}
		return value - 0;
	}, "size must be a number")
});

module.exports = {
	create_workspace,
	update_workspace,
	delete_workspace,
	read_workspace,
	read_workspace_list
};
