const prisma = require("../helpers/database")
const Joi = require("joi")

class _userRole {
    listUserRole = async () => {
        try {
            const list = await prisma.authUserRole.findMany({
                include: {
                    auth_user: true,
                    auth_role: true
                }
            })

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('listUserRole userRole module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    createUserRole = async (body) => {
        try {
            const schema = Joi.object({
                user_id: Joi.number().required(),
                role_id: Joi.number().required()
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

            const add = await prisma.authUserRole.create({
                data: {
                    auth_user_id: parseInt(body.user_id),
                    auth_role_id: parseInt(body.role_id)
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }
        } catch (error) {
            console.error('createUserRole userRole module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    detailUserRole = async (id) => {
        try {
            const detail = await prisma.authUserRole.findFirst({
                where: {
                    id: parseInt(id)
                },
                include: {
                    auth_user: true,
                    auth_role: true
                }
            })

            return {
                status: true,
                code: 200,
                data: detail
            }
        } catch (error) {
            console.error('detailUserRole userRole module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updateUserRole = async (body, id) => {
        try {
            const schema = Joi.object({
                user_id: Joi.number().required(),
                role_id: Joi.number().required()
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

            const update = await prisma.authUserRole.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    auth_user_id: parseInt(body.user_id),
                    auth_role_id: parseInt(body.role_id)
                }
            })

            return {
                status: true,
                code: 200,
                data: update
            }
        } catch (error) {
            console.error('updateUserRole userRole module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    destroyUserRole = async (id) => {
        try {
            const destroy = await prisma.authUserRole.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return {
                status: true,
                code: 200
            }
        } catch (error) {
            console.error('destroyUserRole userRole module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _userRole();