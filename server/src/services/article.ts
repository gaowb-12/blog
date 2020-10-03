import  express  = require('express')
import { findSome } from '../models'
import getHash from "../middlewares/crypto"

// 获取文章列表
export async function ArticleList(req:express.Request, res:express.Response){
    let query = req.query
    
    // 1. 首先查询数据库文章列表
    let querySQL = `
            SELECT 
                blog_article.*,
                GROUP_CONCAT(DISTINCT(blog_tag.tag_name)) tag_name,
                GROUP_CONCAT(DISTINCT(blog_tag.tag_code)) tag_code,
                GROUP_CONCAT(DISTINCT(blog_catalogue.catalogue_name)) catalogue_name,
                GROUP_CONCAT(DISTINCT(blog_catalogue.catalogue_code)) catalogue_code
            FROM 
                blog_article,
                blog_article_catalogue,
                blog_catalogue,
                blog_tag,
                blog_article_tag
            WHERE 
                
                blog_article.id=blog_article_catalogue.article_id 
                AND 
                blog_catalogue.id=blog_article_catalogue.catalogue_id
                AND
                blog_article.id=blog_article_tag.article_id
                AND
                blog_tag.id=blog_article_tag.tag_id
                AND
                blog_article.title LIKE '%${query.title||''}%'
                ${
                    query.status
                    ?`AND status=${query.status}`
                    :''
                }
                ${
                    query.catalogue
                    ?`AND blog_article_catalogue.catalogue_id=${query.catalogue}`
                    :''
                }

            GROUP BY blog_article.id
        `
    let result = await findSome(querySQL)
    global.Logger.info(result)

    // 2. 查到结果
    if(result&&result.length>0) 
        res.status(200).json({body:{result:result},errcode:200,message:"成功"})
    // 3. 未查到结果
    else{
        res.status(200).json({body:{result:[]},errcode:200,message:"成功"})
    }
}

