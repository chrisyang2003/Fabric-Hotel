/* eslint-disable quote-props */
'use strict';

const { Contract } = require('fabric-contract-api');
const erc20 = require('./erc20');
const order = require('./order');
const user = require('./user');

class mycontract extends Contract {

	// init
	async InitLedger(ctx) {
		await erc20.updateBalance(ctx, 'totalSupply', 0);
		await erc20.updateBalance(ctx, 'hotelaccount', 0);
		return;
	}


	// user contract
	async reigster (ctx, pk, r, ext, enc_pk){
		await user.register(ctx, pk, r, ext, enc_pk);
	}

	async getAllUser(ctx){
		return await user.getALlUser(ctx);
	}

	async getUserCount(ctx){
		return await user.getUsercount(ctx);
	}

	async getUser(ctx, pk){
		return await user.getUser(ctx, pk);
	}

	// private token

	// 承诺总数

	// 已经公开序列号总数

	// 序列号列表

	// 发行量




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

	async payOrder(ctx, orderno, type, user){
		await order.payOrder(ctx, orderno, type, user);
	}

	// erc20 contract
	async tokenName(ctx) {
		return 'HotelToken';
	}
	async Symbol(ctx) {
		return 'HTN';
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

	async mint(ctx, user, amount) {
		await erc20.mint(ctx, user, amount);
	}

	async transfer(ctx, from, to, amount) {
		await erc20.transfer(ctx, from, to, amount);
	}
	async getTokenList(ctx) {
		return await erc20.getAlltokenList(ctx);
	}

	// test
	async hello(ctx){
		return 'Hello world';
	}

	async test(ctx, arg){
		return {
			'返回交易提案中指定的交易ID':ctx.stub.getTxID(),
			'返回交易提案中指定的通道ID':ctx.stub.getChannelID(),
			'交易创建的时间戳': ctx.stub.getDateTimestamp(),
			'typeof 时间戳': typeof ctx.stub.getDateTimestamp(),
			'返回交易的绑定信息，如一些临时信息，以避免重复性攻击':ctx.stub.getBinding(),
			'getTransient()':ctx.stub.getTransient(),
			'getArgs': ctx.stub.getArgs(),
			'typeof getArgs': typeof ctx.stub.getArgs(),
			'arg': arg,
			'typeof arg': typeof arg,
			// "返回与交易提案相关的签名身份信息":ctx.stub.getSignedProposal(),
			// "返回该交易提交者的身份信息":ctx.stub.getCreator(),
		};
	}


}

module.exports = mycontract;
