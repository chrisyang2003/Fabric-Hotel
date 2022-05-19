/* eslint-disable quote-props */
'use strict';

const { Contract } = require('fabric-contract-api');
const erc20 = require('./erc20');
const order = require('./order');
const user = require('./user');
const privacy = require('./privacy');

class mycontract extends Contract {

	// init
	async InitLedger(ctx) {
		await erc20.updateBalance(ctx, 'totalSupply', 0);
		await erc20.updateBalance(ctx, 'hotelaccount', 0);

		await privacy.init(ctx);

		return ctx.stub.getTxID();
	}


	// user contract
	async reigster (ctx, pk, r, ext, enc_pk){
		await user.register(ctx, pk, r, ext, enc_pk);
		return ctx.stub.getTxID();
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

	async deleteUser(ctx, pk){
		await user.deleteUser(ctx, pk);
		return ctx.stub.getTxID();
	}

	// private token

	async commitCount(ctx){
		return privacy.commitCount(ctx);
	}

	async getAllCommit(ctx){
		return privacy.getAllCommit(ctx);
	}

	async privateMint(ctx, commit, value, enc){
		await privacy.mint(ctx, commit, '', parseInt(value), '', enc);
		return ctx.stub.getTxID();
	}

	async privatetotalSupply(ctx){
		return await privacy.totalSupply(ctx);
	}


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
		return ctx.stub.getTxID();
	}

	async addComment(ctx, orderno, grade, comment){
		await order.addComment(ctx, orderno, grade, comment);
		return ctx.stub.getTxID();
	}

	async getAllComment(ctx){
		return await order.getAllComment(ctx);
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
		return ctx.stub.getTxID();
	}

	async mint(ctx, user, amount) {
		await erc20.mint(ctx, user, amount);
		return ctx.stub.getTxID();
	}

	async transfer(ctx, from, to, amount) {
		await erc20.transfer(ctx, from, to, amount);
		return ctx.stub.getTxID();

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
