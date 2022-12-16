const prisma = require('../helpers/database')
const excel = require("exceljs");
const Joi = require("joi");
const moment = require('moment');
const fs = require("fs");


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
            await workbook.xlsx.readFile(req.file.path);

            const worksheet = workbook.getWorksheet(1);

            let alldata = []
            let indexCheck = 0
            let indexStore = 0
            let now = new Date(moment().format("YYYY-MM-DD"))
            worksheet.eachRow(function (row, rowNumber) {
                if (rowNumber != 1) {
                    alldata.push({
                        'Supplier': row.values[1],
                        'No': row.values[2],
                        'Date': row.values[3],
                        'Type': row.values[4],
                        'MaterialNumber': row.values[5],
                        'MaterialName': row.values[6],
                        'BatchMaterialNumber': row.values[7],
                        'BatchMaterialName': row.values[8],
                        'Weight': row.values[9]
                    })
                }
            })

            const suppliers = await prisma.supplier.findMany({
                select: {
                    id: true,
                    name: true
                }
            })

            const materials = await prisma.material.findMany({
                select: {
                    id: true,
                    material_number: true
                }
            })

            const BatchMaterial = await prisma.batchMaterial.findMany({
                select: {
                    id: true,
                    batch_material_number: true
                }
            })

            const travelDoc = await prisma.travelDoc.findMany()

            while (indexCheck < alldata.length) {
                if (travelDoc.length !== 0 && travelDoc.find(travel => travel.number_travel_doc === alldata[indexCheck].No)) {
                    console.error("data travel doc column " + (indexCheck + 1) + "already exist")
                    return {
                        status: false,
                        code: 404,
                        error: "data travel doc column " + (indexCheck + 1) + "already exist"
                    }
                }

                if (!suppliers.find(supplier => supplier.name === alldata[indexCheck].Supplier)) {

                    console.error("data supplier column " + (indexCheck + 1) + " not found on database")
                    return {
                        status: false,
                        code: 404,
                        error: "data supplier column " + (indexCheck + 1) + " not found on database"
                    }
                }

                if (!materials.find(material => material.material_number === alldata[indexCheck].MaterialNumber) && alldata[indexCheck].MaterialNumber != "-") {
                    console.error("data material column " + (indexCheck + 1) + " not found on database")
                    return {
                        status: false,
                        code: 404,
                        error: "data material column " + (indexCheck + 1) + " not found on database"
                    }
                }

                if (!BatchMaterial.find(batchmaterial => batchmaterial.batch_material_number === alldata[indexCheck].BatchMaterialNumber) && alldata[indexCheck].BatchMaterialNumber != "-") {
                    console.error("data batchmaterial column " + (indexCheck + 1) + " not found on database")
                    return {
                        status: false,
                        code: 404,
                        error: "data batchmaterial column " + (indexCheck + 1) + " not found on database"
                    }
                }

                indexCheck++
            }

            const fileStore = await prisma.fileMaterialReceive.create({
                data: {
                    filename: req.file.filename,
                    original_filename: req.file.originalname,
                    file_mime: req.file.mimetype,
                    file_path: req.file.path,
                    file_extension: 'xlsx',
                    user_id: req.users.id
                }
            })

            while (indexStore < alldata.length) {
                let supplierId
                let materialId
                let batchMaterialId
                if (suppliers.find(supplier => supplier.name === alldata[indexStore].Supplier)) {
                    const supplierStore = await prisma.supplier.findFirst({
                        where: {
                            name: alldata[indexStore].Supplier
                        }
                    })
                    supplierId = supplierStore.id
                }

                if (materials.find(material => material.material_number === alldata[indexStore].MaterialNumber) && alldata[indexStore].MaterialNumber != "-") {
                    if (alldata[indexStore].MaterialNumber == "-") {
                        materialId = null
                    } else {
                        const materialStore = await prisma.material.findFirst({
                            where: {
                                material_number: alldata[indexStore].MaterialNumber
                            }
                        })
                        materialId = materialStore.id
                    }
                }

                if (BatchMaterial.find(batchmaterial => batchmaterial.batch_material_number === alldata[indexStore].BatchMaterialNumber) && alldata[indexStore].BatchMaterialNumber != "-") {
                    if (alldata[indexStore].BatchMaterialNumber == "-") {
                        batchMaterialId = null
                    } else {
                        const batchMaterialStore = await prisma.batchMaterial.findFirst({
                            where: {
                                batch_material_number: alldata[indexStore].BatchMaterialNumber
                            }
                        })
                        batchMaterialId = batchMaterialStore.id
                    }
                }              
                if (!travelDoc.find(traveldoc => traveldoc.number_travel_doc === alldata[indexStore].No)) {
                    const countTravelDoc = await prisma.travelDoc.count({
                        where: {
                            number_travel_doc: alldata[indexStore].No
                        }
                    })
                    if (countTravelDoc == 0) {
                        await prisma.travelDoc.create({
                            data: {
                                number_travel_doc: alldata[indexStore].No,
                                auth_user_id: req.users.id,
                                supplier_id: supplierId,
                                file_material_id: fileStore.id
                            }
                        })
                    }
                }

                const travelDocStore = await prisma.travelDoc.findFirst({
                    where: {
                        number_travel_doc: alldata[indexStore].No
                    }
                })

                const materialReceiveStore = await prisma.materialReceive.create({
                    data: {
                        arrival_date: alldata[indexStore].Date,
                        type: alldata[indexStore].Type,
                        material_id: materialId,
                        batch_material_id: batchMaterialId,
                        travel_doc_id: travelDocStore.id,
                        weight: alldata[indexStore].Weight,
                        file_material_id: fileStore.id
                    }
                })
                indexStore++
            }

            const data = await prisma.materialReceive.findMany({
                where: {
                    file_material_receive: {
                        filename: req.file.filename
                    }
                },
                include: {
                    material: true,
                    batch_material: true,
                    travel_doc: true,
                    file_material_receive: true,
                }
            })

            return {
                status: true,
                code: 200,
                data
            }
        } catch (error) {
            console.error('Upload receive module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    destroy = async (id) => {
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

            const placement = await prisma.placementRack.findFirst({
                where: {
                    material_receive_id: parseInt(id)
                }
            })

            if(placement) {
                return {
                    status: false,
                    code: 402,
                    error: "Can't delete material"
                }
            }

            const destroymaterial = await prisma.materialReceive.delete({
                where: {
                    id: parseInt(id),
                },
            })

            const traveldoc = await prisma.travelDoc.findFirst({
                where: {
                    MaterialReceive: {
                        none: {}
                    }
                }
            })

            if (traveldoc) {
                await prisma.travelDoc.delete({
                    where: {
                        id: traveldoc.id
                    }
                })
            }

            const file = await prisma.fileMaterialReceive.findFirst({
                where: {
                    MaterialReceive:{
                        none: {}
                    }
                }
            })

            if (file) {
                await prisma.fileMaterialReceive.delete({
                    where: {
                        id: file.id
                    }
                })
                fs.unlinkSync(file.file_path)
            }

            return {
                status: true,
                code: 201,
                data: destroymaterial,
            }
        } catch (error) {
            console.error('Destroy receive module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    getFile = async () => {
        try {
            const list = await prisma.fileMaterialReceive.findMany()

            return {
                status: true,
                code: 201,
                data: list
            }
        } catch (error) {
            console.error('listFile receive module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    getMaterialReceive = async (id) => {
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

            const list = await prisma.materialReceive.findMany({
                where: {
                    file_material_id: parseInt(id)
                },
                include: {
                    material: {
                        include: {
                            supllier: true
                        }
                    },
                    batch_material: {
                        include: {
                            supllier: true
                        }
                    },
                    travel_doc: true
                }
            })

            return {
                status: true,
                code: 201,
                data: list
            }
        } catch (error) {
            console.error('listFile receive module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updateMaterialReceive = async (body, id) => {
        try {
            console.log(body.weight)
            const schema = Joi.number().required()

            const validation = schema.validate(body.weight)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const update = await prisma.materialReceive.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    weight: parseInt(body.weight)
                }
            })

            return {
                status: true,
                code: 201,
                data: update
            }
        } catch (error) {
            console.error('listFile receive module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    amount = async () => {
        try {
            const amount = await prisma.materialReceive.count()

            return {
                status: true,
                code: 201,
                data: amount
            }
        } catch (error) {
            console.error('amount material receive module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _receive()