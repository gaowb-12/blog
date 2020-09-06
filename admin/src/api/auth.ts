import qs from "qs"
interface ObjectX{
    [p:string]:any
}
export default {
    async login(o:any){
        const res:ObjectX = await fetch('/api/login',{
            method:"POST",
            body:qs.stringify(o)
        })
        return  res
    },
    async register(o:any){
        const res:ObjectX = await fetch('/api/signup',{
            method:"POST",
            body:qs.stringify(o)
        })
        return  res
    }
}