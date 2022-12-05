const prisma = require("../helpers/database")
const Joi = require("joi")

class _rack {
    listRack = async () => {
        try {
            const list = await prisma.rack.findMany();

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('listRack Rack module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    createRack = async (body) => {
        try {
            const schema = Joi.object({
                rack_number: Joi.string().required(),
                rack_name: Joi.string().required(),
                address: Joi.string().required(),
                max_capacity: Joi.number().required(),
                supplier_name: Joi.string().required(),
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

            const add = await prisma.rack.create({
                data: {
                    rack_number: body.rack_number,
                    rack_name: body.rack_name,
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
            console.error('createRack Rack module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    detailRack = async (id) => {
        try {
            const detail = await prisma.rack.findFirst({
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
            console.error('detailRack Rack module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updateRack = async (body, id) => {
        try {
            const schema = Joi.object({
                rack_number: Joi.string().required(),
                rack_name: Joi.string(),
                address: Joi.string(),
                max_capacity: Joi.number(),
                supplier_name: Joi.string().required(),
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

            const update = await prisma.rack.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    rack_number: body.rack_number,
                    rack_name: body.rack_name,
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
                data: update
            }
        } catch (error) {
            console.error('updateRack Rack module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    destroyRack = async (id) => {
        try {
            const destroy = await prisma.rack.delete({
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
            console.error('destroyRack Rack module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _rack()