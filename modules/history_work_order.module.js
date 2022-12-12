const prisma = require("../helpers/database")
const Joi = require("joi")
const XLSX = require ('xlsx')
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
            const inputhwo= await prisma.history_work_order.create({
                data:{
                    name_file:body.filename
                }
            })
            let add
            for (let i = 0; i< worksheets.Sheet1.length; i++){
                //console.log(worksheets.Sheet1)
                let part_name=worksheets.Sheet1[i].part_name
                let no_work_order=worksheets.Sheet1[i].no_work_order
                let customer=worksheets.Sheet1[i].customer
                let quantity_perbox=worksheets.Sheet1[i].quantity_perbox
                let total_order=worksheets.Sheet1[i].total_order
                let total_box=total_order/quantity_perbox
                let supplier_id=worksheets.Sheet1[i].supplier
                
                let supplier = await prisma.supplier.findFirst({
                    where: {
                        name: supplier_id
                    },
                    select: {
                        id: true
                    }
                })
                //console.log(supplier.id)
                if (!supplier) {
                    return {
                        status: false,
                        code: 401,
                        error: 'Supplier not found'
                    }
                }    
                 add = await prisma.work_order.create({
                    data: {
                        id_file: 1,
                        part_name: part_name,
                        no_work_order: no_work_order,
                        customer : customer,
                        quantity_perbox: quantity_perbox,
                        total_order: total_order,
                        total_box: total_box,
                        supplier_id: supplier.id
                     }
                    })
                
                console.log(add)
                }
                for(let j=0; j<total_box; j++){

                }
                return {
                    status: true,
                    code: 201,
                    data: add
                }
            /*const add = await prisma.history_work_order.create({
                data: {
                    name_file: body.name_file
                }
            })*/
        } catch (error) {
            console.error('historyWorkOrder hwo module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
    listwo=async ()=>{
        try{
            const list = await prisma.work_order.findMany({
                select:{
                    id: true,
                    part_name: true,
                    no_work_order:true,
                    customer:true,
                    quantity_perbox: true,
                    total_order: true,
                    total_box: true,
                    supplier: {
                        select: {
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

    
}
module.exports = new _wo()