import qs from "qs"

export default {
    async login(o:any){
        const res = await fetch('/api/login',{
            method:"POST",
            body:qs.stringify(o)
        })
        return  res.json()
    }
}