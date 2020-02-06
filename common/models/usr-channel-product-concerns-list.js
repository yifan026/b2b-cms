'use strict';

module.exports = function (Usrchannelproductconcernslist) {
    const remoteMethodNames = ['exists', 'prototype.updateAttributes', 'findOne', 'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById', 'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelproductconcernslist.disableRemoteMethodByName(value);
    });

    //
    // Usrchannelproductconcernslist.observe('before save', (ctx, next) => {
    //
    //     // If not acting on an instance or property already set, continue.
    //     if (!ctx.instance || ctx.instance.id) {
    //         return next();
    //     }
    //
    //     ctx.instance.id = utility.getID_random(utility.name_list.Concern)[0];
    //
    //     ctx.instance.categoryName = ctx.instance.id;
    //
    //     // console.log(ctx.instance);
    //
    //     next();
    //
    // });


};
