'use strict';

module.exports = function(Usrchannelprofilesettings) {

    const remoteMethodNames = ['exists', 'deleteById', 'updateAll', 'findOne',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById',
        'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelprofilesettings.disableRemoteMethodByName(value);
    });

};
