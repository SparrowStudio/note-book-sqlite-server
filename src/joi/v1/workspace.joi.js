/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-25 23:28:29
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-26 01:08:39
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

module.exports = {
	create_workspace,
	update_workspace,
	delete_workspace,
	read_workspace
};
