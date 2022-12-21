const prisma = require("../helpers/database")
const Joi = require("joi")

class _placement {
    list = async () => {
        try {
            const list = await prisma.placementRack.findMany({
                include: {
                    rack: true,
                    material_receive: {
                        include: {
                            material: true,
                            batch_material: true
                        }
                    }
                }
            })

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('List Histrory Placement module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

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
                        some: {
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
                            some: {
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
                    error: 'Material Receive not found'
                }
            }

            const placementStrore = await prisma.placementRack.findFirst({
                where: {
                    material_receive_id: body.id
                }
            })

            if (placementStrore) {
                return {
                    status: false,
                    code: 402,
                    error: 'Material Receive already saved'
                }
            }

            // percobaan 1
            // const placement = await prisma.rack.findMany({
            //     where: {
            //         type: materialReceive.MaterialReceive[0].type
            //     },
            //     include: {
            //         PlacementRack: {
            //             include: {
            //                 material_receive: true
            //             }
            //         }
            //     }
            // })

            // const terisi = placement.filter((i) => 
            //     i.PlacementRack.length > 0
            // )

            // const kosong = placement.filter((i) => 
            //     i.PlacementRack.length == 0
            // )

            // cari rak yang telah menyimpan material yang sama dan kapasistasnya masih cukup
            // let rack = terisi.find((i) => {
            //     if (
            //         (i.PlacementRack[0].material_receive.material_id === materialReceive.MaterialReceive[0].material_id) &&
            //         (i.PlacementRack[0].material_receive.batch_material_id === materialReceive.MaterialReceive[0].batch_material_id) &&
            //         ((i.PlacementRack.reduce((acc, j) => acc + j.material_receive.weight, 0) + weight) * 1000) < i.max_capacity
            //     ){
            //         // console.log(((i.PlacementRack.reduce((acc, j) => acc + j.material_receive.weight, 0) + weight) * 1000))
            //         return i
            //     }
            // })

            // cari rak yang kosong
            // if (!rack) {
            //     rack = kosong.find((i) => i.max_capacity > weight * 1000)
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
            // end percobaan 1


            // percobaan 2
            //cari rak yang menyimpan material yang sama
            let placement = await prisma.rack.findFirst({
                where: {
                    PlacementRack: {
                        some: {
                            material_receive: {
                                material_id : materialReceive.MaterialReceive[0].material_id,
                                batch_material_id: materialReceive.MaterialReceive[0].batch_material_id,
                            }
                        }
                    }
                }
            })

            //cari berat di MaterialReceive dengan id sesuai request
            const weight = materialReceive.MaterialReceive.find(m => m.id == body.id).weight

            let cek = true;
            while (cek == true && placement) {
                // hitung total berat material di rak
                const sumWeight = await prisma.materialReceive.aggregate({
                    where: {
                        PlacementRack: {
                            some: {
                                rack_id: placement.id,
                                material_receive: {
                                    material_id : materialReceive.MaterialReceive[0].material_id,
                                    batch_material_id: materialReceive.MaterialReceive[0].batch_material_id,
                                }
                            }
                        }
                    },
                    _sum: {
                        weight: true
                    },
                })

                // cek apakah rak masih bisa menampung material
                if ((sumWeight._sum.weight + weight) * 1000 > placement.max_capacity) {
                    // tidak dapat menampung
                    // cari rak lain yang berisi material yang sama
                    // jika tidak ada (null) looping berhenti
                    placement = await prisma.rack.findFirst({
                        where: {
                            AND : [
                                {
                                    id: {
                                        not: placement.id
                                    },
                                }, 
                                {
                                    id: {
                                        gt: placement.id
                                    }
                                }
                            ],
                            PlacementRack: {
                                some: {
                                    material_receive: {
                                        material_id : materialReceive.MaterialReceive[0].material_id,
                                        batch_material_id: materialReceive.MaterialReceive[0].batch_material_id,
                                    }
                                }
                            }
                        }
                    })
                } else {
                    // dapat menampung
                    // loopong dihentikan (placement ditemukan)
                    cek = false;
                }
            }

            if (!placement) {
                //cari rak yang masih kosong (belum menyimpan material lain)
                placement = await prisma.rack.findFirst({
                    where: {
                        type: materialReceive.MaterialReceive[0].type,
                        max_capacity: {
                            gte: weight * 1000
                        },
                        PlacementRack: {
                            none: {}
                        }
                    }
                })
            }

            if (!placement) {
                return {
                    status: false,
                    code: 404,
                    error: "All Rack isn't available"
                }
            }

            materialReceive = await prisma.materialReceive.findFirst({
                where: {
                    id: body.id
                },
                include: {
                    material: true,
                    batch_material: true
                }
            })

            return {
                status: true,
                code: 201,
                data: [placement, materialReceive]
            }

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
                }
            })

