'use strict';

module.exports = function(Syschannelprofiles) {

    const remoteMethodNames = ['exists', 'deleteById', 'updateAll', 'findOne',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById',
        'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Syschannelprofiles.disableRemoteMethodByName(value);
    });

};
