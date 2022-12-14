const UserController = require('./controllers/UserController');
const RoleController = require('./controllers/RoleController');
const UserRoleController = require('./controllers/UserRoleController');
const AuthUserController = require('./controllers/AuthUserController');
const MaterialController = require('./controllers/MaterialController');
const SummaryController = require('./controllers/SummaryController');
const FGproductionController = require('./controllers/FGProductionController');
const FGStockOpnameController = require('./controllers/FGStockOpnameController');
const MaterialStockController = require('./controllers/MaterialStockController');

const _routes = [
  ['users', UserController],
  ['roles', RoleController],
  ['userRoles', UserRoleController],
  ['material', MaterialController],
  ['summary', SummaryController],
  ['production', FGproductionController],
  ['fg/stock', FGStockOpnameController],
  ['', AuthUserController],
  ['mStocks', MaterialStockController],
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;

    // http://localhost:8000/api
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
