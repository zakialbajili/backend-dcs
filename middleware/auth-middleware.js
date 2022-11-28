const jwt = require('jsonwebtoken')
const prisma = require('../helpers/database')

auth = async (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).send("Access denied, please login to access application")
    }

    const tokenBody = token.slice(7)
    const decoded = jwt.verify(tokenBody, 'jwt-secret-code')
    req.users = await prisma.authUser.findFirst({
        where: {
            id: decoded.id
        }
    })

    next()
}

module.exports = auth