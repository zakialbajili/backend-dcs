const prisma = require("../helpers/database")
const Joi = require("joi")
const listFGstockOpname = require("../dummy/FGstockOpname.json")
const listChartStock = require("../dummy/chartStock.json")
const listFGInOut = require("../dummy/FGInOut.json")
const jwt = require('jsonwebtoken')

class _FGstockOpname {
    // list Detail Part Finish Good
    listFGstockOpname = async ({ partId: partId, month: month}) => {
        try {
            if (partId != undefined && month == undefined) {
                const filteredList = this.listFGstockOpname.data.filter(function (item) {
                    return item.part_id == partId;
                });
                return {
                    status: true,
                    code: 200,
                    list: filteredList
                }
            } else if (partId == undefined && month != undefined) {
                const filteredList = listFGstockOpname.data.filter(function(item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month;
                });
                return {
                    status: true,
                    code: 200,
                    list: filteredList
                }
            } else if ((partId != undefined && month != undefined)) {
                const filteredList = listFGstockOpname.data.filter(function(item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month && item.part_id == partId;
                });
                return {
                    status: true,
                    code: 200,
                    list: filteredList
                }
            }
            else {
                return {
                    status: true,
                    code: 200,
                    list: listFGstockOpname
                }
            }
            

        } catch (error) {
            console.error('list stock opname fg module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // list Chart Stock
    listChartStock = async ({ month: month }) => {
        try {
            if (month != undefined) {
                const filteredList = listChartStock.data.filter(function (item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month;
                });
                return {
                    status: true,
                    code: 200,
                    list: filteredList
                }
            } else {
                return {
                    status: true,
                    code: 200,
                    list: listChartStock
                }
            }
        } catch (error) {
            console.error('list chart stock module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // list FG In vs Out
    listFGInOut = async ({ month: month }) => {
        try {
            if (month != undefined) {
                const filteredList = listFGInOut.data.filter(function (item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month;
                });
                return {
                    status: true,
                    code: 200,
                    list: filteredList
                }
            } else {
                return {
                    status: true,
                    code: 200,
                    list: listFGInOut
                }
            }
        } catch (error) {
            console.error('list FG in vs out module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

}

module.exports = new _FGstockOpname