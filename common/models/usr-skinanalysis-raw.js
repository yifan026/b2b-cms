'use strict';

module.exports = function (Usrskinanalysisraw) {


    const remoteMethodNames = ['findById', 'findOne', 'confirm', 'count', 'exists', 'deleteById',
        'create', 'upsert', 'updateAll', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrskinanalysisraw.disableRemoteMethodByName(value);
    });

};
