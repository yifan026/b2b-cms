'use strict';
const utility = require('../utility.js');

module.exports = function (Usrchannelproductcategorylist) {

    const remoteMethodNames = ['findById', 'findOne', 'confirm', 'count', 'exists', 'upsert', 'patchOrCreate',
        'prototype.updateAttributes', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere'];

    // const remoteMethodNames = ['exists', 'prototype.updateAttributes', 'findOne', 'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById', 'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelproductcategorylist.disableRemoteMethodByName(value);
    });


    Usrchannelproductcategorylist.observe('before save', (ctx, next) => {

        // If not acting on an instance or property already set, continue.
        if (!ctx.instance || ctx.instance.id) {
            return next();
        }

        ctx.instance.id = utility.getID_random(utility.name_list.Category)[0];

        ctx.instance.categoryName = ctx.instance.id;

        if (ctx.instance["categoryDisplayname"].indexOf('test') !== -1) {

            ctx.instance.id ='test';
        }

        // console.log(ctx.instance);

        next();

    });

    //TODO 加入channelID

    Usrchannelproductcategorylist.observe('after save', (ctx, next) => {

        let ds = Usrchannelproductcategorylist.app.datasources.b2b;

        let sql = `UPDATE usr_channel_product_category_list as a,(SELECT (@n:=@n+1) AS num_order,c.*
                    FROM (SELECT @n:=0 AS n) AS _init
                    CROSS JOIN usr_channel_product_category_list AS c
                    ORDER BY c.order_index asc) as b SET a.order_index = b.num_order where a.order_index =b.order_index;`;

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                return err;
            } else {
                return res;
            }

        });

        next();

    });

    //TODO 是否加入channelID

    Usrchannelproductcategorylist.observe('after delete', (ctx, next) => {

        let ds = Usrchannelproductcategorylist.app.datasources.b2b;

        let sql = `UPDATE usr_channel_product_category_list as a,(SELECT (@n:=@n+1) AS num_order,c.*
                    FROM (SELECT @n:=0 AS n) AS _init
                    CROSS JOIN usr_channel_product_category_list AS c
                    ORDER BY c.order_index asc) as b SET a.order_index = b.num_order where a.order_index =b.order_index;`;

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                return err;
            } else {
                return res;
            }

        });

        next();
    });


    Usrchannelproductcategorylist.getAllCates = function (channelID, cb) {

        let ds = Usrchannelproductcategorylist.app.datasources.b2b;

        let sql = `select a.id,a.syschannelprofiles_id,a.order_index,a.name,IFNULL(b.prd_count, 0) prd_cnt from 
                    (select id,order_index,category_displayname name,syschannelprofiles_id from usr_channel_product_category_list where category_name!='category_11') a
                    left join
                    (select ucpcl.id,ucpcl.order_index,count(*) prd_count 
                    from usr_channel_product_category ucpc , usr_channel_product_category_list ucpcl 
                    where ucpc.category_id=ucpcl.id and syschannelprofiles_id = '${channelID}'
                    group by ucpcl.category_displayname,ucpcl.category_name 
                    order by ucpcl.order_index) b
                    on a.id=b.id
                    order by order_index asc`;

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                cb(err, null);
            } else {
                cb(null, res);
            }

        });

    };

    Usrchannelproductcategorylist.remoteMethod(
        'getAllCates', {
            http: {
                path: '/getAllCates',
                verb: 'get'
            },
            accepts: [
                {arg: 'channelID', type: 'string'}
            ],
            returns: {
                root: true,
                type: 'object'
            }
        }
    );


    Usrchannelproductcategorylist.swapCateOrder = function (channelID, c1, c2, cb) {

        let ds = Usrchannelproductcategorylist.app.datasources.b2b;

        let sql = `update usr_channel_product_category_list a
            inner join usr_channel_product_category_list b on a.id <> b.id
            set a.order_index = b.order_index 
            where a.id in ('${c1}','${c2}') and b.id in ('${c1}','${c2}') and a.syschannelprofiles_id = '${channelID}' and b.syschannelprofiles_id = '${channelID}'`;

        // console.log(sql)

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                cb(err, null);
            } else {
                cb(null, res);
            }
        });

    };

    Usrchannelproductcategorylist.remoteMethod(
        'swapCateOrder', {
            http: {
                path: '/swapCateOrder',
                verb: 'post'
            },
            accepts: [
                {arg: 'channelID', type: 'string'},
                {arg: 'item1', type: 'string'},
                {arg: 'item2', type: 'string'}
            ],
            returns: {
                root: true,
                type: 'object'
            }
        }
    );


};
