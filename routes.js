const UserController = require("./controllers/UserController")
const RoleController = require("./controllers/RoleController")
const UserRoleController = require("./controllers/UserRoleController")
const AuthUserController = require("./controllers/AuthUserController")
const MaterialReceiveController = require("./controllers/MaterialReceiveController")
const RackController = require("./controllers/RackController")

const _routes = [
    ['users', UserController],
    ['roles', RoleController],
    ['userRoles', UserRoleController],
    ['rack', RackController],
    ['materialReceive', MaterialReceiveController],
    ['', AuthUserController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8080/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes