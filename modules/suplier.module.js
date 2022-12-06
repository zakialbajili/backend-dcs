const prisma = require("../helpers/database")
const Joi = require("joi")

class _suplier {
    listSuplier = async () => {
        try {
            const list = await prisma.supplier.findMany();
            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('LIST SUPPLIER ERROR', error);
            return {
                status: false,
                error
            }
        }
    }

    createSuplier = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                phone: Joi.string().pattern(/^[0-9]+$/).required(), // for string but number for number phone
                address: Joi.string().required(),
            })
            const validation = schema.validate(body)
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            const add = await prisma.supplier.create({
                data: {
                    name: body.name,
                    email: body.email,
                    phone: body.phone, // for string but number for number phone
                    address: body.address,
                }
            },
            )
            return {
                status: true,
                code: 201,
                data: add
            }


        } catch (error) {
            console.error('create Supllier erorr : ', error);
            return {
                status: false,
                error
            }

        }
    }
    destroySuplier = async (id) => {
        try {
            const destroy = await prisma.supplier.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return {
                status: true,
                message: "berhasil di delete",
                code: 200
            }
        } catch (error) {
            console.error('destroy Suplier module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
    updateSuplier = async (body, id) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                phone: Joi.string().pattern(/^[0-9]+$/).required(), // for string but number for number phone
                address: Joi.string().min(15).required(),
            })
            const validation = schema.validate(body)
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const update = await prisma.supplier.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                }
            })

            return {
                status: true,
                code: 200,
                message: "berhasil di update",
                data: update
            }
        } catch (error) {
            console.error('update Suplier module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _suplier();