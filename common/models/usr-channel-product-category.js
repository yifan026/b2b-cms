'use strict';

module.exports = function(Usrchannelproductcategory) {

    // const remoteMethodNames = ['find','findById', 'findOne', 'confirm', 'exists', 'create', 'upsert',
    //     'deleteById', 'updateAll', 'prototype.updateAttributes', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere'];

    // const remoteMethodNames = ['findById', 'findOne', 'confirm', 'exists', 'count', 'upsert',
    //     'deleteById', 'updateAll', 'createChangeStream', 'replaceById', 'upsertWithWhere'];

    const remoteMethodNames = ['exists', 'prototype.updateAttributes', 'findOne', 'patchOrCreate',
         'confirm', 'createChangeStream', 'replaceById', 'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelproductcategory.disableRemoteMethodByName(value);
    });

};
