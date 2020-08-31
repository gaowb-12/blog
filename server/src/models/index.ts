import mysql from 'mysql'
import getConnection from '../loaders/mysql'
let connection:mysql.Connection = getConnection()

// 查询数据库
async function findSome(sql:string){
    connection.connect();

    connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
    });
    
    connection.end();
}
// 插入数据库
async function insert(sql:string,sqlParams:Array<any>){
    connection.connect();
 
    var  addSql = 'INSERT INTO blog_user(id,user_name,PASSWORD,insert_time) VALUES(0,?,?,?)';
    var  addSqlParams = ['gao', '123','23453'];
    //增
    await connection.query(sql,sqlParams,(err, result) => {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }        
    
        console.log('INSERT ID:',result);        
    });
    
    connection.end();
}

export default {
    findSome,
    insert
}