const UserController = require('./controllers/UserController');
const RoleController = require('./controllers/RoleController');
const UserRoleController = require('./controllers/UserRoleController');
const AuthUserController = require('./controllers/AuthUserController');
const MaterialReceiveController = require('./controllers/MaterialReceiveController');
const RackController = require('./controllers/RackController');
const SuplierController = require('./controllers/SuplierController');
const BatchController = require('./controllers/BatchMaterialController');
const SeederController = require('./controllers/SeederController');
const PlacementController = require('./controllers/PlacementController');
const hwoController = require('./controllers/history_work_orderController');
const wodController = require('./controllers/work_order_detailController');
const supplierController = require('./controllers/SupplierController');
const MaterialController = require('./controllers/MaterialController');
const SummaryController = require('./controllers/SummaryController');
const FGproductionController = require('./controllers/FGProductionController');
const FGStockOpnameController = require('./controllers/FGStockOpnameController');
const MaterialStockController = require('./controllers/MaterialStockController');
const MonitoringRackController = require('./controllers/MonitoringRackController');
const MaterialRequestController = require('./controllers/MaterialRequestController');
const DeliveryController = require('./controllers/deliveryController')


const _routes = [
  ['users', UserController],
  ['roles', RoleController],
  ['userRoles', UserRoleController],
  ['rack', RackController],
  ['materialReceive', MaterialReceiveController],
  ['materialRequest', MaterialRequestController],
  ['batch', BatchController],
  ['placement', PlacementController],
  ['seeder', SeederController],
  ['', AuthUserController],
  ['sup', SuplierController],
  ['history_work_order', hwoController],
  ['supplier', supplierController],
  ['material', MaterialController],
  ['summary', SummaryController],
  ['production', FGproductionController],
  ['fg/stock', FGStockOpnameController],
  ['mStocks', MaterialStockController],
  ['work_order_detail', wodController],
  ['Monitoring', MonitoringRackController],
  ['delivery', DeliveryController]
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;

    // http://localhost:8080/api
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
