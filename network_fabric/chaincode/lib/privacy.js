// eslint-disable-next-line strict
const utils = require('./utils');


function privacykey(id){
	return 'privacy:' + id;
}

function commitKey(id){
	return 'commit:' + id;
}

function nullKey(id){
	return 'null:' + id;
}

const totalSupply = 'totalSupply';

async function updatetotalSupply(ctx, amount){
	await utils.putState(ctx, privacykey(totalSupply), amount);
}


exports.commitCount = async function(ctx) {
	let r = await utils.getALlStatus(ctx, 'commit');
	return JSON.parse(r).length;
};

exports.getAllCommit = async function(ctx) {
	return await utils.getALlStatus(ctx, 'commit');
};

exports.init = async function(ctx) {
	await updatetotalSupply(ctx, 0);
};



exports.mint = async function(ctx, commit, pi, v, rho, enc) {
	const commitid = await this.commitCount(ctx) + 1;

	await utils.putState(ctx, commitKey(commitid), {
		commit: commit,
		enc_g: enc
	});

	await updatetotalSupply(ctx, (await this.totalSupply(ctx)) + v);

};

exports.transferWithUnspent = async function(ctx, ){

};

exports.getNull = async function(ctx) {

};

exports.getAllNull = async function(ctx) {
	return await utils.getALlStatus(ctx, 'null');
};
exports.totalSupply = async function(ctx) {
	let r = await utils.readState(ctx, privacykey(totalSupply));
	return JSON.parse(r).value;
};
