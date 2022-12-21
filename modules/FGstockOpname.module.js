const prisma = require("../helpers/database")
const Joi = require("joi")
const listFGstockOpname = require("../dummy/FGstockOpname.json")
const listChartStock = require("../dummy/chartStock.json")
const listFGInOut = require("../dummy/FGInOut.json")
const jwt = require('jsonwebtoken')

class _FGstockOpname {
    // list Detail Part Finish Good
    listFGstockOpname = async ({ supplier: supplier, startdate: startdate, enddate: enddate, page: page, per_page: per_page }) => {
        try {
            let filteredList = listFGstockOpname.data
            if (supplier != undefined && (startdate == undefined && enddate == undefined)) {
                 filteredList = listFGstockOpname.data.filter(function (item) {
                    return item.supplier == supplier;
                });
                
            } else if (supplier == undefined && (startdate != undefined && enddate != undefined)) {
                 filteredList = listFGstockOpname.data.filter(function(item) {
                    const monthItem = item.created_at;
                    console.log(monthItem);
                    return (monthItem >= startdate && monthItem <= enddate) ;
                });
                
            } else if ((supplier != undefined && (startdate != undefined && enddate != undefined))) {
                 filteredList = listFGstockOpname.data.filter(function(item) {
                    const monthItem = item.created_at;
                    return (monthItem >= startdate && monthItem <= enddate) && item.supplier == supplier;
                });
                
            }
            // page, per page, total data, total page 
            console.log (filteredList.length);
            const total_data = filteredList.length;
            let total_page = 1
            if (page && per_page) {
                total_page = total_data / per_page
                const offset = (page -1) * (per_page) 
                const data = filteredList.slice(offset).slice(0, per_page)
                filteredList = data
            }
                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                    total_page: total_page,
                    total_data: total_data
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
    listChartStock = async ({ date: date }) => {
        try {
            if (date != undefined) {
                const filteredList = listChartStock.data.filter(function (item) {
                    const monthItem = item.created_at;
                    return monthItem == date;
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
                    list: listChartStock.data
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
    listFGInOut = async ({ startdate: startdate, enddate: enddate }) => {
        try {
            if (startdate != undefined && enddate != undefined) {
                const filteredList = listFGInOut.data.filter(function (item) {
                    const monthItem = item.created_at;
                    console.log (monthItem);
                    return (monthItem >= startdate && monthItem <= enddate) ;

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