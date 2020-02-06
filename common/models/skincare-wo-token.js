'use strict';

const utility = require('../utility.js');

module.exports = function (Skincare) {

    // const remoteMethodNames = ['findById', , 'confirm', 'count', , 'create', 'upsert',
    //   'deleteById' 'prototype.updateAttributes', 'createChangeStream', , , 'upsertWithWhere'];

    const remoteMethodNames = ['find', 'count', 'create', 'exists', 'deleteById', 'updateAll', 'prototype.updateAttributes', 'findOne', 'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById', 'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Skincare.disableRemoteMethodByName(value);
    });

    Skincare.getImg = function (msg, cb) {

        // const url = `http://10.27.39.42:3020/api/Containers/${container}/download/${file}${part}?access_token=${accToken}`;
        //
        // request.get(url, {qs:{id: 123}}, function(err, httpResponse, body){
        //     //body请求结果
        // });
        // skincare/e9/51/ddce1a6a2f53a494d1ae052c1f87640fa80d62e323f1b86aeb7887c31ee3f29c/

        let img = msg.replace(/\//g, '%2F').split('%2F');

        let container = img[0];

        let imgPath = img.join('%2F').replace(container + '%2F', '');

        let anaImg = `${utility.restRoot}/containers/${container}/download/${imgPath}`;


        cb(null, anaImg);
    };

    Skincare.remoteMethod(
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
                default: `${utility.restRoot}/containers/${utility.container.skincare}/download/e9%2F51%2Fddce1a6a2f53a494d1ae052c1f87640fa80d62e323f1b86aeb7887c31ee3f29c%2F`
            }
        }
    );


};
