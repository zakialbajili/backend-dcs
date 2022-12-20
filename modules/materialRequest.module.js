const prisma = require('../helpers/database')
const excel = require("exceljs");
const Joi = require("joi");
const QRCode = require('qrcode');

class _request{
    list = async (body) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(body.id)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const listmaterial = await prisma.$queryRaw`
            WITH wo AS ( 
                SELECT a.no_work_order, (a.total_order * b.quantity / 1000) as mat_weight, a.prod_date, b.material_id, b.batch_material_id, a.supplier_id, b.part_number, b.part_name 
                FROM work_order a, part b 
                WHERE a.id_part = b.id AND a.id_file = ${parseInt(body.id)}
            )
            SELECT c.no_work_order, DATE(c.prod_date) As tanggal, c.mat_weight, a.material_name, a.material_number, b.name, c.part_number, c.part_name 
            FROM materials a, suppliers b, wo c 
            WHERE c.material_id = a.id AND a.supplier_id = b.id`

            const listbatch = await prisma.$queryRaw`
            WITH wo AS ( 
                SELECT a.no_work_order, (a.total_order * b.quantity / 1000) as bat_weight, a.prod_date, b.material_id, b.batch_material_id, a.supplier_id, b.part_number, b.part_name 
                FROM work_order a, part b 
                WHERE a.id_part = b.id AND a.id_file = ${parseInt(body.id)}
            )
            SELECT c.no_work_order, DATE(c.prod_date) As tanggal, c.bat_weight, a.batch_material_name, a.batch_material_number, b.name, c.part_number, c.part_name 
            FROM batch_materials a, suppliers b, wo c 
            WHERE c.batch_material_id = a.id AND a.supplier_id = b.id`

            listmaterial.forEach(m => {
                const batch = listbatch.find(b => b.no_work_order == m.no_work_order)
                if (batch != undefined) {
                    Object.assign(m, {
                        "batch_material_number": batch.batch_material_number,
                        "batch_material_name" : batch.batch_material_name,
                        "bat_weight" : batch.bat_weight
                    })
                } else {
                    Object.assign(m, {
                        "batch_material_number": "-",
                        "batch_material_name" : "-",
                        "bat_weight" : 0
                    })
                }
            })

            listbatch.forEach(b => {
                const material = listmaterial.find(m => m.no_work_order == b.no_work_order)
                if (material == undefined) {
                    Object.assign(b, {
                        "material_number": "-",
                        "material_name" : "-",
                        "mat_weight" : 0
                    })
                    listmaterial.push(b)
                }
            })

