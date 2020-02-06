'use strict';
const utility = require('../utility.js');

module.exports = function (Usrchannelproducttaglist) {

    const remoteMethodNames = ['exists', 'prototype.updateAttributes', 'findOne', 'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById', 'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelproducttaglist.disableRemoteMethodByName(value);
    });

    Usrchannelproducttaglist.observe('before save', (ctx, next) => {

        // If not acting on an instance or property already set, continue.
        if (!ctx.instance || ctx.instance.id) {
            return next();
        }

        ctx.instance.id = utility.getID_random(utility.name_list.Tag)[0];

        if (ctx.instance["tagName"].indexOf('test') !== -1) {

            ctx.instance.id ='test';
        }

        // console.log(ctx.instance);

        next();

    });

    Usrchannelproducttaglist.observe('after delete', function (ctx, next) {


        console.log('Deleted %s matching %j',
            ctx.Model.pluralModelName,
            ctx.where);
        next();

    });



    // Usrchannelproducttaglist.observe("before delete", function(ctx, next) {
    //     // if (!ctx.instance)
    //     //     return next(new Error("Bulk delete is not supported."));
    //
    //     console.log(ctx.instance);
    //
    //     next();
    // });

};
