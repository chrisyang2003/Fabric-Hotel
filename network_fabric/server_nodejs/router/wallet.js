const express = require('express');
const router = express.Router();

wallet = []
router.get('/wallet/', async(req, res, next) => {

  const decrypted = public_key.decrypt(encrypted, 'utf8');
  if (ismine(decrypted)){
    const v = decrypted.v
    const rho = decrypted.rho
    var privateMoney = {
      isused: false,                  // 是否使用
      value: 0,                       // 面额
      nullifier: Hash(sk + rho),      // 序列号
      Commitment: Hash(pk + v + rho), // 承诺
      rho: rho,                       // 随机数
      timestamp: stamp                // 入包时间
    }
    wallet.push(privateMoney)
  }
  

  privatebalance += 1
  res.send(JSON.stringify({balance: privatebalance}))
})


module.exports = router