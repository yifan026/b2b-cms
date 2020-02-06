'use strict';

module.exports = function(Syschannelbrand) {

    const remoteMethodNames = ['exists', 'deleteById', 'updateAll', 'findOne',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById',
        'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Syschannelbrand.disableRemoteMethodByName(value);
    });

};
