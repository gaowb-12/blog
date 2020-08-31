import mysql from 'mysql'
import config from "../config"

export default function getConnection() :mysql.Connection{
    let connection = mysql.createConnection({
        host : config.database.host,
        port : config.database.port,
        user : config.database.user,
        password : config.database.password,
        database : config.database.database
    });
    
    return connection
}