            if (!rack) {
                return {
                    status: false,
                    code: 402,
                    error: 'Rack not found'
                }
            }

            let materialReceive = await prisma.materialReceive.findFirst({
                where: {
                    id: body.id_materialreceive
                },
                include: {
                    material: true,
                    batch_material: true
                }
            })

            if (!materialReceive) {
                return {
                    status: false,
                    code: 401,
                    error: 'Material Receive not found'
                }
            }

            if (materialReceive.type !== rack.type) {
                return {
                    status: false,
                    code: 402,
                    error: "Type doesn't match"
                }
            }

            // percobaan 1
            // const placements = await prisma.placementRack.findMany({
            //     where: {
            //         rack_id: rack.id
            //     },
            //     select: {
            //         material_receive_id: true,
            //         material_receive: true
            //     }
            // })

            // // cek apakah rak sudah diisi dengan material lain
            // if((placements.length > 0) && ((placements[0].material_receive.material_id !== materialReceive.material_id) || (placements[0].material_receive.batch_material_id !== materialReceive.batch_material_id))) {
            //     return {
            //         status: false,
            //         code: 402,
            //         error: 'Rack already used'
            //     }
            // }

            // let totalCapacity = 0

            // // cek apakah kapitas masih bisa menampung
            // if (placements.length > 0) {
            //     totalCapacity = placements.reduce((acc, placement) => acc + placement.material_receive.weight, 0)
            // }

            // if (((totalCapacity + materialReceive.weight) * 1000) > rack.max_capacity) {
            //     return {
            //         status: false,
            //         code: 403,
            //         error: 'Rack is full'
            //     }
            // }
            // end percobaan 1


            // percobaan 2
            // menghitung jumlah berat dari material yang sama dan telah disimpan
            const sumWeight = await prisma.materialReceive.aggregate({
                where: {
                    PlacementRack: {
                        some: {
                            rack_id: rack.id,
                            material_receive: {
                                material_id : materialReceive.material_id,
                                batch_material_id: materialReceive.batch_material_id,
                            }
                        }
                    }
                },
                _sum: {
                    weight: true
                },
            })

            // mencari apakah rack sudah pernah terisi
            const placement = await prisma.placementRack.findFirst({
                where: {
                    rack_id: rack.id,
                },
                include: {
                    material_receive: true
                }
            })

            // cek kesamaan isi rak dengan data input
            if (placement && (placement.material_receive.material_id != materialReceive.material_id || placement.material_receive.batch_material_id != materialReceive.batch_material_id)) {
                return {
                    status: false,
                    code: 402,
                    error: "Rack already used"
                }
            }

            if (((sumWeight._sum.weight + materialReceive.weight) * 1000) > rack.max_capacity) {
                return {
                    status: false,
                    code: 403,
                    error: 'Rack is full'
                }
            }

            // rak belum pernah digunakan tetapi kapitas tidak cukup
            if (rack.max_capacity < materialReceive.weight * 1000) {
                return {
                    status: false,
                    code: 404,
                    error: 'Material exceeds the rack capacity'
                }
            }
            // end percobaan 2

            const add = await prisma.placementRack.create({
                data: {
                    material_receive_id: body.id_materialreceive,
                    rack_id: rack.id
                }
            })

            return {
                status: true,
                code: 202,
                data: {
                    materialReceive,
                    rack
                }
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