const Router = require('koa-router') 
const db = require('../utils/db')
const jwt = require('jsonwebtoken')

const router = new Router({
  prefix: '/api/user',
})

router.post('/login', async (ctx)=>{

  const {email, password} = ctx.request.body
  let loginSql = `select * from user where email='${email}' and password='${password}'` 
  const loginRes = await new Promise((resolve, reject)=>{
    db.query(loginSql, (err,data)=>{
      if(err) reject(err)
      console.log(data)
      resolve(data)
    })
  })
  if(loginRes.length){
    let token = jwt.sign({email, password},'secret',{expiresIn: 3600})
    ctx.body = {
      status: true,
      data: loginRes[0],
      msg: '成功登录',
      token
    };
  }else {
    ctx.body = {
      status: false,
      msg: '用户名密码错误',
    };
  }

})
router.post('/register', async(ctx)=>{
  const {email, nickname, password} = ctx.request.body
  let searchSql = `select * from user where email='${email}' or nickname='${nickname}'`
  const searchRes = await new Promise((resolve, reject)=>{
    db.query(searchSql, (err,data)=>{
      if(err) reject(err)
      console.log(data)
      resolve(data)
    })
  })
  // console.log(searchRes)
  if(searchRes.length>0){
    ctx.body={
      status: false,
      msg: '该用户名或邮箱已存在'
    }
  }else {
    let token = jwt.sign({email, nickname, password},'secret',{expiresIn: 3600})
    let createUserSql = `insert into user(email, nickname, password) values ('${email}','${nickname}','${password}')`
    const registerRes = await new Promise((resolve, reject)=>{
      db.query(createUserSql, (err,data)=>{
        if(err) reject(err)
        resolve(data)
      })
    })
    console.log(token)
    ctx.body = {
      status: true,
      msg: '成功创建用户',
      token
    };
  }
})

router.post('/updateUser', async (ctx)=>{
  const {id, nickname, password} = ctx.request.body
  let updateSql = `update user set nickname='${nickname}',password='${password} where id='${id}''` 
  const updateRes = await new Promise((resolve, reject)=>{
    db.query(updateSql, (err,data)=>{
      if(err) reject(err)
      console.log(data)
      resolve(data)
    })
  })
  if(updateRes.length){
    ctx.body = {
      status: true,
      data: updateRes[0],
      msg: '成功更新',
    };
  }else {
    ctx.body = {
      status: false,
      msg: '更新失败',
    };
  }
})

router.get('/getUserById',async (ctx)=>{
  const {id} = ctx.request.query
  const sql = `select * from user where id='${id}'`
  console.log(sql)
  const sqlRes = await new Promise((resolve,reject)=>{
    db.query(sql,(err,data)=>{
      if(err) reject(err)
      console.log(data)
      resolve(data)
    })
  })
  ctx.body={
    status: true,
    data: sqlRes[0],
    msg: '成功获取用户'
  }
})
module.exports = router