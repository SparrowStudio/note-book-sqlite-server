/**
 * @Description:
 * @author: bubao
 * @Date: 2021-06-21 08:34:12
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 00:08:12
 */
const CherryId = require("cherry-id");

class GenId {
	constructor(log) {
		this.log = log;
	}

	static init(props = {}) {
		if (!this.instance) {
			if (isNaN(props.WorkerId)) {
				props.WorkerId = 1;
			}
			this.instance = new GenId(props.log || "");
			this.cherry = new CherryId(props);
		}

		return this.instance;
	}

	/**
     * 使用cherry-id生成唯一id
     * @returns {number} id
     */
	id() {
		return this.cherry.NextId();
	}
}

module.exports = GenId;
