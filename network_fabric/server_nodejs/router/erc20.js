
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

router.get('/mint', async (req, res, next) => {
    const user = req.query.user
    const value = req.query.value

    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    let r = await contract.submitTransaction('mint', user , value);
    // r = JSON.parse(r.toString());
    res.json({
        code: 200,
    })
    
})

router.get('/transfer', async (req, res, next) => {
    const from = req.query.from
    const to = req.query.to
    const value = req.query.value


    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');
    console.log(from, to ,value);

    
    let r = await contract.submitTransaction('transfer', from , to, value);
    // r = JSON.parse(r.toString());
    res.json({
        code: 200,
    })
    
})

router.get('/querybalance', async (req, res, next) => {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    const user = req.query.user;
    let r = await contract.evaluateTransaction('balanceOf', user);
    console.log(r.toString())

    res.send({
        balance: r.toString()
    })
})

router.get('/balance', async (req, res, next) => {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    const user = req.user.user;
    console.log(user);
    
    try {
        let r = await contract.evaluateTransaction('balanceOf', user);
        console.log(r.toString())

        res.send({
            balance: r.toString()
        })

    } catch (error) {
        res.send({
            balance: 0
        })
        
    }
    
})


module.exports = router