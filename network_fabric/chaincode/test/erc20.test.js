'use strict';
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const {Context} = require('fabric-contract-api');
const {ChaincodeStub, ClientIdentity} = require('fabric-shim');

const AssetTransfer = require('../lib/assetTransferEvents.js');

let assert = sinon.assert;
chai.use(sinonChai);

function getOrderno(_date) {
	const date = _date;
	let Y = date.getFullYear();
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return Y + M + D + h + m + s;
}

let sleep = function (time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
};

describe('Asset Transfer Events Tests', () => {
	let transactionContext, chaincodeStub, clientIdentity;

	beforeEach(() => {
		transactionContext = new Context();

		chaincodeStub = sinon.createStubInstance(ChaincodeStub);
		chaincodeStub.getMspID.returns('org1');
		transactionContext.setChaincodeStub(chaincodeStub);

		clientIdentity = sinon.createStubInstance(ClientIdentity);
		clientIdentity.getMSPID.returns('org1');
		transactionContext.clientIdentity = clientIdentity;

		chaincodeStub.putState.callsFake((key, value) => {
			if (!chaincodeStub.states) {
				chaincodeStub.states = {};
			}
			chaincodeStub.states[key] = value;
		});

		chaincodeStub.getState.callsFake(async (key) => {
			let ret;
			if (chaincodeStub.states) {
				ret = chaincodeStub.states[key];
			}
			return Promise.resolve(ret);
		});

		chaincodeStub.deleteState.callsFake(async (key) => {
			if (chaincodeStub.states) {
				delete chaincodeStub.states[key];
			}
			return Promise.resolve(key);
		});


		// getDateTimestamp mock
		chaincodeStub.getDateTimestamp.callsFake(() => {
			return new Date();
		});

		// trx mock
		chaincodeStub.getTxID.callsFake(() => {
			return '8ab8f29eda6985326159b4968ddf7daf1cafe4116fc0be3341dad98848f79d2b';
		});

		chaincodeStub.getStateByRange.callsFake(async () => {
			function* internalGetStateByRange() {
				if (chaincodeStub.states) {
					// Shallow copy
					const copied = Object.assign({}, chaincodeStub.states);

					for (let key in copied) {
						yield {key: key, value: copied[key]};
					}
				}
			}

			return Promise.resolve(internalGetStateByRange());
		});


	});
	describe('Test erc20', () => {
		it('should return success on info ', async () => {
			let assetTransfer = new AssetTransfer();
			expect('HotelToken').to.eql((await assetTransfer.tokenName(transactionContext)));
			expect('HTN').to.eql((await assetTransfer.Symbol(transactionContext)));
		});

		it('should return success on InitLedger ', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);
			expect(0).to.eq((await assetTransfer.balanceOf(transactionContext, 'totalSupply')));
			expect(0).to.eql(await assetTransfer.totalSupply(transactionContext));
		});

		it('should return error on InitLedger ', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);

			expect(0).to.eq((await assetTransfer.balanceOf(transactionContext, 'alice')));

		});

		it('should return success on InitLedger ', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);
			await assetTransfer.initUser(transactionContext, 'alice');
			expect(0).to.eq((await assetTransfer.balanceOf(transactionContext, 'alice')));
		});

		it('should return success on mint user alice ', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);

			await assetTransfer.mint(transactionContext, 'alice', 10);

			expect(10).to.eql((await assetTransfer.balanceOf(transactionContext, 'alice')));
			expect(10).to.eql((await assetTransfer.totalSupply(transactionContext)));

		});

		it('should return success on mint user alice twice ', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);

			await assetTransfer.mint(transactionContext, 'alice', 10);
			await assetTransfer.mint(transactionContext, 'alice', 10);

			expect(20).to.eql((await assetTransfer.balanceOf(transactionContext, 'alice')));
			expect(20).to.eql((await assetTransfer.totalSupply(transactionContext)));

		});
		it('should return error on transfer alice to bob', async () => {

			// chaincodeStub.putState.rejects('User alice does not have enough token');

			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);

			await assetTransfer.mint(transactionContext, 'alice', '10');

			expect(10).to.eql((await assetTransfer.balanceOf(transactionContext, 'alice')));
			expect(10).to.eql((await assetTransfer.totalSupply(transactionContext)));

			try {
				await assetTransfer.transfer(transactionContext, 'alice', 'bob', 11);
				assert.fail('transfer should have failed');
			} catch (err) {
				expect(err.message).to.equal('User alice does not have enough token');
			}
		});

		it('should return success on transfer alice to bob', async () => {

			// chaincodeStub.putState.rejects('User alice does not have enough token');

			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);

			await assetTransfer.mint(transactionContext, 'alice', '10');

			expect(10).to.eql((await assetTransfer.balanceOf(transactionContext, 'alice')));
			expect(10).to.eql((await assetTransfer.totalSupply(transactionContext)));

			await assetTransfer.transfer(transactionContext, 'alice', 'bob', '5');

			expect(5).to.eql((await assetTransfer.balanceOf(transactionContext, 'alice')));
			expect(5).to.eql((await assetTransfer.balanceOf(transactionContext, 'bob')));
		});

		it('should return success on tow user', async () => {

			// chaincodeStub.putState.rejects('User alice does not have enough token');

			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);

			await assetTransfer.mint(transactionContext, 'alice', '10');

			expect(10).to.eql((await assetTransfer.balanceOf(transactionContext, 'alice')));
			expect(10).to.eql((await assetTransfer.totalSupply(transactionContext)));

			await assetTransfer.transfer(transactionContext, 'alice', 'bob', '5');

			expect(5).to.eql((await assetTransfer.balanceOf(transactionContext, 'alice')));
			expect(5).to.eql((await assetTransfer.balanceOf(transactionContext, 'bob')));

			let exp = [
				{key: 'hotelaccount', value: 0},
				{key: 'alice', value: 5},
				{key: 'bob', value: 5}
			];
			let r = await assetTransfer.getTokenList(transactionContext);
			expect(JSON.stringify(exp)).to.eql(r);
		});
	});
	describe('Test order', () => {

		it('should return success on addorder', async () => {
			let assetTransfer = new AssetTransfer();
			let orderno = await assetTransfer.addOrder(transactionContext, '1', 'alice', '100', '{}');
			let exp = {
				key: orderno,
				value: {
					orderno: getOrderno(new Date()),
					timestamp: parseInt(new Date().getTime() / 1000),
					trx: '8ab8f29eda6985326159b4968ddf7daf1cafe4116fc0be3341dad98848f79d2b',
					houseid: '1',
					user: 'alice',
					price: '100',
					liver: '{}',
					status: '?????????'
				}
			};
			expect(JSON.stringify(exp)).to.eq((await assetTransfer.getOrder(transactionContext, orderno)));
		});

		it('should return success on deleteorder', async () => {
			let assetTransfer = new AssetTransfer();
			const time = new Date();
			let orderno = getOrderno(time);

			try {
				await assetTransfer.getOrder(transactionContext, orderno);
				assert.fail('fail');
			} catch (err) {
				expect(err.message).to.equal(`The asset order:${orderno} does not exist`);
			}

			orderno = await assetTransfer.addOrder(transactionContext, '1', 'alice', '100', '{}');
			let exp = {
				key: orderno,
				value: {
					orderno: orderno,
					timestamp: parseInt(time.getTime() / 1000),
					trx: '8ab8f29eda6985326159b4968ddf7daf1cafe4116fc0be3341dad98848f79d2b',
					houseid: '1',
					user: 'alice',
					price: '100',
					liver: '{}',
					status: '?????????'
				}
			};
			expect(JSON.stringify(exp)).to.eq((await assetTransfer.getOrder(transactionContext, orderno)));

			await assetTransfer.deleteOrder(transactionContext, orderno);
			try {
				await assetTransfer.getOrder(transactionContext, orderno);
				assert.fail('fail');
			} catch (err) {
				expect(err.message).to.equal(`The asset order:${orderno} does not exist`);
			}
			// expect(JSON.stringify(exp)).to.eq(());
		});


		it('should return success on getAllOrder', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.addOrder(transactionContext, '1', 'alice', '100', '{}');
			// await sleep(1000);
			// await assetTransfer.addOrder(transactionContext, '1', 'alice', '100', '{}');
			await assetTransfer.getAllorder(transactionContext);
		});

	});

	describe('Test user', () => {
		it('should return success on addUser', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);
			await assetTransfer.mint(transactionContext, 'alice', '10');
			await assetTransfer.addOrder(transactionContext, '1', 'alice', '100', '{}');

			expect(0).to.eq((await assetTransfer.getUserCount(transactionContext)));
			await assetTransfer.reigster(transactionContext, '123', '456', '{}', '123');
			expect(1).to.eq((await assetTransfer.getUserCount(transactionContext)));
			let exp = {
				key: '123',
				value: {
					id: 1,
					pk: '123',
					r: '456',
					enc_pk: '123',
					ext: '{}',
					lastproof: ''
				}
			};
			expect(JSON.stringify(exp)).to.eq((await assetTransfer.getUser(transactionContext, '123')));

			try{
				await assetTransfer.deleteUser(transactionContext, '123');
			}catch (err) {
				expect(err.message).to.equal('The asset user:123 does not exist');
			}


		});
	});

	describe('Test payorder', () => {
		it('should return success on payorder', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);
			await assetTransfer.mint(transactionContext, 'alice', '200');
			let orderno = await assetTransfer.addOrder(transactionContext, '1', 'alice', '100', '{}');


			await assetTransfer.payOrder(transactionContext, orderno, 'erc20', 'alice');
			expect(100).to.eql((await assetTransfer.balanceOf(transactionContext, 'alice')));
			expect(100).to.eql((await assetTransfer.balanceOf(transactionContext, 'hotelaccount')));

			let r = await assetTransfer.getOrder(transactionContext, orderno);
			r = JSON.parse(r);
			expect('?????????').to.eq(r.value.status);
		});
	});

	describe('Test comment', () => {
		it('should return success on comment', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);
			await assetTransfer.mint(transactionContext, 'alice', '200');
			let orderno = await assetTransfer.addOrder(transactionContext, '1', 'alice', '100', '{}');


			await assetTransfer.payOrder(transactionContext, orderno, 'erc20', 'alice');
			expect(100).to.eql((await assetTransfer.balanceOf(transactionContext, 'alice')));
			expect(100).to.eql((await assetTransfer.balanceOf(transactionContext, 'hotelaccount')));

			let r = await assetTransfer.getOrder(transactionContext, orderno);
			await assetTransfer.addComment(transactionContext, orderno, 5, 'nice');
			r = await assetTransfer.getOrder(transactionContext, orderno);
			r = JSON.parse(r);
			expect('?????????').to.eq(r.value.status);

			r = await assetTransfer.getAllComment(transactionContext);
			console.log(r);
		});
	});

	describe('Test privacy', () => {
		it('should return success on mint', async () => {
			let assetTransfer = new AssetTransfer();
			await assetTransfer.InitLedger(transactionContext);

			await assetTransfer.privateMint(transactionContext, 'xx', 100, 'xx');
			let r = await assetTransfer.privatetotalSupply(transactionContext);
			expect(100).to.eql(parseInt(r));

			console.log((await assetTransfer.getAllCommit(transactionContext)));
			console.log((await assetTransfer.commitCount(transactionContext)));

		});
	});
});
