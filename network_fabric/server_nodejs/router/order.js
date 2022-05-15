


const express = require('express');
const router = express.Router();

const fabric = require('../fabric_sdk_node/gateway')
const { BlockDecoder } = require('fabric-common')



async function getTrxDetailById(id){
    const network = await fabric.gateway('mychannel')
      const contract = network.getContract('qscc');
  
      var resultByte = await contract.evaluateTransaction('GetTransactionByID','mychannel', id);
      const unSerialization = BlockDecoder.decodeTransaction(resultByte).transactionEnvelope.payload
      
      const header = unSerialization.header.channel_header
      const mspid = unSerialization.header.signature_header.creator.mspid
  
      const writeset = unSerialization.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].rwset.writes[0]
      const writekey = writeset.key
      const writedata = writeset.value.toString()
      const ccname = unSerialization.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.chaincode_id.name
  
      return {
          writekey:writekey,
          timestamp: header.timestamp,
          channel_id: header.channel_id,
          trx: header.tx_id,
          ccname: ccname,
          mspid:mspid,
          data: writedata
      }
  }


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
const axios = require('axios').default;
router.get('/orderList', async (req, res, next) => {
    const user = req.user.user

    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    let orderlist = await contract.evaluateTransaction('getAllorder')

    // get house info 
    var request = require('request');
    


    let userlist = []
    
    
    JSON.parse(orderlist.toString()).forEach(element => {
        let order = element.value
        if (order.user === user){

            const backaddr = 'http://127.0.0.1:8000/addons/booking/house/detail?id=' + order.houseid
            
            axios.get(backaddr).then(res => {
                
                order.house = res.data    
                userlist.push(order)

            })
        }
    });
    let c = JSON.stringify({
        code: 200,
        data: userlist
    })
    console.log(c);
    
    res.send(c)
})


router.get('/add', async (req, res, next) => {
    try {

        const network = await fabric.gateway('mychannel')
        const contract = network.getContract('hotel');

        params = req.query
        user = req.user.user
        
        console.log(req.query);

        // exports.addOrder = async function(ctx, houseid, user, price, arg)
        let orderno = await contract.submitTransaction('addOrder', params.id, user, params.price, '{}')

        res.json({
            code: 200,
            data: orderno.toString()
        })


        // await contract.submitTransaction('CreateAsset', '12312333', '1');
        // result = await contract.submitTransaction('CreateAsset', 'asdasdsd', 'yellow', '5', 'Tom', '1300');
        // result = await contract.submitTransaction('CreateAsset', '1',JSON.stringify(order));
        // console.log(result.toString())
    } catch (err) {
        next(err)
    }
})

router.get('/get', async (req, res, next) => {
    try{
      const id = req.query.id
      if (!id){
        res.status(400).send('empty!')
        return
      }
      const network = await fabric.gateway('mychannel')
      const contract = network.getContract('hotel');

      result = await contract.evaluateTransaction('getOrder', id);
      const trx = JSON.parse(result.toString()).value.trx

    //   console.log(trx)
      res.send((await getTrxDetailById(trx)))
    }catch(err){
      next(err)
    }
  })
  

module.exports = router