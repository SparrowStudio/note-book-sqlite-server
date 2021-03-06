/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 22:45:28
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 22:50:32
 */
const { PrismaClient } = require("@prisma/client");

class Prisma {
	constructor() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = Prisma.init();
		return this.instance;
	}

	static init() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new PrismaClient();
		return this.instance;
	}
}
module.exports = Prisma;
