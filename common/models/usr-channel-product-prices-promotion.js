'use strict';

const utility = require('../utility.js');

module.exports = function (Usrchannelproductpricespromotion) {

    const remoteMethodNames = ['exists', 'prototype.updateAttributes', 'findOne',
        'patchOrCreate', 'confirm', 'createChangeStream',
        'prototype.patchAttributes', 'upsertWithWhere', 'replaceOrCreate'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelproductpricespromotion.disableRemoteMethodByName(value);
    });

    Usrchannelproductpricespromotion.observe('before save', (ctx, next) => {

        // If not acting on an instance or property already set, continue.
        if (!ctx.instance || ctx.instance.id) {
            return next();
        }

        ctx.instance.id = utility.getID_random(utility.name_list.PricesPromotion)[0];

        // console.log(ctx.instance);

        next();

    });

};
