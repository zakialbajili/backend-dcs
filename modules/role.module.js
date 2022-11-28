const prisma = require("../helpers/database")
const Joi = require("joi")

class _role {
    listRole = async () => {
        try {
            const list = await prisma.authRole.findMany()

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('listRole role module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    createRole = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required()
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

            const add = await prisma.authRole.create({
                data: {
                    name: body.name
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }
        } catch (error) {
            console.error('createRole role module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    detailRole = async (id) => {
        try {
            const detail = await prisma.authRole.findFirst({
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
            console.error('detailRole role module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updateRole = async (body, id) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required()
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

            const update = await prisma.authRole.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name: body.name
                }
            })

            return {
                status: true,
                code: 201,
                data: update
            }
        } catch (error) {
            console.error('updateRole role module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    destroyRole = async (id) => {
        try {
            const destroy = await prisma.authRole.delete({
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
            console.error('destroyRole role module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _role