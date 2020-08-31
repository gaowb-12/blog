export {}
declare global{
    namespace NodeJS  {
        interface Global {
            Logger: any
            gao:string
        }
    }
}