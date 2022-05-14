// eslint-disable-next-line strict
const utils = require('./utils');

function tokenkey(id){
	return 'token:' + id;
}


exports.initUser = async function(ctx, user) {
	if (!(await utils.Exists(ctx, tokenkey(user)))) {
		await this.updateBalance(ctx, user, 0);
	}
};

exports.updateBalance = async function(ctx, key, amount){
	await utils.putState(ctx, tokenkey(key), amount);
};

exports.balanceOf = async function(ctx, user){
	const r = await utils.readState(ctx, tokenkey(user));
	return parseInt(JSON.parse(r).value);
};

exports.totalSupply = async function(ctx){
	return this.balanceOf(ctx,'totalSupply');
};
exports.mint = async function(ctx, user, amount){
	if (typeof amount === 'string'){
		amount = parseInt(amount);
	}
	await this.initUser(ctx, user);
	await this.updateBalance(ctx, user, amount);
	await this.updateBalance(ctx, 'totalSupply', (await this.totalSupply(ctx)) + amount);
};

exports.transfer = async function(ctx, from, to, amount){
	if (amount < 0){
		throw new Error('amount < 0');
	}
	await this.initUser(ctx, from);
	await this.initUser(ctx, to);

	if (typeof amount === 'string'){
		amount = parseInt(amount);
	}

	let fromBalance = await this.balanceOf(ctx, from);
	if (fromBalance < amount) {
		throw new Error(`User ${from} does not have enough token`);
	}

	const newFrom = await this.balanceOf(ctx, from) - amount;
	const newTo = await this.balanceOf(ctx, to) + amount;

	await this.updateBalance(ctx, from, newFrom);
	await this.updateBalance(ctx, to, newTo);
};

exports.getAlltokenList = async function(ctx){
	return await utils.getALlStatus(ctx, 'token');
};