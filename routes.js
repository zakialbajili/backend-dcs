const UserController = require("./controllers/UserController")
const RoleController = require("./controllers/RoleController")
const UserRoleController = require("./controllers/UserRoleController")
const AuthUserController = require("./controllers/AuthUserController")
const ReceiveController = require("./controllers/ReceiveController")
const RackController = require("./controllers/RackController")
<<<<<<< HEAD
const SuplierController = require("./controllers/SuplierController")
=======
const BatchController = require("./controllers/BatchMaterialController")
>>>>>>> 71188524328a3517f4cbdf35aebc75db5338160b

const _routes = [
    ['users', UserController],
    ['roles', RoleController],
    ['userRoles', UserRoleController],
    ['rack', RackController],
    ['receive', ReceiveController],
<<<<<<< HEAD
    ['', AuthUserController],
    ['sup', SuplierController]
=======
    ['batch', BatchController],
    ['', AuthUserController]
>>>>>>> 71188524328a3517f4cbdf35aebc75db5338160b
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes