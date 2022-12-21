const prisma = require("../helpers/database")
const {Prisma} = require('@prisma/client')
const { supplier } = require("../helpers/database")
class delivery{
    listfiledeliv=async()=>{
        try{
            const list = await prisma.history_work_order.findMany()
            return{
                status: true,
                code: 201,
                data: list
            }
        }catch(error){
            console.error('woDetail working order detail module Error: ', error)
            return{
                status: false,
                code:400,
            }
        }
    }
    listdeliv=async(req)=>{
        try{
            
            const delivery= await prisma.work_order.findMany({
                where:{
                    id_file:req.id,
                },
            })
            return{
                status: true,
                code: 201,
                data: delivery
            }
        }catch(error){
            console.error('woDetail working order detail module Error: ', error)
            return{
                status: false,
                code:400,

            }
        }
    }
    listdelivbysup=async(req)=>{
        try{
            
            const delivery= await prisma.work_order.findMany({
                where:{
                    id_file:req.id,
                    supplier_id:req.supplier
                },
            })
            return{
                status: true,
                code: 201,
                data: delivery
            }
        }catch(error){
            console.error('woDetail working order detail module Error: ', error)
            return{
                status: false,
                code:400,
            }
        }
    }
    
}
module.exports= new delivery()