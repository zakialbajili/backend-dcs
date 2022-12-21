const prisma = require("../helpers/database")
const Joi = require("joi")
const XLSX = require ('xlsx')
const m$wodetail = require('./work_order_detail.module')
class _wo {
    upload_wo = async (body)=>{
        try{
            const schema = Joi.object({
                fieldname: Joi.string().required(),
                originalname: Joi.string().required(),
                encoding: Joi.string().required(),
                mimetype: Joi.string().required(),
                destination: Joi.string().required(),
                filename: Joi.string().required(),
                path: Joi.string().required(),
                size: Joi.number().required(),
            }).options({ abortEarly: false })

            const validation = schema.validate(body)
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            var workbook = XLSX.readFile(body.path)
            let worksheets = {}

            for (const sheetName of workbook.SheetNames){
                worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
            }

            const part = await prisma.part.findMany()

            let indexCheck = 0
            while (indexCheck < worksheets.Sheet1.length) {
                if (!part.find(p => p.part_number === worksheets.Sheet1[indexCheck].part_number)) {
                    console.error("data part column " + (indexCheck + 1) + " not found on database")
                    return {
                        status: false,
                        code: 401,
                        error: "data part column " + (indexCheck + 1) + " not found on database"
                    }
                }
                indexCheck++
            }

            const inputhwo= await prisma.history_work_order.create({
                data:{
                    name_file:body.filename
                }
            })
            
            let total_box
            var data=[]
            let addWo
            for (let i = 0; i< worksheets.Sheet1.length; i++){
                // console.log(worksheets.Sheet1)
                let part_number=worksheets.Sheet1[i].part_number
                let part_name=worksheets.Sheet1[i].part_name
                let no_work_order=worksheets.Sheet1[i].no_work_order
                let customer=worksheets.Sheet1[i].customer
                let quantity_perbox=worksheets.Sheet1[i].quantity_perbox
                let total_order=worksheets.Sheet1[i].total_order
                total_box=total_order/quantity_perbox
                let supplier_id=worksheets.Sheet1[i].supplier

                let history_work_order = await prisma.history_work_order.findFirst({
                    where:{
                        id:inputhwo.id
                    },
                    select:{
                        id:true
                    }
                })

                let supplier = await prisma.supplier.findFirst({
                    where: {
                        name: supplier_id
                    },
                    select: {
                        id: true
                    }
                })

                if (!supplier) {
                    return {
                        status: false,
                        code: 401,
                        error: 'Supplier not found'
                    }
                }    

                const id_part = await prisma.part.findFirst({
                    where: {
                        part_number: part_number
                    },
                    select: {
                        id: true,
                        part_number:true,
                        part_name:true
                    }
                })

                addWo = await prisma.work_order.create({
                    data: {
                        id_file: history_work_order.id,
                        no_work_order: String(no_work_order),
                        customer : customer,
                        quantity_perbox: quantity_perbox,
                        total_order: total_order,
                        total_box: total_box,
                        supplier_id: supplier.id,
                        id_part: id_part.id
                    }
                })
                data.push(addWo)
            }
            await m$wodetail.woDetail(data)
            /*for(let j=0; j<total_box; j++){
                let workOrder = await prisma.work_order.findFirst({
                    where: {
                        id: addWo.id
                    },
                    select: {
                        id: true,
                        quantity_perbox: true
                    }
                })
                console.log(workOrder.id)
                console.log(workOrder.quantity_perbox)
                //console.log(addWo.id)
                inputwodetail = await prisma.work_order_detail.create({
                    data: {
                        work_order_id: workOrder.id,
                        quantity:workOrder.quantity_perbox,
                    }
                })
            }*/
            return {
                status: true,
                code: 201,
                data: addWo
            }
        } catch (error) {
            console.error('historyWorkOrder hwo module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
    listwo=async (req)=>{
        try{
            console.log(req)
            const list = await prisma.work_order.findMany({
                where:{
                    id_file:req
                },
                select:{
                    id_part:{
                        select:{
                            part_number:true,
                            part_name: true,
                        }
                    },
                    no_work_order: true,
                    customer: true,
                    prod_date: true,
                    quantity_perbox: true,
                    total_order: true,
                    total_box: true,
                    supplier:{
                        select:{
                            name: true
                        }
                    }
                }

            })
            return {
                status: true,
                data: list
            }
        }catch(error){
            return {
                status: false,
                error
            }
        }
    }

    gethwo = async (body) => {
        try {
            const data = await prisma.history_work_order.findMany()
                return{

                    status: true,
                    data: data
                }
            } catch (error){
                console.log('listWho who module Error:', error)
    
                return{
                    status: false,
                    error
                }
            }
        }
    updatewo= async(req)=>{
        try{
            const schema = Joi.object({
                id: Joi.number().required(),
                total_order: Joi.number().required()
            }).options({ abortEarly: false })

            const validation = schema.validate(req)
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            let data=[]
            const dlt = await prisma.workOrderDetail.deleteMany({
                where:{
                    work_order_id: req.id
                }
            })
            const wo= await prisma.work_order.findFirst({
                where:{
                    id:req.id
                },
                select:{
                    id: true,
                    quantity_perbox: true,
                    total_box: true
                }
            })
            const update = await prisma.work_order.update({
                where:{
                    id:req.id
                },
                data:{
                    total_order:req.total_order,
                    total_box:req.total_order/wo.quantity_perbox
                }
            })
            data.push(update)
            const updateWo=await m$wodetail.woDetail(data)
            return{
                status:true,
                data:update
            }
        }catch(error){
            console.log("updateWO hwo module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
        
    deletehwo = async (id) => {
            try {
                const schema = Joi.number().required()
    
                const validation = schema.validate(id)

                if (validation.error) {
                    const errorDetails = validation.error.details.map(detail => detail.message)
    
                    return {
                        status: false,
                        code: 422,
                        error: errorDetails.join(', ')
                    }
                }
                const data = await prisma.history_work_order.delete({
                    where: {
                        id: id
                    }
                })
                    return{
    
                        status: true,
                        data: data
                    }
                } catch (error){
                    console.log('deleteWho who module Error:', error)
        
                    return{
                        status: false,
                        error
                    }
                }
    }
            
}
module.exports = new _wo()