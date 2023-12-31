const prisma = require("../helpers/database")
const Joi = require("joi")
const listNG = require("../dummy/summaryNG.json")
const listDPA = require("../dummy/summaryDPA.json")
const jwt = require('jsonwebtoken')
const { number, date } = require("joi")
const dayjs = require("dayjs")
const weekOfYear = require('dayjs/plugin/weekOfYear')

dayjs.extend(weekOfYear)

// dayjs atau date and time
// $queryRaw

class _summary {
    // Summary NG
    listSummaryNG = async ({ partId: partId, month: month }) => {
        try {
            const total = [];
            let sum = 0;

            function totalSum(filtered) {
                filtered.filter(function (item) {
                    const totalAll = item.total;
                    total.push(totalAll);
                    return totalAll;
                });

                function sumArray(array) {
                    array.forEach(item => {
                        sum += item;
                    });

                    // console.log(total);
                    return sum;
                };

                sumArray(total);
            }

            if (partId != undefined && month == undefined) {
                const filteredList = listNG.data.filter(function (item) {
                    return item.part_id == partId;
                });

                totalSum(filteredList);

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                    total_ng: sum
                };
            } else if (partId == undefined && month != undefined) {
                const filteredList = listNG.data.filter(function (item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month;
                });

                totalSum(filteredList);

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                    total_ng: sum
                };
            } else if ((partId != undefined && month != undefined)) {
                const filteredList = listNG.data.filter(function (item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month && item.part_id == partId;
                });

                totalSum(filteredList);

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                    total_ng: sum
                };
            }
            else {
                totalSum(listNG.data);

                return {
                    status: true,
                    code: 200,
                    list: listNG,
                    total_ng: sum
                };
            };

        } catch (error) {
            console.error('list summary NG module Error: ', error);
            return {
                status: false,
                error
            };
        };
    };

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
            console.error('list summary DPA module Error: ', error);
            return {
                status: false,
                error
            };
        };
    };

    listSummaryNGDate = async ({ tanggal: tanggal, enddate: enddate }) => {
        try {

            const total = [];
            let sum = 0;

            console.log(tanggal);

            function totalSum(filtered) {
                filtered.filter(function (item) {
                    const totalAll = item.total;
                    total.push(totalAll);
                    return totalAll;
                });

                function sumArray(array) {
                    array.forEach(item => {
                        sum += item;
                    });

                    // console.log(total);
                    return sum;
                };

                sumArray(total);
            }

            if (enddate == undefined) {
                const filteredList = listNG.data.filter(function (item) {
                    const dateItem = item.created_at.substring(0, 10) == tanggal;
                    return dateItem;
                });

                totalSum(filteredList);

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                    total_ng: sum
                };
            } else {
                const filteredList = listNG.data.filter(function (item) {
                    const dateItem = item.created_at.substring(0, 10);
                    const endTangal = item.created_at.substring(0, 10);
                    console.log(endTangal)
                    
                    return dateItem  >= tanggal && dateItem <= endTangal;;
                });

                totalSum(filteredList);

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                    total_ng: sum
                };
            }
        }
        catch (error) {
            console.error('list summary NG Date module Error: ', error);
            return {
                status: false,
                error
            };
        };
    }

    // Summary DPA Weekly
    // Week yang lengkap 50
    listSummaryDPAWeek = async ({ week: week }) => {
        try {
            const filteredList = listDPA.data.filter(function (item) {
                const weekItem = dayjs(item.created_at).week() == week;
                return weekItem;
            });

            return {
                status: true,
                code: 200,
                list: filteredList
            };
            
        }
        catch (error) {
            console.error('list summary DPA Week module Error: ', error);
            return {
                status: false,
                error
            };
        };
    };

    listSummaryDPADate = async ({ tanggal: tanggal, enddate: enddate }) => {
        try {
            if (enddate == undefined) {
                const filteredList = listDPA.data.filter(function (item) {
                    const dateItem = item.created_at.substring(0, 10) == tanggal;
                    return dateItem;
                });

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                };
            } else {
                const filteredList = listDPA.data.filter(function (item) {
                    const dateItem = item.created_at.substring(0, 10);
                    const endTangal = item.created_at.substring(0, 10);
                    console.log(endTangal)
                    
                    return dateItem  >= tanggal && dateItem <= endTangal;;
                });

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                };
            }
        }
        catch (error) {
            console.error('list summary DPA Date module Error: ', error);
            return {
                status: false,
                error
            };
        };
    }
};

module.exports = new _summary;
