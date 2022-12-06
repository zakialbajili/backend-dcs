const UserController = require("./controllers/UserController")
const RoleController = require("./controllers/RoleController")
const UserRoleController = require("./controllers/UserRoleController")
const AuthUserController = require("./controllers/AuthUserController")
const ReceiveController = require("./controllers/ReceiveController")
const RackController = require("./controllers/RackController")
const SuplierController = require("./controllers/SuplierController")
const BatchController = require("./controllers/BatchMaterialController")
const _routes = [
    ['users', UserController],
    ['roles', RoleController],
    ['userRoles', UserRoleController],
    ['rack', RackController],
    ['receive', ReceiveController],
    ['batch', BatchController],
    ['', AuthUserController],
    ['sup', SuplierController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes