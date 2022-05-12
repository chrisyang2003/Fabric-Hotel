// eslint-disable-next-line strict
const utils = require('./utils');


function orderkey(key){
	return 'order:' + key;
}


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

exports.addOrder = async function(ctx, houseid, user, price, arg){
	const time = ctx.stub.getDateTimestamp();
	const orderno = getOrderno(time);

	const order = {
		orderno: orderno,
		timestamp: parseInt(time.getTime() / 1000),
		trx: ctx.stub.getTxID(),
		houseid: houseid,
		user: user,
		price: price,
		liver: arg,
		status: '待付款',
	};
	await utils.putState(ctx, orderkey(orderno), order);
	return orderno;
};

exports.getOrder = async function(ctx, id){
	return await utils.readState(ctx, orderkey(id));
};
exports.deleteOrder = async function(ctx, id){
	await utils.deleteAsset(ctx, orderkey(id));
};
exports.getAllorder = async function(ctx){
	let r = await utils.getALlStatus(ctx);
	return JSON.stringify(r);
};

// exports.payOrder = async function(ctx){
//
// };