            return {
                status: true,
                code: 200,
                data: listmaterial
            }
        } catch (error) {
            console.error('List material request module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    download = async (body) => {
        try {
            const schema = Joi.string().required()

            const validation = schema.validate(body.name)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const supllier = await prisma.supplier.findFirst({
                where: {
                    name: body.name
                },
                select: {
                    id: true
                }
            })

            const listmaterial = await prisma.$queryRaw`
            WITH wo AS ( 
                SELECT a.no_work_order, (a.total_order * b.quantity / 1000) as mat_weight, a.prod_date, b.material_id, b.batch_material_id, a.supplier_id, b.part_number, b.part_name 
                FROM work_order a, part b 
                WHERE a.id_part = b.id AND a.supplier_id = ${supllier.id}
            )
            SELECT c.no_work_order, DATE(c.prod_date) As tanggal, c.mat_weight, a.material_name, a.material_number, b.name, c.part_number, c.part_name 
            FROM materials a, suppliers b, wo c 
            WHERE c.material_id = a.id AND c.supplier_id = b.id`

            const listbatch = await prisma.$queryRaw`
            WITH wo AS ( 
                SELECT a.no_work_order, (a.total_order * b.quantity / 1000) as bat_weight, a.prod_date, b.material_id, b.batch_material_id, a.supplier_id, b.part_number, b.part_name 
                FROM work_order a, part b 
                WHERE a.id_part = b.id AND a.supplier_id = ${supllier.id}
            )
            SELECT c.no_work_order, DATE(c.prod_date) As tanggal, c.bat_weight, a.batch_material_name, a.batch_material_number, b.name, c.part_number, c.part_name 
            FROM batch_materials a, suppliers b, wo c 
            WHERE c.batch_material_id = a.id AND c.supplier_id = b.id`

            if (listbatch.length == 0 && listmaterial.length > 0) {
                listmaterial.forEach(m => {
                    m.mat_weight = Number(m.mat_weight)
                    Object.assign(m, {
                        "batch_material_number": "-",
                        "batch_material_name" : "-",
                        "bat_weight" : 0
                    })
                })
            }else if (listbatch.length > 0 && listmaterial.length == 0) {
                listbatch.forEach(b => {
                    Object.assign(b, {
                        "material_number": "-",
                        "material_name" : "-",
                        "mat_weight" : 0
                    })
                    listmaterial.push(b)
                })
            } else {
                listmaterial.forEach(m => {
                    const batch = listbatch.find(b => b.no_work_order == m.no_work_order)
                    if (batch != undefined) {
                        Object.assign(m, {
                            "batch_material_number": batch.batch_material_number,
                            "batch_material_name" : batch.batch_material_name,
                            "bat_weight" : Number(batch.bat_weight)
                        })
                    }
                })
            }
        
            const generateQR = await QRCode.toDataURL(supllier.id.toString());
        
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet("TodoPrisma");
        
            worksheet.getColumn(1).values = ['Material Req. No.', 'Export Date', 'Supplier']
            worksheet.getColumn(2).values = [`MR-${Date.now()}`, new Date() , listmaterial[0].name]
        
            worksheet.addImage(workbook.addImage({
                base64: generateQR,
                extension: 'png',
            }), 
            {
                tl: { col: 2.4, row: 0.2 },
                ext: { width: 100, height: 100 }
            })
        
            worksheet.getRow(7).values = [
                'No. Work Order', 'Prod. Date', 'Part Number', 'Part Name', 
                'Material Number', 'Material Name', 'Mat Weight Kg', 'Batch Material Number',
                'Batch Material Name', 'BM Weight Kg'
            ]
        
            worksheet.getRow(7).fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{argb:'87CEFA'}
            }
        
            worksheet.columns = [
                { key: 'no_work_order'},
                { key: 'tanggal' },
                { key: 'part_number' },
                { key: 'part_name' },
                { key: 'material_name' },
                { key: 'material_number' },
                { key: 'mat_weight'},
                { key: 'batch_material_name' },
                { key: 'batch_material_number' },
                { key: 'bat_weight' }
            ]
        
            worksheet.addRows(listmaterial)
        
            worksheet.columns.forEach((column, i) => {
                var maxLength = 0;
                column.eachCell(function (cell) {
                    var columnLength = cell.value ? cell.value.toString().length : 10;
                    if (columnLength > maxLength ) {
                        maxLength = columnLength;
                    }
                });
                column.width = maxLength < 10 ? 10 : maxLength + 4;
        
                column.alignment = { vertical: 'middle', horizontal: 'center' }
            });

            worksheet.getColumn('B').width = worksheet.getRow(1).values[2].toString().length + 4
        
            // res.setHeader(
            //     "Content-Type",
            //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            // );
        
            // res.setHeader(
            //     "Content-Disposition",
            //     "attachment; filename=" + "TodoPrisma.xlsx"
            // );
    
            // return workbook.xlsx.write(res)
            // .then(() => {
            //     res.status(200).end();
            // });
        
            // await workbook.xlsx.write(res);
    
            // await workbook.xlsx.writeFile('TodoPrisma.xlsx')
            // .then(() => {
            //     res.send({
            //         status: "success",
            //         message: "file successfully downloaded",
            //     });
            // });
    
            const buffer = await workbook.xlsx.writeBuffer();
            console.log(buffer)
    
            return {
                status: true,
                data: buffer
            }
        } catch (error) {
            console.error('Download material request module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    listrequest = async (id) => {
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

            const data = await prisma.work_order.findMany({
                where: {
                    supplier_id: parseInt(id)
                },
                select : {
                    Part: {
                        select: {
                            material: true,
                            batch_material: true
                        }
                    }
                }
            })

            return {
                status: true,
                code: 200,
                data
            }
        } catch (error) {
            console.error('listrequest material request module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _request()