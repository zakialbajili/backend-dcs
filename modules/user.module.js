const prisma = require("../helpers/database")
const Joi = require("joi")
const bcrypt = require("bcrypt")

class _user {
    listUser = async () => {
        try {
            const list = await prisma.authUser.findMany();

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('listUser user module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    createUser = async (body) => {
        try {
            const schema = Joi.object({
                nisp: Joi.string().required(),
                password: Joi.string().required()
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
            const password = bcrypt.hashSync(body.password, 10)
            const add = await prisma.authUser.create({
                data: {
                    nisp: body.nisp,
                    password
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }
        } catch (error) {
            console.error('createUser user module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    detailUser = async (id) => {
        try {
            const detail = await prisma.authUser.findFirst({
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
            console.error('detailUser user module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updateUser = async (body, id) => {
        try {
            const schema = Joi.object({
                nisp: Joi.string().required(),
                password: Joi.string().required()
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
            const password = bcrypt.hashSync(body.password, 10)
            const update = await prisma.authUser.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    nisp: body.nisp,
                    password
                }
            })

            return {
                status: true,
                code: 200,
                data: update
            }
        } catch (error) {
            console.error('updateUser user module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    destroyUser = async (id) => {
        try {
            const destroy = await prisma.authUser.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return {
                status: true,
                code: 200
            }
        } catch (error) {
            console.error('destroyUser user module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _user()