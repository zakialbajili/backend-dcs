const Joi = require('joi');
const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class _auth {
    login = async (body) => {
        try {
            const schema = Joi.object({
                nisp: Joi.string().required(),
                password: Joi.string().required(),
                role_id: Joi.number().required(),
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
            const user = await prisma.authUser.findFirst({
                where: {
                    nisp: body.nisp
                }
            })

            if (!user) {
                return {
                    status: false,
                    code: 404,
                    error: 'User not found'
                }
            }

            const userRole = await prisma.authUserRole.findFirst({
                where: {
                    auth_user_id: user.id
                }
            })

            if (!bcrypt.compareSync(body.password, user.password)) {
                return {
                    status: false,
                    code: 401,
                    error: 'Wrong Password'
                }
            }

            if (userRole.auth_role_id != parseInt(body.role_id)) {
                return {
                    status: false,
                    code: 401,
                    error: "Role doesn't match"
                }
            }

            const payload = {
                id: user.id,
                nisp: user.nisp,
                role_id: userRole.auth_role_id
            }

            const token = jwt.sign(payload, 'jwt-secret-code', { expiresIn: "8h" })

            return {
                status: true,
                data: {
                    token
                }
            }

        } catch (error) {
            console.error('login auth module Error:', error);

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _auth()