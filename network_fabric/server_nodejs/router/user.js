
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')
const key = 'secret12345'


const fabric = require('../fabric_sdk_node/gateway')
const { BlockDecoder } = require('fabric-common')



// api/user


router.get('/index', (req, res, next) => {
  console.log(req.user.user)

  let r = {
    code: 1,
    data: {
      token: "5c163acd-c698-4d8c-a319-b7beea98a97e",
      user: {
        avatar: "http://chrisyy.top:5000/uploads/20220405/0af8bc83d3a810dae33ba7ad6a3fb135.jpeg",
        bio: "A hotel on HyperledgerFabric",
        createtime: 1652621771,
        expires_in: 2592000,
        expiretime: 1655213771,
        gender: 0,
        id: 1,
        level: 0,
        mobile: "13888888888",
        money: "0.00",
        nickname: "admin",
        score: 0,
        token: "5c163acd-c698-4d8c-a319-b7beea98a97e",
        user_id: 1,
        msg: "登录成功",
        time: "1652621771",
      }
    }
  }

  res.json(r)
})
var request = require('request');
const zkpserver = 'http://127.0.0.1:7070'
router.get('/register', async (req, res, next) => {
  const passwd = req.query.passwd;

  request({
    url: zkpserver + '/user/register',
    qs: {
      passwd: passwd
    }
  }, async (err, rep, res) => {




    console.log(res)
  })

  // const network = await fabric.gateway('mychannel')
  // const contract = network.getContract('hotel');

  // contract.submitTransaction('')



  playload = {
    user: '123123'
  }

  res.json({
    data: { token: jwt.sign(playload, key, { expiresIn: '1day' }) }
  })




})

router.get('/userlist', async (req, res, next) => {
  const network = await fabric.gateway('mychannel')
  const contract = network.getContract('hotel');
  var result = await contract.evaluateTransaction('getAllUser');
  res.send(result.toString())
})


module.exports = router