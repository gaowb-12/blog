import mysql from 'mysql'
import getConnection from '../loaders/mysql'


// 通过函数重载，将mysql的query方法，改造成promise异步
function connectionPromise(sql:string | mysql.QueryOptions) :Promise<any>;
function connectionPromise(sql:string | mysql.QueryOptions,values:any) :Promise<any>;
function connectionPromise(sql:string | mysql.QueryOptions,values?:any) :Promise<any>{
    let connection:mysql.Connection = getConnection();
    connection.connect();
    let result = new Promise<any>((resolve ,reject)=>{
        let queryCallback:mysql.queryCallback = (err:mysql.MysqlError|null, results?: any, fields?: mysql.FieldInfo[]) => {
            if(err){
                reject(err)
            }
            resolve(results)
        }
        // 判断是否传入了第二个参数
        if(!values) {
            connection.query(sql,queryCallback)
        }else{
            connection.query(sql,values,queryCallback)
        }
        
    })
    connection.end();
    return result
}

// 查询数据库
export async function findSome(sql:string ,values?:any){
    
    let result

    try {
        result = await connectionPromise(sql)
    } catch (error) {
        throw error
    }
    
    
    return result
}

// 插入数据库
export async function insert(sql:string,sqlParams?:any){
    // var  addSql = 'INSERT INTO blog_user(id,user_name,PASSWORD,insert_time) VALUES(0,?,?,?)';
    // var  addSqlParams = ['gao', '123','23453'];
    //增
    let result
    try {
        result = await connectionPromise(sql,sqlParams)
    } catch (error) {
        throw error
    }

    return result
}