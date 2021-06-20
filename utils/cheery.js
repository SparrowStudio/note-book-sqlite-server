const CherryId = require("cherry-id");

class GenId {
	constructor(log) {
		this.log = log;
	}

	static init(props = {}) {
		if (!this.instance) {
			console.log("xxx");
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
