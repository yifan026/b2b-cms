'use strict';

const utility = require('../utility.js');

module.exports = function (Usrchannelproducts) {


    // const remoteMethodNames = ['findById', 'findOne', 'confirm', 'count', 'exists', 'create', 'upsert',
    //   'deleteById', 'updateAll', 'prototype.updateAttributes', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere'];

    const remoteMethodNames = ['exists', 'prototype.updateAttributes', 'findOne', 'patchOrCreate', 'confirm', 'replaceById', 'createChangeStream', 'replaceById', 'replaceOrCreate', 'upsertWithWhere'];

    remoteMethodNames.forEach(function (value) {
        Usrchannelproducts.disableRemoteMethodByName(value);
    });


    Usrchannelproducts.getImg = function (msg, cb) {

        //SYSChannelProfiles001/products/Product1543981914344700/10362272-1604444631426562_.jpg

        //SYSChannelProfiles001/ProductPhoto1543981914344700_10362272-1604444631426562_.jpg

        let img = msg.replace(/\//g, '%2F').split('%2F');

        // let imgPath = img.join('%2F').replace(container + '%2F', '');

        let imgPath = img.join('%2F');


        let anaImg = `${utility.restRoot}/containers/${utility.container.prd}/download/${imgPath}`;


        cb(null, anaImg);
    };

    Usrchannelproducts.remoteMethod(
        'getImg', {
            http: {
                path: '/getImg',
                verb: 'post',
                description: 'product photo of blob_path'
            },
            accepts: [{arg: 'img_path', type: 'string'}],
            returns: {
                arg: 'image',
                type: 'string',
                default: `${utility.restRoot}/containers/${utility.container.prd}/download/SYSChannelProfiles001%2FProductPhoto1543981914344700_10362272-1604444631426562_.jpg`
            }
        }
    );


    Usrchannelproducts.createPrd = function (data, cb) {

        let post_data = JSON.parse(JSON.stringify(data));

        let save_data = {};

        let itemsProcessed = 1;

        post_data.ProductDetail["id"] = utility.getID_random('Product')[0];

        // console.log(post_data.ProductDetail["productName"].indexOf('test') !== -1);

        if (post_data.ProductDetail["productName"].indexOf('test') !== -1) {

            post_data.ProductDetail["id"] = 'test';
        }

        // console.log(post_data);

        Usrchannelproducts.create(
            post_data.ProductDetail
            , function (err, prd) {

                if (err) return cb(err);

                save_data['ProductDetail'] = prd;

                for (let u in post_data) {

                    if (u.indexOf('Detail') < 1) {

                        // post_data[u][0]['productId'] = prd.id;

                        post_data[u].forEach(function (element) {

                            element['productId'] = prd.id;

                        });

                        let pdata = post_data[u];

                        // console.log(pdata);

                        let tccp_model = eval(`Usrchannelproducts.app.models.${u}`);

                        tccp_model.create(
                            pdata, function (err, res) {

                                if (err) return cb(err);

                                let b = JSON.parse(JSON.stringify(res));

                                if (res.indexOf("error") > 0) {

                                    return cb(b.error)
                                }
                                else {
                                    save_data[u] = b;

                                    // console.log(save_data);

                                    itemsProcessed++;

                                    // console.log(Object.keys(post_data).length, itemsProcessed);

                                    if (itemsProcessed === Object.keys(post_data).length) return cb(null, save_data);

                                }

                            });

                    } else {

                        if (itemsProcessed === Object.keys(post_data).length) return cb(null, save_data);

                    }
                }


            });


    };

    Usrchannelproducts.remoteMethod(
        'createPrd', {
            http: {
                path: '/createPrd',
                verb: 'post'
            },
            accepts: [{arg: 'data', type: 'object', http: {source: 'body'}}],
            returns: {
                root: true,
                type: 'object'
            }
        }
    );


    Usrchannelproducts.updatePrd = function (data, pid, cb) {

        let post_data = JSON.parse(JSON.stringify(data));

        let save_data = {};

        let itemsListProcessed = 1;

        // console.log(pid, post_data.ProductDetail);

        Usrchannelproducts.updateAll(
            {"id": pid}, post_data.ProductDetail, function (err, res) {

                // console.log(err, res);

                if (err) return cb(err);

                save_data['ProductDetail'] = post_data.ProductDetail;

                // console.log(save_data);

                for (let u in post_data) {

                    if (u.indexOf('Detail') < 1) {

                        let tccp_model = eval(`Usrchannelproducts.app.models.${u}`);

                        tccp_model.destroyAll(
                            {"productId": pid}, function (err, res) {

                                if (err) return cb(err);

                                // console.log(res);

                                post_data[u].forEach(function (element) {

                                    element['productId'] = pid;

                                });


                                let pdata = post_data[u];

                                // console.log(pdata);

                                tccp_model.create(
                                    pdata, function (err, res) {

                                        if (err) return cb(err);

                                        let b = JSON.parse(JSON.stringify(res));

                                        if (res.indexOf("error") > 0) {

                                            return cb(b.error)
                                        }
                                        else {
                                            save_data[u] = b;

                                            // console.log(save_data);

                                            itemsListProcessed++;

                                            // console.log(Object.keys(post_data).length, itemsProcessed);

                                            if (itemsListProcessed === Object.keys(post_data).length) return cb(null, save_data);

                                        }

                                    });


                            }
                        );
                    }
                    else {

                        // console.log(save_data);

                        if (itemsListProcessed === Object.keys(post_data).length) return cb(null, save_data);

                    }

                }
            }
        );

    };

    Usrchannelproducts.remoteMethod(
        'updatePrd', {
            http: {
                path: '/updatePrd',
                verb: 'post'
            },
            accepts: [{arg: 'data', type: 'object', http: {source: 'body'}},
                {arg: 'pid', type: 'string', http: {source: 'query'}}
            ],
            returns: {
                root: true,
                type: 'object'
            }
        }
    );

    Usrchannelproducts.testReplacePrd = function (data, pid, cb) {

        // let post_data = JSON.parse(JSON.stringify(data));

        // let save_data = {};

        console.log(pid, data);

        let itemsProcessed = 1;

        console.log(post_data);

        post_data.ProductDetail["id"] = pid;

        Usrchannelproducts.updateAll(
            {"id": pid}, post_data.ProductDetail
            , function (err, prd) {

                save_data['ProductDetail'] = prd;

                // console.log(pid,prd);

                for (let u in post_data) {

                    // console.log(u, u.indexOf('Detail') < 1);

                    if (u.indexOf('Detail') < 1) {


                        post_data[u].forEach(function (element) {

                            element['productId'] = pid;

                        });

                        let pdata = post_data[u];

                        // console.log(pdata);


                        let tccp_model = eval(`Usrchannelproducts.app.models.${u}`);


                        tccp_model.updateAll(
                            {"id": pid}, pdata, function (err, res) {

                                if (err) return cb(err);


                                let b = JSON.parse(JSON.stringify(res));

                                // console.log(b);

                                if (res.indexOf("error") > 0) {

                                    return cb(b.error)

                                }
                                else {

                                    save_data[u] = b;

                                    // console.log(Object.keys(save_data).length);

                                    itemsProcessed++;

                                    // console.log(Object.keys(post_data).length, itemsProcessed);

                                    if (itemsProcessed === Object.keys(post_data).length) return cb(null, save_data);

                                }


                            });


                    }
                    else {

                        if (itemsProcessed === Object.keys(post_data).length) return cb(null, save_data);

                    }


                }


            });


    };

    Usrchannelproducts.remoteMethod(
        'testReplacePrd', {
            http: {
                path: '/testReplacePrd',
                verb: 'post'
            },
            accepts: [{arg: 'data', type: 'object', http: {source: 'body'}},
                {arg: 'pid', type: 'string', http: {source: 'query'}}
            ],
            returns: {
                root: true,
                type: 'object'
            }
        }
    );


    Usrchannelproducts.test = function (data, cb) {

        // console.log(Usrchannelproducts.app.registry.getModelByType('AccessToken'));

        let post_data = JSON.parse(JSON.stringify(data));

        let save_data = {};

        let itemsProcessed = 0;

        for (let u in utility.name_list) {

            // console.log(url + name_list[u]);

            post_data[u].forEach(function (element) {

                if (Object.keys(element)[0].toLowerCase().indexOf('displayname') > 0) {

                    // let list_p_data = {};

                    // console.log(element[Object.keys(element)[0]]);

                    // if (u === 'ProductTag') {
                    //
                    //     list_p_data = {
                    //         "id": getID_random('ProductTag'),
                    //         "tagName": element[Object.keys(element)[0]],
                    //         "tagDisplayname": element[Object.keys(element)[0]],
                    //         "syschannelprofilesId": "SYSChannelProfiles001"
                    //     };
                    //
                    // } else if (u === 'ProductCategory') {
                    //     list_p_data = ""
                    // }


                    // console.log(list_p_data);

                    // let list_model = eval(`Usrchannelproducts.app.models.${u}List`);
                    //
                    // list_model.create(
                    //     list_p_data, function (err, res) {
                    //
                    //
                    //         if (err) return cb(err);
                    //
                    //         let b = JSON.parse(JSON.stringify(res));
                    //
                    //         if (res.indexOf("error") > 0) {
                    //
                    //             return cb(b.error)
                    //
                    //         }
                    //         else {
                    //
                    //             // console.log(b);
                    //
                    //             // cb(null, b);
                    //             // list_save_data = b;
                    //         }
                    //
                    //
                    //     });


                } else {

                    element['productId'] = 'Product1546508664121488';

                }


            });

            let pdata = post_data[u];

            console.log(pdata);


            let tccp_model = eval(`Usrchannelproducts.app.models.${u}`);


            tccp_model.create(
                pdata, function (err, res) {

                    if (err) return cb(err);


                    let b = JSON.parse(JSON.stringify(res));

                    console.log(b);

                    if (res.indexOf("error") > 0) {

                        return cb(b.error)

                    }
                    else {

                        save_data[u] = b;

                        // console.log(save_data);

                        itemsProcessed++;

                        if (itemsProcessed === Object.keys(utility.name_list).length) return cb(null, save_data);

                    }


                });


        }


    };

    Usrchannelproducts.remoteMethod(
        'test', {
            http: {
                path: '/test',
                verb: 'post'
            },
            accepts: [{arg: 'data', type: 'object'}],
            returns: {
                root: true,
                type: 'object'
            }
        }
    );


};
