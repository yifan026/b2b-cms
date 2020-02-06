'use strict';

const utility = require('../utility.js');

module.exports = function (Usrskinanalysis) {

    // const remoteMethodNames = ['findById', 'findOne', 'confirm', 'count', 'exists', 'create', 'upsert',
    //   'deleteById', 'updateAll', 'prototype.updateAttributes', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere'];

    const remoteMethodNames = ['create', 'exists', 'prototype.updateAttributes', 'findOne', 'deleteById',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById', 'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    const remoteMethods = ['findById', 'create', 'delete', 'get', 'destroyById', 'updateById', 'count'];

    remoteMethods.forEach(function (value) {
        Usrskinanalysis.disableRemoteMethod('__' + value + '__factors', false);
    });

    remoteMethodNames.forEach(function (value) {
        Usrskinanalysis.disableRemoteMethodByName(value);
    });


    Usrskinanalysis.getImg = function (msg, cb) {


        // skincare/e9/51/ddce1a6a2f53a494d1ae052c1f87640fa80d62e323f1b86aeb7887c31ee3f29c/

        let img = msg.replace(/\//g, '%2F').split('%2F');

        let container = img[0];

        let imgPath = img.join('%2F').replace(container + '%2F', '');

        let anaImg = `${utility.restRoot}/containers/${container}/download/${imgPath}`;


        cb(null, anaImg);
    };

    Usrskinanalysis.remoteMethod(
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


    // Usrskinanalysis.getAllMembers = function (cb) {
    //
    //     let ds = Usrskinanalysis.app.datasources.b2b;
    //     let sql = "SELECT id, syschannelmembers_id memberNo FROM usr_channel_members_profile"; // here you write your sql query.
    //
    //     ds.connector.execute(sql, [], function (err, regions) {
    //
    //         if (err) {
    //             cb(err, null);
    //         } else {
    //             cb(null, regions);
    //         }
    //
    //     });
    //
    // };
    //
    // Usrskinanalysis.remoteMethod(
    //     'getAllMembers', {
    //         http: {
    //             path: '/getAllMembers',
    //             verb: 'get'
    //         },
    //         returns: {
    //             root: true,
    //             type: 'object'
    //         }
    //     }
    // );


};
