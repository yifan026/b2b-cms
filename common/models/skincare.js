'use strict';

module.exports = function (Skincare) {

    // const remoteMethodNames = ['findById', , 'confirm', 'count', , 'create', 'upsert',
    //   'deleteById' 'prototype.updateAttributes', 'createChangeStream', , , 'upsertWithWhere'];

    const remoteMethodNames = ['create', 'exists', 'deleteById', 'updateAll', 'findOne',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById',
        'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Skincare.disableRemoteMethodByName(value);
    });


};
