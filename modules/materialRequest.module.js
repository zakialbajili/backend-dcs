const prisma = require('../helpers/database')
const excel = require("exceljs");
const Joi = require("joi");
const QRCode = require('qrcode');

class _request{
    list = async () => {
        try {
            const list = await prisma.$queryRaw`Select prod_date, no_work_order FROM work_order`
            console.log(list)

            return {
                status: true,
                code: 200,
                data: list
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

            // const data = await prisma.$queryRaw`Select no_work_order, prod_date, part_number, part_name, material_name, batch_material_name`

            const data = [
                {
                 "No. Work Order": "23102022SPK001",
                 "Prod. Date": "23\/10\/2022",
                 "Part Number": "IT01-RBL0105-XX-XX",
                 "Part Name": "GARNISH RR BUMPER LWR (IPL)",
                 "Material Number": "PP-TD10-GY",
                 "Material Name": "PP-TD10 MM713H CMH20013 GREY",
                 "Mat Weight Kg": 200,
                 "Batch Material Number": "PLAS-PRT-14050",
                 "Batch Material Name": "PLASTIC PROT 140MMX200MX50MC",
                 "BM Weight Kg": 100
                },
                {
                 "No. Work Order": "23102022SPK002",
                 "Prod. Date": "23\/10\/2022",
                 "Part Number": "IT02-CAF0200-XX-XX",
                 "Part Name": "\tCONSOLE FLOOR FR LWR",
                 "Material Number": "PP-TD25-MM755H",
                 "Material Name": "PP-TD-25 MM755H CMX20007 Black",
                 "Mat Weight Kg": 125,
                 "Batch Material Number": "-",
                 "Batch Material Name": "-",
                 "BM Weight Kg": "-"
                },
                {
                 "No. Work Order": "23102022SPK003",
                 "Prod. Date": "23\/10\/2022",
                 "Part Number": "IK01-GTG0101-XX-XX",
                 "Part Name": "\tTailgate Ikuyo",
                 "Material Number": "PC-SC1220-UR",
                 "Material Name": "SAMSUNG SC-1220UR\/G02164",
                 "Mat Weight Kg": 220,
                 "Batch Material Number": "-",
                 "Batch Material Name": "-",
                 "BM Weight Kg": "-"
                },
                {
                 "No. Work Order": "23102022SPK004",
                 "Prod. Date": "23\/10\/2022",
                 "Part Number": "HM02-GTU0101-XX-XX",
                 "Part Name": "GARNISH TAILGATE UPR (IPL)",
                 "Material Number": "PP-TD20-AP-BP31",
                 "Material Name": "PP+E\/P-TD20 AP-BP-31 Black",
                 "Mat Weight Kg": 300,
                 "Batch Material Number": "MB-LMN-6170",
                 "Batch Material Name": "LUMINE BLACK 6170-BC",
                 "BM Weight Kg": 250
                }
            ]
        
            const generateQR = await QRCode.toDataURL("1");
        
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet("TodoPrisma");
        
            worksheet.getColumn(1).values = ['Material Req. No.', 'Export Date', 'Supplier']
            worksheet.getColumn(2).values = ['MR-23102022', '22/10/2022', 'TKI']
        
            worksheet.addImage(workbook.addImage({
                base64: generateQR,
                extension: 'png',
            }), 
            {
                tl: { col: 2.4, row: 0.2 },
                ext: { width: 100, height: 100 }
            })
        
            worksheet.getRow(7).values = [
                'No. Work Order', 'Part Number', 'Prod. Date', 'Part Name', 
                'Material Number', 'Material Name', 'Mat Weight Kg', 'Batch Material Number',
                'Batch Material Name', 'BM Weight Kg'
            ]
        
            worksheet.getRow(7).fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{argb:'87CEFA'}
            }
        
            worksheet.columns = [
                { key: 'No. Work Order'},
                { key: 'Prod. Date' },
                { key: 'Part Number' },
                { key: 'Part Name' },
                { key: 'Material Number' },
                { key: 'Material Name' },
                { key: 'Mat Weight Kg'},
                { key: 'Batch Material Number' },
                { key: 'Batch Material Name' },
                { key: 'BM Weight Kg' }
            ]
        
            worksheet.addRows(data)
        
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
}

module.exports = new _request()