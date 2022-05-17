// eslint-disable-next-line strict
const utils = require('./utils');

const totalSupply = 'totalSupply';

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
	try{
		const r = await utils.readState(ctx, tokenkey(user));
		return parseInt(JSON.parse(r).value);
	}catch (e) {
		return  0;
	}
};

exports.totalSupply = async function(ctx){
	return this.balanceOf(ctx,totalSupply);
};
exports.mint = async function(ctx, user, amount){
	if (typeof amount === 'string'){
		amount = parseInt(amount);
	}

	await this.initUser(ctx, user);

	const prebalance = await this.balanceOf(ctx, user);
	await this.updateBalance(ctx, user, prebalance + amount);
	await this.updateBalance(ctx, totalSupply, (await this.totalSupply(ctx)) + amount);
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
	let r = await utils.getALlStatus(ctx, 'token');
	r = JSON.parse(r);
	let res = [];

	r.forEach(ele => {
		if (ele.key !== totalSupply){
			res.push(ele);
		}
	});

	return JSON.stringify(res);
};