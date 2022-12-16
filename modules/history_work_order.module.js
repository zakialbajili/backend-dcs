const prisma = require("../helpers/database")
const Joi = require("joi")

class _hwo {

    createhwo = async (body) => {
        try {
            const schema = Joi.object({
                name_file: Joi.string().required(),
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
            const add = await prisma.history_work_order.create({
                data: {
                    name_file: body.filename,
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }
        } catch (error) {
            console.error('historyWorkOrder hwo module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    
}
module.exports = new _hwo()