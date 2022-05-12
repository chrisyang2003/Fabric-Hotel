// eslint-disable-next-line strict
exports.Exists = async function(ctx, id) {
	const assetBuffer = await ctx.stub.getState(id);
	return assetBuffer && assetBuffer.length > 0;
};

exports.readState = async function (ctx, id) {
	const assetBuffer = await ctx.stub.getState(id);
	if (!assetBuffer || assetBuffer.length === 0) {
		throw new Error(`The asset ${id} does not exist`);
	}
	return assetBuffer.toString();
};

exports.putState = async function (ctx, id, content) {
	let r = await ctx.stub.putState(id, Buffer.from(JSON.stringify(content)));
	return r;
};

exports.deleteAsset = async function (ctx, id) {
	const exists = await this.Exists(ctx, id);
	if (!exists) {
		throw new Error(`The asset ${id} does not exist`);
	}
	return ctx.stub.deleteState(id);
};

exports.getALlStatus = async function(ctx){
	const allResults = [];
	const iterator = await ctx.stub.getStateByRange('', '');
	let result = await iterator.next();
	while (!result.done) {
		const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
		let record;
		try {
			record = JSON.parse(strValue);
		} catch (err) {
			console.log(err);
			record = strValue;
		}
		allResults.push(record);
		result = await iterator.next();
	}
	return allResults;
};



