
const express = require('express');
const router = express.Router();
const fabric = require('../fabric_sdk_node/gateway')



// erc20

router.get('/tokeninfo', async (req, res, next) => {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    res.send(JSON.stringify({
        tokenName: (await contract.evaluateTransaction('tokenName')).toString(),
        Symbol: (await contract.evaluateTransaction('Symbol')).toString(),
        totalSupply: (await contract.evaluateTransaction('totalSupply')).toString(),
    }))
})

router.get('/tokenlist', async (req, res, next) => {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    let r = await contract.evaluateTransaction('getTokenList');
    r = JSON.parse(r.toString());
    
    res.json(r)
})

router.get('/balance', async (req, res, next) => {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    const user = req.query.user;
    let r = await contract.evaluateTransaction('balanceOf', user);
    res.send({
        balance: r.toString()
    })
})


module.exports = router