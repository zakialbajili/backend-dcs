const prisma = require("../helpers/database")
const Joi = require("joi")

class _pallete {
    listPallete = async () => {
        try {
            const list = await prisma.pallete.findMany();

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('listPallete Pallete module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    createPallete = async (body) => {
        try {
            const schema = Joi.object({
                pallete_number: Joi.string().required(),
                pallete_name: Joi.string().required(),
                address: Joi.string().required(),
                max_capacity_pcs: Joi.number().required(),
                supplier_name: Joi.string().required(),
                rack_number: Joi.string().required()
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

            const rack = await prisma.rack.findFirst({
                where: {
                    rack_number: body.rack_number
                },
                select: {
                    id: true
                }
            })

            if (!rack) {
                return {
                    status: false,
                    code: 401,
                    error: 'Rack not found'
                }
            }

            const add = await prisma.pallete.create({
                data: {
                    pallete_number: body.pallete_number,
                    pallete_name: body.pallete_name,
                    address: body.address,
                    max_capacity: body.max_capacity,
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
            console.error('createPallete Pallete module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _pallete()