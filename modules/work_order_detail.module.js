const prisma = require("../helpers/database")
const {Prisma} = require('@prisma/client')
class wodetail{
    woDetail=async (data)=>{
        try{
            let inputwodetail
            data.forEach(async function(i){
                for(let index=0; index<i.total_box;index++){
                    //console.log(i)                        
                    // console.log(i.id)                        
                    // console.log(i.quantity_perbox)
                    inputwodetail = await prisma.workOrderDetail.createMany({
                        data: {
                            work_order_id: i.id,
                            quantity:i.quantity_perbox,
                            quantity_ng: 0,
                        }
                    })
                    // console.log(inputwodetail)
                }
            })
            return {
                status: true,
                code: 201,
                data: inputwodetail
            }
        }catch(error){
            console.error('woDetail working order detail module Error: ', error)
            return{
                status: false,
                code:400,

            }
        }
    }
    listwodetail=async(data)=>{
        try{
            const list= await prisma.workOrderDetail.findMany({
                work_order:{
                    select:{
                        id: true
                    }
                }
            })
            return {
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

    listwobyid=async(id) =>{
        try{
            const list = await prisma.work_order.findFirst({
                where: {
                    id: parseInt(id)
                },
                select:{
                    id:true,
                    Part:{
                        select:{
                            part_name:true,
                            part_number:true
                        }
                    },
                    no_work_order: true,
                    quantity_perbox:true,
                    prod_date:true,
                    WorkOrderDetail:{
                        select:{
                            id: true,
                            quantity: true,
                            quantity_ng: true,
                        }
                    },
                    supplier:{
                        select:{
                            name:true
                        }
                    }
                }
            });

            return {
                status: true,
                code: 200,
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

    updateWoDetail=async (data)=>{
        try{
            let inputwodetail
                for(let index=0; index<data.total_box; index++){
                    //console.log(i)                        
                    console.log(data.id)                        
                    console.log(data.total_box)                        
                    console.log(data.quantity_perbox)
                    inputwodetail = await prisma.workOrderDetail.createMany({
                        data: {
                            work_order_id: data.id,
                            quantity:data.quantity_perbox,
                            quantity_ng: 0,
                        }
                    })
                    console.log(inputwodetail)
                }
            return {
                status: true,
                code: 201,
                data: inputwodetail
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
module.exports= new wodetail()