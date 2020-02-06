'use strict';
const utility = require('../utility.js');

module.exports = function (Usrchannelmembers) {

    // const remoteMethodNames = ['findById', 'findOne', 'confirm', 'count', 'exists', 'create', 'upsert',
    //   'deleteById', 'updateAll', 'prototype.updateAttributes', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere'];


    const remoteMethodNames = ['deleteById', 'exists', 'findOne',
        'patchOrCreate', 'confirm', 'createChangeStream', 'replaceById',
        'prototype.patchAttributes', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelmembers.disableRemoteMethodByName(value);
    });

    Usrchannelmembers.observe('before save', (ctx, next) => {

        // If not acting on an instance or property already set, continue.
        if (!ctx.instance || ctx.instance.id) {
            return next();
        }

        let pid_ts = utility.getID_random('Member');

        ctx.instance.id = pid_ts[0];

        if (ctx.instance["memberNo"].indexOf('test') !== -1) {

            ctx.instance.id ='test';
        }

        // let mid = ctx.instance.memberNo;
        let channelId = ctx.instance.syschannelprofilesId;

        // console.log(utility.skintypes[0]);
        //
        // let skintype_name = "";
        //
        // switch (ctx.instance.rawData.skintype) {
        //
        //     case 0:
        //
        //
        //         skintype_name = utility.skintypes[0];
        //         break;
        //
        //     case 1:
        //
        //         skintype_name = utility.skintypes[1];
        //         break;
        //     case 2:
        //
        //
        //         skintype_name = utility.skintypes[0];
        //         break;
        //     default:
        // }


        // ctx.instance.rawData.skintype = skintype_name;

        let payload = {
            channel_member_id: pid_ts[0],
            channel_id: channelId,
            device_id: "",
            environment: utility.env.dev,
            jwt_version: "1.0.0",
            exp: pid_ts[1] + 3600 * 10000
        };

        // console.log(ctx.instance);

        ctx.instance.token = utility.jwtEncode(payload);

        next();

    });


};
