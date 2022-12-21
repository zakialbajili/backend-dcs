const prisma = require("../helpers/database")
const {Prisma} = require('@prisma/client')

class deliv{
listdelivbysup=async(id) =>{
    try{
        const list = await prisma.history_work_order.findFirst({
            where: {
                id: parseInt(id)
            },
            select:{
                id:true,
                Part:{
                    select:{
                        part_name:true,
                    }
                },
                no_work_order: true,
                customer:true,
                prod_date:true,
                quantity_perbox: true,
                total_box: true,
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
            error

        }
    }
}
}
module.exports= new deliv()