'use strict';

const utility = require('../utility.js');
module.exports = function (Usrchannelrecommendations) {

    const remoteMethodNames = ['findById', 'findOne', 'confirm', 'count', 'exists', 'upsert', 'patchOrCreate',
        'prototype.updateAttributes', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere'];

    // const remoteMethodNames = ['exists', 'prototype.updateAttributes', 'findOne', 'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById', 'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelrecommendations.disableRemoteMethodByName(value);
    });


    Usrchannelrecommendations.observe('before save', (ctx, next) => {

        // If not acting on an instance or property already set, continue.
        if (!ctx.instance || ctx.instance.id) {
            return next();
        }

        ctx.instance.id = utility.getID_random('ProductRecommend')[0];


        // console.log(ctx.instance);

        next();

    });


    // Usrchannelrecommendations.getData = function ( cb) {
    //
    //     let ds = Usrchannelrecommendations.app.datasources.b2b;
    //     let sql = ``;
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
    // Usrchannelrecommendations.remoteMethod(
    //     'getData', {
    //         http: {
    //             path: '/getData',
    //             verb: 'post'
    //         },
    //         returns: {
    //             root: true,
    //             type: 'object'
    //         }
    //     }
    // );


};
