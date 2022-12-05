const UserController = require("./controllers/UserController")
const RoleController = require("./controllers/RoleController")
const UserRoleController = require("./controllers/UserRoleController")
const AuthUserController = require("./controllers/AuthUserController")
<<<<<<< HEAD
const SuplierController = require("./controllers/SuplierController")
=======
const ReceiveController = require("./controllers/ReceiveController")
const RackController = require("./controllers/RackController")
>>>>>>> d5c4372f2524fa3c5362e623deaa4c3717ae66a2

const _routes = [
    ['users', UserController],
    ['roles', RoleController],
    ['userRoles', UserRoleController],
<<<<<<< HEAD
    ['', AuthUserController],
    ['sup', SuplierController],
=======
    ['rack', RackController],
    ['receive', ReceiveController],
    ['', AuthUserController]
>>>>>>> d5c4372f2524fa3c5362e623deaa4c3717ae66a2
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes