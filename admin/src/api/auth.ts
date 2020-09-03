export default {
    async login(o:any){
        const res = await fetch('/api/login',{
            method:"POST",
            body:o
        })
        return  res.json()
    }
}