import  express  = require('express')
import { findSome } from '../models'
import getHash from "../middlewares/crypto"

// 获取文章列表
export async function ArticleList(req:express.Request, res:express.Response){
    let query = req.query
    console.log(query)
    
    // 1. 首先查询数据库文章列表
    // title:values.title,catalogue:values.catalogue,status:values.status
    // let result = await findSome(`SELECT id FROM blog_article WHERE title LIKE '%${query.title}%' AND status=${query.status}`)
    let result = await findSome(`
    SELECT blog_article.id,blog_article.title,blog_article.status,blog_article.read_num,blog_article.publish_time,blog_catalogue.catalogue_name,blog_catalogue.catalogue_code 
    FROM blog_article,blog_article_catalogue,blog_catalogue 
    WHERE blog_article.title LIKE '%${query.title}%' AND status=${query.status} AND blog_article.id=blog_article_catalogue.article_id AND blog_article_catalogue.catalogue_id=blog_catalogue.id`)
    console.log(result)
    // let result = [
    //   {
    //     key: '1',
    //     title: '浏览器缓存机制',
    //     status: 32,
    //     catalogue: ['nice', 'developer'],
    //     tags: ['nice', 'developer'],
    //     readnum: 100,
    //     publishTime: "2020-01-09 10:10:10"
    //   },
    //   {
    //     key: '2',
    //     title: 'Jim Green',
    //     status: 42,
    //     catalogue: ['loser'],
    //     tags: ['loser'],
    //     readnum: 120,
    //     publishTime: "2020-01-02 20:20:20"
    //   },
    //   {
    //     key: '3',
    //     title: 'Jim Green',
    //     status: 42,
    //     catalogue: ['loser'],
    //     tags: ['loser'],
    //     readnum: 120,
    //     publishTime: "2020-01-02 20:20:20"
    //   },
    // ]
    // 2. 查到结果
    if(result) 
        res.status(200).json({body:{result:result},errcode:200,message:"成功"})
    // 3. 未查到结果
    else{
        
    }
}

