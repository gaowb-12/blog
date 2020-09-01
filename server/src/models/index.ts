import mysql from 'mysql'
import getConnection from '../loaders/mysql'
let connection:mysql.Connection = getConnection()

// 异步回调函数Promise化
let connectionPromise = (sql?:string,params?:any)=>{
    return new Promise((resolve,reject)=>{
        let newArgs:any = [sql,params]
        newArgs.push((err:object, result:object)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(result)
            }
        })
        connection.query.apply(connection.query,newArgs)
    })
}

// 查询数据库
export async function findSome(sql:string){
    connection.connect();

    let result = await connectionPromise(sql,[])

    connection.end();

    return result
}
// 插入数据库
export async function insert(sql:string,sqlParams:Array<any>){
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
