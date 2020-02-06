'use strict';
const utility = require('../utility.js');

module.exports = function (Usradvertisements) {

    const remoteMethodNames = ['exists', 'findOne',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById',
        'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usradvertisements.disableRemoteMethodByName(value);
    });

    Usradvertisements.observe('before save', (ctx, next) => {

        // If not acting on an instance or property already set, continue.
        if (!ctx.instance || ctx.instance.id) {
            return next();
        }

        ctx.instance.id = utility.getID_random(utility.name_list.AD)[0];

        if (ctx.instance["title"].indexOf('test') !== -1) {

            ctx.instance.id ='test';
        }
        // console.log(ctx.instance);

        next();

    });


    Usradvertisements.getADdata = function (yearMonth, channelID, cb) {

        let ds = Usradvertisements.app.datasources.b2b;


        let year = yearMonth.split('-')[0];

        let month = yearMonth.split('-')[1];

        let curMonthDays = new Date(year, month, 0).getDate();

        // console.log(yearMonth, curMonthDays);

        let sql = `SELECT * FROM usr_advertisements 
        WHERE syschannelprofiles_id = '${channelID}' and ('${yearMonth}-01' BETWEEN start_date and end_date or '${yearMonth}-${curMonthDays}' BETWEEN start_date and end_date)`;

        // console.log(sql);

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                cb(err, null);
            } else {
                cb(null, res);
            }

        });

    };

    Usradvertisements.remoteMethod(
        'getADdata', {
            http: {
                path: '/getADdata',
                verb: 'post'
            },
            accepts: [{arg: 'year-month', type: 'string'}, {arg: 'channelID', type: 'string'}],
            returns: {
                root: true,
                type: 'object'
            }
        }
    );

    Usradvertisements.swapADorder = function (c1, c2, cb) {

        let ds = Usradvertisements.app.datasources.b2b;

        let sql = `update usr_advertisements a
            inner join usr_advertisements b on a.id <> b.id
            set a.page = b.page
            where a.id in ('${c1}','${c2}') and b.id in ('${c1}','${c2}')`;

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                cb(err, null);
            } else {
                cb(null, res);
            }
        });

    };

    Usradvertisements.remoteMethod(
        'swapADorder', {
            http: {
                path: '/swapADorder',
                verb: 'post'
            },
            accepts: [
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
