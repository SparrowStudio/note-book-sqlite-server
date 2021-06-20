const CherryId = require("cherry-id");

class GenId {
	constructor(props = {}) {
		if (this.instance) {
			return this;
		}
		return GenId.init(props);
	}

	static init(props) {
		if (this.instance) {
			return this;
		}
		if (isNaN(props.WorkerId)) {
			props.WorkerId = 1;
		}
		this.instance = new CherryId(props);
		return this;
	}

	/**
     * 使用cherry-id生成唯一id
     * @returns {number} id
     */
	id() {
		return this.instance.NextId();
	}
}

module.exports = GenId;
