
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
  
  console.log("proof: ", proof)

  const network = await fabric.gateway('mychannel')
  const contract = network.getContract('hotel');

  console.log(user);
  
  
  try{
    let rr = await contract.evaluateTransaction('getUser', user)
    usereslut = JSON.parse(rr.toString())
    console.log('r: ',usereslut.value.r)

    let r = await axios.get(zkpserver + '/user/login',{
      params:{
      userpk: user,
      proof, proof,
      r: usereslut.value.r
    }
    })
    if (r.data.data == 'good'){
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
    }
    else{
      console.log(r.data)
    }

  
  }catch(err){
    res.json({
      code: 0,
      msg: '错误',
      data: { 
        token: jwt.sign({
          user: user
        }, key, { expiresIn: '1day' }),
        user: user
      }
    })

  }
  

  
})

let loger = []
router.get('/add', async (req, res, next) => {
  console.log(req.query)

  loger.push({
    name: req.query.namq
  })
})

let saveUser = {}

saveUser = {
  '27393592628221017761640242079373237524309564762416437247099845060159244442432': '123'
}

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
    saveUser[user.userpk] = passwd
    console.log(saveUser);
    

    a.json({
      data: { 
        trx: trx.toString(),
        token: jwt.sign(playload, key, { expiresIn: '1day' }),
        user: user
      }
    })

  })
  
})



const SHA256 = require('crypto-js/sha256')

let pow = Math.pow

function commit(v, r){
  p = 1133261442823444443917138265631
  return (BigInt(3) ** BigInt(v) % BigInt(p)) * (BigInt(5) ** BigInt(r) % BigInt(p)) % BigInt(p)
}

function money(v, sk){
  const r = Math.floor(Math.random() * 1000)
  return{
    isused: false,
    value: v,
    rho: r,
    commit: commit(v, r),
    commitHash: SHA256(commit(v, r)),
    null: SHA256(sk + r.toString()),
    time: new Date().getTime()
  }
}

function randomString(e) {    
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
  a = t.length,
  n = "";
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}

let wallet = new Map()
// let userwallet = []

router.get('/wallet/mint', async (req, res, next) => {
  
  let user = req.user.user.toString()
  const sk = saveUser[user]


  // let user = req.query.user
  // let sk = req.query.sk

  const network = await fabric.gateway('mychannel')
  const contract = network.getContract('hotel');


  console.log(user);

  
  console.log(sk, user)

  if(wallet.get(user) == undefined){
    console.log('init user');
    wallet.set(user, [])
  }
  let userwallet = wallet.get(user)
  let cc = money(1000, sk)
  userwallet.push(cc)

  // async privateMint(ctx, commit, value, enc){
  let trx = await contract.submitTransaction('privateMint', cc.commit, 1000, randomString(64))

  
  res.json({
    code: 200,
    msg: trx
  })
})

router.get('/wallet/balance', async (req, res, next) => {
  const user = req.user.user.toString()
  // console.log(user)
  const sk = saveUser[user]

  // let user = req.query.user
  // let sk = req.query.sk

  if(wallet.get(user) == undefined){
    console.log('init user');
    wallet.set(user, [])
  }

  let total = 0
  wallet.get(user).forEach(element => {
    total +=  element.value

  });
  // console.log(wallet.get(user));
  
  res.json({
    code: 200,
    balance: total
  })
})




router.get('/userlist', async (req, res, next) => {
  const network = await fabric.gateway('mychannel')
  const contract = network.getContract('hotel');
  var result = await contract.evaluateTransaction('getAllUser');
  
  res.json(JSON.parse(result.toString()))
  
})


module.exports = router