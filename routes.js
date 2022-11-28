const UserController = require("./controllers/UserController")
const RoleController = require("./controllers/RoleController")
const UserRoleController = require("./controllers/UserRoleController")

const _routes = [
    ['users', UserController],
    ['roles', RoleController],
    ['userRoles', UserRoleController],
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes