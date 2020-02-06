'use strict';

module.exports = function (Productwithtccp) {

    const remoteMethodNames = ['findOne', 'confirm', 'exists', 'create', 'prototype.patchAttributes',
        'upsert', 'updateAll', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere', 'destroyById'];

    remoteMethodNames.forEach(function (value) {
        Productwithtccp.disableRemoteMethodByName(value);
    });


    // Productwithtccp.getCountAtFilter = function (cate, cb) {
    //
    //     let ds = Productwithtccp.app.datasources.b2b;
    //     let sql = `SELECT count(*) cnt FROM product_with_tccp
    //     WHERE JSON_CONTAINS(categories, '{"cate_id":"${cate}"}')`;
    //
    //     ds.connector.execute(sql, [], function (err, res) {
    //
    //
    //         if (err) {
    //             cb(err, null);
    //         } else {
    //
    //
    //             cb(null, res);
    //         }
    //
    //     });
    //
    // };
    //
    // Productwithtccp.remoteMethod(
    //     'getCountAtFilter', {
    //         http: {
    //             path: '/getCountAtFilter',
    //             verb: 'post'
    //         },
    //         accepts: [{arg: 'category_id', type: 'string'}],
    //         returns: {
    //             root: true,
    //             type: 'object'
    //         }
    //     }
    // );

    //
    // Productwithtccp.getDataByFilter = function (prd, cate, order, cb) {
    //
    //     let ds = Productwithtccp.app.datasources.b2b;
    //     let sql = `SELECT * FROM product_with_tccp
    //     WHERE JSON_CONTAINS(categories, '{"cate_id":"${cate}"}')`;
    //
    //     let ord = `order by ${order}`;
    //
    //     if (prd) {
    //         sql += `and product_name like "%${prd}%" ${ord}`;
    //     }
    //     else {
    //         sql += `${ord}`;
    //     }
    //
    //
    //     ds.connector.execute(sql, [], function (err, res) {
    //
    //         let result = res;
    //
    //         for (let i in result){
    //
    //             result[i].photo = JSON.parse(result[i].photo);
    //
    //         }
    //
    //
    //         if (err) {
    //             cb(err, null);
    //         } else {
    //             cb(null, result);
    //         }
    //
    //     });
    //
    // };
    //
    // Productwithtccp.remoteMethod(
    //     'getDataByFilter', {
    //         http: {
    //             path: '/getDataByFilter',
    //             verb: 'post'
    //         },
    //         accepts: [{arg: 'prd_name', type: 'string'}, {arg: 'category_id', type: 'string'}, {
    //             arg: 'order',
    //             type: 'string'
    //         }],
    //         returns: {
    //             root: true,
    //             type: ['object']
    //         }
    //     }
    // );


};
