
const express = require('express');
const router = express.Router();



// erc20

router.get('/erc20/tokeninfo', async (req, res, next) => {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    res.send(JSON.stringify({
        tokenName: (await contract.evaluateTransaction('tokenName')).toString(),
        Symbol: (await contract.evaluateTransaction('Symbol')).toString(),
        totalSupply: (await contract.evaluateTransaction('totalSupply')).toString(),
    }))
})

router.get('/erc20/tokenlist', async (req, res, next) => {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    let r = await contract.evaluateTransaction('getTokenList');
    r = JSON.parse(r.toString());

    res.send(r.map(ele => {
        const key = Object.keys(ele)[0];
        return {
            name: key.split(':')[1],
            balance: ele[key]
        }
    }));
})

router.get('/erc20/balance', async (req, res, next) => {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    const user = req.query.user;
    let r = await contract.evaluateTransaction('balanceOf', user);
    res.send({
        balance: r.toString()
    })
})


module.exports = router