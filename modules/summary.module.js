const prisma = require("../helpers/database")
const Joi = require("joi")
const listNG = require("../dummy/summaryNG.json")
const listDPA = require("../dummy/summaryDPA.json")
const jwt = require('jsonwebtoken')
const { number } = require("joi")

// dayjs atau date and time
// $queryRaw

class _summary {
    // Summary NG
    listSummaryNG = async ({ materialId: materialId, month: month }) => {
        try {
            if (materialId != undefined && month == undefined) {
                const filteredList = listNG.data.filter(function (item) {
                    return item.material_id == materialId;
                });
                return {
                    status: true,
                    code: 200,
                    list: filteredList
                }
            } else if (materialId == undefined && month != undefined) {
                const filteredList = listNG.data.filter(function (item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month;
                });
                return {
                    status: true,
                    code: 200,
                    list: filteredList
                }
            } else if ((materialId != undefined && month != undefined)) {
                const filteredList = listNG.data.filter(function (item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month && item.material_id == materialId;
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
                    list: listNG
                }
            }

        } catch (error) {
            console.error('list summary NG module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Summary DPA
    listSummaryDPA = async ({ month: month }) => {
        try {
            if (month != undefined) {
                const filteredList = listDPA.data.filter(function (item) {
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
                    list: listDPA
                }
            }
        }
        catch (error) {
            console.error('list summary NG module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _summary
