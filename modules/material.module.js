const prisma = require("../helpers/database")
const Joi = require("joi")

class _material {
    listMaterial = async () => {
        try {
            const list = await prisma.material.findMany();

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('listMaterial material module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    createMaterial = async (body) => {
        try {
            const schema = Joi.object({
                Supplier: Joi.string().required(),
                MaterialName: Joi.string().required(),
                MaterialNumber: Joi.string().required()
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

            const supllier = await prisma.supplier.findFirst({
                where: {
                    name: body.Supplier
                },
                select: {
                    id: true
                }
            })

            const add = await prisma.material.create({
                data: {
                    material_number: body.MaterialNumber,
                    material_name: body.MaterialName,
                    supllier: {
                        connect: {
                            id: supllier.id
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
            console.error('CreateMaterial Material module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    updateMaterial = async (body) => {
        try {
            const schema = Joi.object({
                Supplier: Joi.string().required(),
                MaterialName: Joi.string().required(),
                MaterialNumber: Joi.string().required()
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

            const supllier = await prisma.supplier.findFirst({
                where: {
                    name: body.Supplier
                },
                select: {
                    id: true
                }
            })

            const update = await prisma.material.update({
                data: {
                    material_number: body.MaterialNumber,
                    material_name: body.MaterialName,
                    supllier: {
                        connect: {
                            id: supllier.id
                        }
                    }
                }
            })

            return {
                status: true,
                code: 202,
                data: update
            }
        } catch (error) {
            console.error('UpdateMaterial material module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _material()