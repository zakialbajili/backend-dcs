const UserController = require("./controllers/UserController")
const RoleController = require("./controllers/RoleController")
const UserRoleController = require("./controllers/UserRoleController")
const AuthUserController = require("./controllers/AuthUserController")
const MaterialReceiveController = require("./controllers/MaterialReceiveController")
const RackController = require("./controllers/RackController")
const SuplierController = require("./controllers/SuplierController")
const BatchController = require("./controllers/BatchMaterialController")
const SeederController = require("./controllers/SeederController")
const PlacementController = require("./controllers/PlacementController")

const _routes = [
    ['users', UserController],
    ['roles', RoleController],
    ['userRoles', UserRoleController],
    ['rack', RackController],
    ['materialReceive', MaterialReceiveController],
    ['batch', BatchController],
    ['placement', PlacementController],
    ['seeder', SeederController],
    ['', AuthUserController],
    ['sup', SuplierController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8080/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes