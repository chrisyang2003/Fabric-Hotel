


const express = require('express');
const router = express.Router();

const fabric = require('../fabric_sdk_node/gateway')
const { BlockDecoder } = require('fabric-common')



async function getTrxDetailById(id) {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('qscc');

    var resultByte = await contract.evaluateTransaction('GetTransactionByID', 'mychannel', id);
    const unSerialization = BlockDecoder.decodeTransaction(resultByte).transactionEnvelope.payload

    const header = unSerialization.header.channel_header
    const mspid = unSerialization.header.signature_header.creator.mspid

    const writeset = unSerialization.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].rwset.writes[0]
    const writekey = writeset.key
    const writedata = writeset.value.toString()
    const ccname = unSerialization.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.chaincode_id.name

    return {
        writekey: writekey,
        timestamp: header.timestamp,
        channel_id: header.channel_id,
        trx: header.tx_id,
        ccname: ccname,
        mspid: mspid,
        data: writedata
    }
}

const axios = require('axios').default;
router.get('/getall', async (req, res, next) => {
    try {
        const network = await fabric.gateway('mychannel')
        const contract = network.getContract('hotel');
 
        let result = await contract.evaluateTransaction('getAllorder');
        res.send(JSON.parse(result))
    } catch (err) {
        next(err)
    }
})
router.get('/orderList', async (req, res, next) => {
    const user = req.user.user

    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    let orderlist = await contract.evaluateTransaction('getAllorder')

    // get house info 
    let userlist = []

    let p = []
    let rlist = JSON.parse(orderlist.toString())
    for await (let el of rlist){
        let order = el.value
        if (order.user === user) {
            const backaddr = 'http://127.0.0.1:8000/addons/booking/house/detail?id=' + order.houseid
            let house = await axios.get(backaddr)
            order.house = house.data.data
            userlist.push(order)

        }
    }
    res.json({
        code: 200,
        data: userlist
    })
})

router.get('/pay', async (req, res, next) => {
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    const orderid = req.query.id
    const type = req.query.type
    const user = req.user.user

    console.log(orderid, type, user)
    // async payOrder(ctx, orderno, type, user){
    await contract.submitTransaction('payOrder', orderid, type, user)

    res.json({
        code: 200
    })
})

router.get('/add', async (req, res, next) => {
    try {

        const network = await fabric.gateway('mychannel')
        const contract = network.getContract('hotel');

        const params = req.query
        const user = req.user.user

        console.log(req.query);

        // exports.addOrder = async function(ctx, houseid, user, price, arg)
        let orderno = await contract.submitTransaction('addOrder', params.id, user, params.price, '{}')

        res.json({
            code: 200,
            data: orderno.toString()
        })


    } catch (err) {
        next(err)
    }
})

router.get('/get', async (req, res, next) => {
    try {
        const id = req.query.id
        if (!id) {
            res.status(400).send('empty!')
            return
        }
        const network = await fabric.gateway('mychannel')
        const contract = network.getContract('hotel');

        result = await contract.evaluateTransaction('getOrder', id);
        const trx = JSON.parse(result.toString()).value.trx

        //   console.log(trx)
        res.send((await getTrxDetailById(trx)))
    } catch (err) {
        next(err)
    }
})

router.get('/addComment', async (req, res, next) => {
    
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    

})

router.get('/detail', async (req, res, next) => {
    let id = req.query.id

    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    let result = await contract.evaluateTransaction('getOrder', id);
    const order = JSON.parse(result.toString()).value

    const backaddr = 'http://127.0.0.1:8000/addons/booking/house/detail?id=' + order.houseid



    axios.get(backaddr).then((r) => {

        order.house = r.data.data
        

        res.json({
            code: 200,
            data: order
        })

    })

    
    
})


module.exports = router