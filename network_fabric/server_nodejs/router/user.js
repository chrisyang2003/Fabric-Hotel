
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')
const key = 'secret12345'


const fabric = require('../fabric_sdk_node/gateway')
const { BlockDecoder } = require('fabric-common')



// api/user


router.get('/index', (req, res, next) => {
  const user = req.user.user

  let r = {
    code: 1,
    data: {
      token: "",
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
        nickname: user,
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
const axios = require('axios').default;

const zkpserver = 'http://127.0.0.1:7070'

router.get('/delete', async (req, res, next) => {
  const user = req.query.user
  const network = await fabric.gateway('mychannel')
  const contract = network.getContract('hotel');

  let r = contract.submitTransaction('deleteUser', user)


  console.log(user);
  
})

router.get('/login', async (req, res, next) => {
  const user = req.query.account
  const passwdlogin = req.query.passwdLogin
  const passwd = req.query.passwd
  const proof = req.query.proof


  const network = await fabric.gateway('mychannel')
  const contract = network.getContract('hotel');

  console.log(user);
  
  let r = await contract.evaluateTransaction('getUser', user)
  usereslut = JSON.parse(r.toString())
  console.log('r: ',usereslut.value.r)
  try{
    let r = await axios.get(zkpserver + '/user/login',{
      params:{
      userpk: user,
      proof, proof,
      r: usereslut.value.r
    }
    } )

    res.json({
      code: 200,
      msg: '登陆成功',
      data: { 
        token: jwt.sign({
          user: user
        }, key, { expiresIn: '1day' }),
        user: user
      }
    })
  
  }catch(err){

  }
  

  
})


router.get('/register', async (req, res, next) => {
  let a = res
  const passwd = req.query.passwd;

  axios.get(zkpserver + '/user/register', {
    params: {
      passwd: passwd
    }
  }).then(async (res) => {

    const network = await fabric.gateway('mychannel')
    const contract = network.getContract('hotel');

    user = res.data.data
    // console.log(res.data.data)


    // // async reigster (ctx, pk, r, ext, enc_pk)
    const trx = await contract.submitTransaction('reigster', user.userpk, user.r, '{}', user.pk)
  
    playload = {
      user: user.userpk
    }

    a.json({
      data: { 
        trx: trx.toString(),
        token: jwt.sign(playload, key, { expiresIn: '1day' }),
        user: user
      }
    })

    
  })
  
})

router.get('/userlist', async (req, res, next) => {
  const network = await fabric.gateway('mychannel')
  const contract = network.getContract('hotel');
  var result = await contract.evaluateTransaction('getAllUser');
  
  res.json(JSON.parse(result.toString()))
  
})


module.exports = router