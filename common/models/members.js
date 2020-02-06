'use strict';

module.exports = function (Usrchannelmembersprofile) {

    // const remoteMethodNames = ['exists', 'deleteById', 'updateAll', 'findOne',
    //     'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById',
    //     'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    const remoteMethodNames = ['findOne', 'confirm', 'exists', 'create', 'prototype.patchAttributes',
        'upsert', 'updateAll', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere', 'destroyById'];


    remoteMethodNames.forEach(function (value) {
        Usrchannelmembersprofile.disableRemoteMethodByName(value);
    });

};
