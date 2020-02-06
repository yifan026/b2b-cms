'use strict';

module.exports = function (Usrhiskin) {

    const remoteMethodNames = ['create', 'exists', 'prototype.updateAttributes', 'findOne', 'deleteById',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById', 'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    const remoteMethods = ['findById', 'create', 'delete', 'get', 'destroyById', 'updateById', 'count'];

    remoteMethods.forEach(function (value) {
        Usrhiskin.disableRemoteMethod('__' + value + '__factors', false);
    });

    remoteMethodNames.forEach(function (value) {
        Usrhiskin.disableRemoteMethodByName(value);
    });


    // Usrhiskin.getImg = function (msg, cb) {
    //
    //     let img = msg.replace(/\//g, '%2F').split('%2F');
    //
    //     let container = img[0];
    //
    //     let imgPath = img.join('%2F').replace(container + '%2F', '');
    //
    //     let anaImg = `/api/containers/${container}/download/${imgPath}`;
    //
    //
    //     cb(null, anaImg);
    // };
    //
    // Usrhiskin.remoteMethod(
    //     'getImg', {
    //         http: {
    //             path: '/getImg',
    //             verb: 'post',
    //             description: 's3_path'
    //         },
    //         accepts: [{arg: 'img_path', type: 'string'}],
    //         returns: {
    //             arg: 'image',
    //             type: 'string',
    //             default: '/api/containers/hiskin/download/e9%2F51%2Fddce1a6a2f53a494d1ae052c1f87640fa80d62e323f1b86aeb7887c31ee3f29c%2F'
    //         }
    //     }
    // );


    // Usrhiskin.getData = function (cb) {
    //
    //     let ds = Usrhiskin.app.datasources.b2b;
    //
    //     let sql = "select uhs.id,json_value,s3_path,uhs.insert_time,ucm.syschannelmembers_id memberNo,ucm.syschannelprofiles_id from usr_hiskin uhs left join usr_channel_members_profile ucm on uhs.syschannelmembers_id=ucm.id";
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
    //
    // Usrhiskin.remoteMethod(
    //     'getData', {
    //         http: {
    //             path: '/getData',
    //             verb: 'get'
    //         },
    //         returns: {
    //             root: true,
    //             type: 'object'
    //         }
    //     }
    // );


};
