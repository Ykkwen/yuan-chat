const Router = require('koa-router') 
const db = require('../utils/db')
const jwt = require('jsonwebtoken')

const router = new Router({
  prefix: '/api/friend',
})

router.get('/friend_list',async (ctx)=>{
  const {id} = ctx.request.query
  const sql = `select * from user where id!='${id}'`
  console.log(sql)
  const sqlRes = await new Promise((resolve, reject)=>{
    db.query(sql, (err,data)=>{
      if(err) reject(err)
      // console.log(data)
      resolve(data)
    })
  })
  ctx.body = {
    status: true,
    data: sqlRes,
    msg: '获取成功'
  }
})
module.exports = router