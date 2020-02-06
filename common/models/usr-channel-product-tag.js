'use strict';

module.exports = function(Usrchannelproducttag) {

    const remoteMethodNames = ['exists', 'prototype.updateAttributes', 'findOne',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelproducttag.disableRemoteMethodByName(value);
    });

};
