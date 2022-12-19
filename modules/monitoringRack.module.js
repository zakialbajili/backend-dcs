const prisma = require('../helpers/database');
const Joi = require('joi');
const listMonitoringRack = require('../dummy/chartRack.json');
const jwt = require('jsonwebtoken');

class _Rack {
  listMonitoringRack = async ({ type: type, address: address }) => {
    try {
      if (type != undefined && address == undefined) {
        const filteredList = listMonitoringRack.data.filter(function (item) {
          return item.type == type;
        });
        return {
          status: true,
          code: 200,
          list: filteredList,
        };
      } else if (type == undefined && address != undefined) {
        const filteredList = listMonitoringRack.data.filter(function (item) {
          const addressItem = item.address;
          return addressItem == address;
        });
        return {
          status: true,
          code: 200,
          list: filteredList,
        };
      } else if (type != undefined && address != undefined) {
        const filteredList = listMonitoringRack.data.filter(function (item) {
          const addressItem = item.address;
          return addressItem == address && item.type == type;
        });
        return {
          status: true,
          code: 200,
          list: filteredList,
        };
      } else {
        return {
          status: true,
          code: 200,
          list: listMonitoringRack,
        };
      }
    } catch (error) {
      console.error('list monitoring rack fg module Error: ', error);
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _Rack();
