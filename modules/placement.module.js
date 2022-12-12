const prisma = require("../helpers/database")
const Joi = require("joi")

class _placement {
    suggestion = async (body) => {
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

            let materialReceive = await prisma.material.findFirst({
                where: {
                    MaterialReceive: {
                        every: {
                            id: body.id
                        }
                    }
                },
                include: {
                    MaterialReceive: true
                }
            })

            if (!materialReceive) {
                materialReceive = await prisma.batchMaterial.findFirst({
                    where: {
                        MaterialReceive: {
                            every: {
                                id: body.id
                            }
                        }
                    },
                    include: {
                        MaterialReceive: true
                    }
                })
            }

            if (!materialReceive) {
                return {
                    status: false,
                    code: 401,
                    error: 'Material Receive tidak ditemukan'
                }
            }

            // percobaan 1
            // const placement = await prisma.rack.findMany({
            //     where: {
            //         supplier_id: materialReceive.supplier_id
            //     },
            //     include: {
            //         PlacementRack: {
            //             include: {
            //                 material_receive: true
            //             }
            //         }
            //     }
            // })

            // if (placement.length == 0) {
            //     return {
            //         status: false,
            //         code: 402,
            //         error: 'Rack tidak tersedia'
            //     }
            // }

            // const terisi = placement.filter((i) => 
            //     i.PlacementRack.length > 0
            // )

            // const kosong = placement.filter((i) => 
            //     i.PlacementRack.length == 0
            // )

            // let rack = terisi.find((i) => {
            //     if (
            //         (i.PlacementRack[0].material_receive.material_id === materialReceive.MaterialReceive[0].material_id) &&
            //         (i.PlacementRack[0].material_receive.batch_material_id === materialReceive.MaterialReceive[0].batch_material_id) &&
            //         ((i.PlacementRack.reduce((acc, j) => acc + j.material_receive.weight, 0) + materialReceive.MaterialReceive[0].weight) * 1000) < i.max_capacity
            //     ){
            //         // console.log(((i.PlacementRack.reduce((acc, j) => acc + j.material_receive.weight, 0) + materialReceive.MaterialReceive[0].weight) * 1000))
            //         return i
            //     }
            // })

            // if (!rack) {
            //     rack = kosong.find((i) => i.max_capacity > materialReceive.MaterialReceive[0].weight * 1000)
            // }

            // if (!rack) {
            //     return {
            //         status: false,
            //         code: 403,
            //         error: 'Berat melebihi seluruh max capacity rack'
            //     }
            // }

            // delete rack.PlacementRack

            // return {
            //     status: true,
            //     code: 201,
            //     data: [materialReceive, rack]
            // }

            //percobaan 2
            const placement = await prisma.placementRack.findFirst({
                where: {
                    OR: [

                    ]
                }
            })

        } catch (error) {
            console.error('suggestion Placement module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    addPlacement = async (body) => {
        try {
            const schema = Joi.object({
                rack_number: Joi.string().required(),
                id_materialreceive: Joi.number().required(),
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

            const rack = await prisma.rack.findFirst({
                where: {
                    rack_number: body.rack_number
                },
                select: {
                    id: true,
                    max_capacity: true,
                    supplier_id: true
                }
            })

            if (!rack) {
                return {
                    status: false,
                    code: 402,
                    error: 'Rack tidak ditemukan'
                }
            }

            let materialReceive = await prisma.material.findFirst({
                where: {
                    MaterialReceive: {
                        every: {
                            id: body.id_materialreceive
                        }
                    }
                },
                include: {
                    MaterialReceive: true
                }
            })

            if (!materialReceive) {
                materialReceive = await prisma.batchMaterial.findFirst({
                    where: {
                        MaterialReceive: {
                            every: {
                                id: body.id_materialreceive
                            }
                        }
                    },
                    include: {
                        MaterialReceive: true
                    }
                })
            }

            if (!materialReceive) {
                return {
                    status: false,
                    code: 401,
                    error: 'Material Receive tidak ditemukan'
                }
            }

            const placements = await prisma.placementRack.findMany({
                where: {
                    rack_id: rack.id
                },
                select: {
                    material_receive_id: true,
                    material_receive: true
                }
            })

            //cek kesamaan supplier dan apakah rak sudah terisi dengan material receive lain
            if((materialReceive.supplier_id !== rack.supplier_id) || ((placements.length > 0) && (placements[0].material_receive_id != body.id_materialreceive))) {
                return {
                    status: false,
                    code: 402,
                    error: 'Rack tidak dapat digunakan'
                }
            }

            let totalCapacity = 0

            if (placements.length > 0) {
                totalCapacity = placements.reduce((acc, placement) => acc + placement.material_receive.weight, 0)
            }


            if (((totalCapacity + materialReceive.MaterialReceive[0].weight) * 1000) > rack.max_capacity) {
                return {
                    status: false,
                    code: 403,
                    error: 'Kapasitas rack tidak cukup'
                }
            }

            const add = await prisma.placementRack.create({
                data: {
                    material_receive: {
                        connect: {
                            id: body.id_materialreceive
                        }
                    },
                    rack: {
                        connect: {
                            id: rack.id
                        }
                    }
                }
            })

            return {
                status: true,
                code: 202,
                data: add
            }

        } catch (error) {
            console.error('addPlacement Placement module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _placement()