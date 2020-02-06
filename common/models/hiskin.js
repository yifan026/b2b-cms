'use strict';

module.exports = function (Hiskin) {

    const remoteMethodNames = ['create', 'exists', 'deleteById', 'updateAll', 'findOne',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById',
        'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];


    const remoteMethods = ['create', 'delete', 'destroyById', 'updateById'];

    remoteMethods.forEach(function (value) {
        Hiskin.disableRemoteMethod('__' + value + '__hifactors', false);
    });

    remoteMethodNames.forEach(function (value) {
        Hiskin.disableRemoteMethodByName(value);
    });

};
