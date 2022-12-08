const jwt = require('jsonwebtoken')
const prisma = require('../helpers/database')

auth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'jwt-secret-code');

            const user = await prisma.authUser.findUnique({
                where: {
                    id: decoded.id,
                },
            });

            const userRoles = await prisma.authUserRole.findFirst({
                where: {
                    auth_user_id: decoded.id,
                }
            })

            if (user) {
                // define user value from token in request
                req.user = {
                    id: user.id,
                    nisp: user.nisp,
                };
                next();
            } else {
                res.status(403).send({
                    status: false,
                    error: "Not Authorize",
                });
            }
        } catch (error) {
            console.log("auth middleware error: ", error);
            res.status(403).send({
                status: false,
                error: "Not Authorize",
            });
        }
    }

    if (!token) {
        res.status(401).send({
            status: false,
            error: "Not Authorize, No Token",
        });
    }
}

module.exports = auth