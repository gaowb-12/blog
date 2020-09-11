import qs from "qs"
interface ObjectX{
    [p:string]:any
}
export default {
    async getArticleList(o:any){
        const res:ObjectX = await fetch('/api/article?'+qs.stringify(o))
        return  res
    },
}