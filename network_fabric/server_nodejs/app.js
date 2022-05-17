const express = require('express')
const app = express()
const port = 3000


function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}


app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")


  console.log('[+]', parseTime(new Date()), req.url, )
  // console.log('[+]', req.headers)
  next()
})
app.options('/:any', (req, res) => {
  res.send('Hello World!')
})



app.use(function (err, req, res, next) {
  res.status(500).send(err.stack.toString());
});

const userRouter = require('./router/user');
const orderRouter = require('./router/order');
const trxRouter = require('./router/trx');
const erc20Router = require('./router/erc20');


const expressJwt = require('express-jwt');
// const jwtauth=expressjwt({secret:key})
const auth = expressJwt({secret: 'secret12345'}).unless({
  path: [
    '/order/getall',
    // '/order/orderList',

    '/favicon.ico',

    '/user/register',
    '/user/userlist',
    '/user/delete',
    '/user/login',

    '/order/get',
    '/erc20/tokenlist',
    '/erc20/tokeninfo',
    '/erc20/transfer',


    '/erc20/mint'
  ]
})
//   path:['/users','/login', '/api/user/register']})
app.use(auth)


app.use('/user', userRouter);
app.use('/order/', orderRouter);
app.use('/trx', trxRouter);
app.use('/erc20', erc20Router);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})