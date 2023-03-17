const mysql = require('mysql')

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  database: 'yuanchat',
  user: 'root',
  password: 'root'
})

async function query(sql,callback){
  pool.getConnection(function(err,connection){
    connection.query(sql,(err,rows)=>{
      callback(err,rows)
      connection.release()
    })
  })
}
exports.query = query