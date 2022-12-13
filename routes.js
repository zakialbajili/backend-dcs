const UserController = require("./controllers/UserController")
const RoleController = require("./controllers/RoleController")
const UserRoleController = require("./controllers/UserRoleController")
const AuthUserController = require("./controllers/AuthUserController")
const hwoController = require("./controllers/history_work_orderController")
const wodController = require("./controllers/work_order_detailController")
const supplierController = require("./controllers/SupplierController")

const _routes = [
    ['users', UserController],
    ['roles', RoleController],
    ['userRoles', UserRoleController],
    ['', AuthUserController],
    ['history_work_order', hwoController],
    ['work_order_detail', wodController],
    ['supplier', supplierController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes