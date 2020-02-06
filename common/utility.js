/**
 * Created by YFC on 2019/1/8 下午 2:46
 */


const config = require('../server/config.json');
let jwt = require('jwt-simple');

exports.restRoot = config.restApiRoot;

exports.local_url = `http://${config.host}:${config.port}`;

exports.name_list = {
    PricesPromotion: "PricesPromotion",
    prd_photo: "ProductPhoto",
    Category: "ProductCategory",
    Concern: "ProductConcern",
    Tag: "ProductTag",
    AD: "Advertisement",
    DS: "Digitalsignages"

};

exports.env = {
    dev: "dev",
    qa: "beta",
    pr: "production"
};


exports.container = {
    prd: "product-photo",
    skincare: "skincare",
    AD: "advertisement",
    DS: "digital-signages"
};

exports.prd_status = {
    0: "未上架",
    1: "上架中",
    2: "期間"
};

exports.ds_signagesType = {
    0: "image",
    1: "video",
    2: "video_image"
};

exports.skintypes = {
    0: "NORMAL",
    1: "DRY",
    2: "OIL",
    3: "COMBINE"
};

exports.getID_random = function (name) {

    const dateTime = Date.now();

    let timestamp = Math.floor(dateTime / 1000);

    let pid = `${name}${timestamp}${Math.floor(Math.random() * 1000000)}`;

    return [pid, timestamp];
};


exports.jwtEncode = function (payload) {

    let secret = 'f994e2916af5243dacb95df2da823ad2';

    let token = jwt.encode(payload, secret, 'HS256');

    return token;
};