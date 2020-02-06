'use strict';

module.exports = function(Usrhiskinraw) {

    const remoteMethodNames = ['findById', 'findOne', 'confirm', 'count', 'exists',
        'create', 'upsert', 'updateAll', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrhiskinraw.disableRemoteMethodByName(value);
    });


};
