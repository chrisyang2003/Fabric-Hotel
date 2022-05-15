


const express = require('express');
const router = express.Router();

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


router.get('/order/getall', async (req, res, next) => {
    try {
        const network = await fabric.gateway('mychannel')
        const contract = network.getContract('hotel');

        let result = await contract.evaluateTransaction('getAllorder');
        res.send(JSON.parse(result))
    } catch (err) {
        next(err)
    }
})

router.get('/order/add', async (req, res, next) => {
    try {
        const network = await fabric.gateway('mychannel')
        const contract = network.getContract(contractName);

        order = {
            "id": 1,
            "data": {
                "name": 'chris',
                "age": '18'
            }
        }
        // await contract.submitTransaction('CreateAsset', '12312333', '1');
        // result = await contract.submitTransaction('CreateAsset', 'asdasdsd', 'yellow', '5', 'Tom', '1300');
        // result = await contract.submitTransaction('CreateAsset', '1',JSON.stringify(order));
        // console.log(result.toString())
    } catch (err) {
        next(err)
    }
})

router.get('/order/get', async (req, res, next) => {
    try{
      const id = req.query.id
      if (!id){
        res.status(400).send('empty!')
        return
      }
      const network = await fabric.gateway('mychannel')
      const contract = network.getContract('a1');
  
      result = await contract.evaluateTransaction('getOrder', id);
      const trx = JSON.parse(result).trx
      res.send(await getTrxDetailById(trx))
    }catch(err){
      next(err)
    }
  })
  

module.exports = router