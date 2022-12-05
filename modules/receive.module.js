const prisma = require('../helpers/database')
const excel = require("exceljs");

class _receive {
    upload = async (req) => {
        try {
            if (req.file == undefined) {
                return {
                    status: false,
                    message: "Tolong upload file excel!"
                }
            }

            const workbook = new excel.Workbook();
            await workbook.xlsx.load(req.file.buffer);

            const worksheet = workbook.getWorksheet(1);

            let alldata = []

            worksheet.eachRow(function(row, rowNumber) {
                if (rowNumber != 1) {
                    alldata.push({
                        'Supplier': row.values[1],
                        'No' : row.values[2],
                        'Date': row.values[3],
                        'Type' : row.values[4],
                        'MaterialNumber': row.values[5],
                        'MaterialName' : row.values[6],
                        'BatchMaterialNumber': row.values[7],
                        'BatchMaterialName' : row.values[8],
                        'Weight' : row.values[9]
                    })
                }
            });

            const suppliers = await prisma.supplier.findMany({
                select: {
                    id: true,
                    name: true
                }
            })

            const checksupplier = alldata.every(data => {
                if (!suppliers.some(supplier => supplier.name == data.Supplier)) {
                    return false
                }

                return true
            })

            if (!checksupplier) {
                return {
                    status: false,
                    code: 401,
                    error: "suppliers doesn't exist"
                }
            }

            // alldata.forEach(async(data) => {
            //     const findsupplier = suppliers.find(i => i.name === data.Supplier)
        
            //     if(data.MaterialNumber != '-' && data.MaterialName != '-') {
            //         await prisma.material.create({
            //             data: {
            //                 material_name: data.MaterialName,
            //                 material_number: data.MaterialNumber,
            //                 supllier: {
            //                     connect: {
            //                         id: findsupplier.id
            //                     }
            //                 },
            //             }
            //         })
            //     } else {
            //         await prisma.batchMaterial.create({
            //             data: {
            //                 batch_material_name: data.BatchMaterialName,
            //                 batch_material_number: data.BatchMaterialNumber,
            //                 type: data.Type,
            //                 min_stock: 90,
            //                 max_stock: 100,
            //                 supllier: {
            //                     connect: {
            //                         id: findsupplier.id
            //                     }
            //                 },
            //             }
            //         })
            //     }
            // })

            return {
                status: true,
                code: 200,
                // data: coba                
            }
        } catch (error) {
            console.error('Upload receive module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    download = async (req) => {
        
    } 
}

module.exports = new _receive()