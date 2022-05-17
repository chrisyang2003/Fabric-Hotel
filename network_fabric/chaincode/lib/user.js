// eslint-disable-next-line strict
const utils = require('./utils');
const {readState} = require('./utils');

function userkey(key){
	return 'user:' + key;
}

exports.register = async function(ctx, pk, r, ext, enc_pk){
	const user = {
		id: await this.getUsercount(ctx) + 1,
		pk: pk,
		r: r,
		enc_pk: enc_pk,
		ext: ext,
		lastproof: ''
	};
	await utils.putState(ctx, userkey(pk), user);
};

exports.getUser = async function(ctx, pk){
	return await readState(ctx, userkey(pk));
};

exports.login = async function(ctx, pk, r, ext){

};

exports.deleteUser = async function(ctx, pk){
	await utils.deleteAsset(ctx, userkey(pk));
};
exports.updateUser = async function(ctx, pk, r, ext){

};

exports.getUsercount = async function(ctx){
	const r = await this.getALlUser(ctx);
	return JSON.parse(r).length;
};

exports.getALlUser = async function(ctx){
	const r = await utils.getALlStatus(ctx, 'user');
	return r;
};