'use strict';

module.exports = function (Usrhiskin) {

    const remoteMethodNames = ['find', 'count', 'create', 'exists', 'deleteById', 'updateAll', 'prototype.updateAttributes', 'findOne', 'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById', 'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    const remoteMethods = ['create', 'delete', 'destroyById', 'updateById'];

    remoteMethods.forEach(function (value) {
        Usrhiskin.disableRemoteMethod('__' + value + '__hifactors', false);
    });

    remoteMethodNames.forEach(function (value) {
        Usrhiskin.disableRemoteMethodByName(value);
    });


    Usrhiskin.getImg = function (msg, cb) {

        let img = msg.replace(/\//g, '%2F').split('%2F');

        let container = img[0];

        let imgPath = img.join('%2F').replace(container + '%2F', '');

        let anaImg = `/api/containers/${container}/download/${imgPath}`;


        cb(null, anaImg);
    };

    Usrhiskin.remoteMethod(
        'getImg', {
            http: {
                path: '/getImg',
                verb: 'post',
                description: 's3_path'
            },
            accepts: [{arg: 'img_path', type: 'string'}],
            returns: {
                arg: 'image',
                type: 'string',
                default: '/api/containers/hiskin/download/e9%2F51%2Fddce1a6a2f53a494d1ae052c1f87640fa80d62e323f1b86aeb7887c31ee3f29c%2F'
            }
        }
    );


};
