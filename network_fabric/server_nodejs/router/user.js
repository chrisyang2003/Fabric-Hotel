
const express = require('express');
const router = express.Router();

// api/user

router.get('/register', (req, res, next) => {
    const passwd = req.query.passwd;

    res.send('1')
})

router.get('/userlist', async(req, res, next) =>{
    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');
    var result = await contract.evaluateTransaction('getAllUser');
    res.send(result.toString())
  })


module.exports = router