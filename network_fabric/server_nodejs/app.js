const express = require('express')
const app = express()
const port = 3000
const fabric = require('./fabric_sdk_node/gateway')
const {BlockDecoder} = require('fabric-common')
const { Wallet } = require('fabric-network')


app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")


  console.log('[+]', req.url)
  // console.log('[+]', req.headers)
  next()
})
app.options('/:any', (req, res) => {
  res.send('Hello World!')
})



app.use(function(err, req, res, next) {
  res.status(500).send(err.stack.toString());
});

const userRouter = require('./router/user');
const orderRouter = require('./router/order');
const trxRouter = require('./router/trx');
const erc20Router = require('./router/erc20');


app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/trx', trxRouter);
app.use('/api/erc20', erc20Router);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})