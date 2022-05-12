'use strict';

const { Contract } = require('fabric-contract-api');
const erc20 = require('./erc20');
const order = require('./order');


class mycontract extends Contract {

	// user contract

	// order contract
	async addOrder(ctx, houseid, user, price, arg) {
		return await order.addOrder(ctx, houseid, user, price, arg);
	}

	async getOrder(ctx, id) {
		return await order.getOrder(ctx, id);
	}

	async deleteOrder(ctx, id) {
		return await order.deleteOrder(ctx, id);
	}

	async getAllorder(ctx) {
		return await order.getAllorder(ctx);
	}

	// erc20 contract
	async tokenName(ctx) {
		return 'HotelToken';
	}
	async Symbol(ctx) {
		return 'HTN';
	}
	async InitLedger(ctx) {
		await erc20.updateBalance(ctx, 'totalSupply', 0);
	}

	async totalSupply(ctx) {
		return await erc20.totalSupply(ctx);
	}

	async balanceOf(ctx, user) {
		return  await erc20.balanceOf(ctx, user);
	}

	async initUser(ctx, user){
		await erc20.initUser(ctx, user);
	}

	async Mint(ctx, user, amount) {
		await erc20.mint(ctx, user, amount);
	}

	async transfer(ctx, from, to, amount) {
		await erc20.transfer(ctx, from, to, amount);
	}
	async getTokenList(ctx) {
		return await erc20.getAlltokenList(ctx);
	}



}

module.exports = mycontract;
