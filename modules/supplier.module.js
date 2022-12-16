const prisma = require("../helpers/database")
const Joi = require("joi")

class _supplier {
    createSupplier = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                phone: Joi.string().required(),
                address: Joi.string().required()
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
            const add = await prisma.suppliers.create({
                data: {
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    address: body.address
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }
        } catch (error) {
            console.error('createSupplier supplier module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _supplier()