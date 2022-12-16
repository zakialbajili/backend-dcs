const prisma = require("../helpers/database")
const Joi = require("joi")

class _batch {
    listBatch = async () => {
        try {
            const list = await prisma.batchMaterial.findMany();

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('listBatch Batch module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    createBatch = async (body) => {
        try {
            const schema = Joi.object({
                batch_name: Joi.string().required(),
                batch_number: Joi.string().required(),
                min_stock: Joi.number().required(),
                max_stock: Joi.number().required(),
                supplier_name: Joi.string().uppercase().required()
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

            const supplier = await prisma.supplier.findFirst({
                where: {
                    name: body.supplier_name
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

            const add = await prisma.batchMaterial.create({
                data: {
                    batch_material_number: body.batch_number,
                    batch_material_name: body.batch_name,
                    type: 'B',
                    min_stock: body.min_stock,
                    max_stock: body.max_stock,
                    supllier: {
                        connect: {
                            id: supplier.id
                        }
                    }
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }
        } catch (error) {
            console.error('createBatch Batch module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    detailBatch = async (id) => {
        try {
            const detail = await prisma.batchMaterial.findFirst({
                where: {
                    id: parseInt(id)
                }
            })

            return {
                status: true,
                code: 200,
                data: detail
            }
        } catch (error) {
            console.error('detailBatch Batch module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updateBatch = async (body, id) => {
        try {
            const schema = Joi.object({
                batch_name: Joi.string().required(),
                batch_number: Joi.string().required(),
                min_stock: Joi.number().required(),
                max_stock: Joi.number().required(),
                supplier_name: Joi.string().uppercase().required()
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

            const supplier = await prisma.supplier.findFirst({
                where: {
                    name: body.supplier_name
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

            const update = await prisma.batchMaterial.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    batch_material_number: body.batch_number,
                    batch_material_name: body.batch_name,
                    type: 'B',
                    min_stock: body.min_stock,
                    max_stock: body.max_stock,
                    supllier: {
                        connect: {
                            id: supplier.id
                        }
                    }
                }
            })

            return {
                status: true,
                code: 201,
                data: update
            }
        } catch (error) {
            console.error('updateBatch Batch module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    destroyBatch = async (id) => {
        try {
            const destroy = await prisma.batchMaterial.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return {
                status: true,
                code: 200,
                data: destroy
            }
        } catch (error) {
            console.error('destroyBatch Batch module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _batch()
