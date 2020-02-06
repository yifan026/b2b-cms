/**
 * Created by YFC on 2018/9/3 上午 11:36
 */

const path = require('path');
const utility = require('../../common/utility.js');


module.exports = function (app) {
    app.dataSources.storageAzure.connector.getFilename = function (uploadingFile, req, res) {


        let fileName = uploadingFile.name;
        let fileObj = path.parse(fileName);
        let cont = uploadingFile.container;
        let profile_name = uploadingFile.field.split('_')[0];

        if (fileName.indexOf('test') !== -1) {

            return profile_name + '/' + 'test_' + fileObj.name + fileObj.ext;
        }


        switch (cont) {

            case utility.container.prd:

                // let prod_id = uploadingFile.field.split('_')[1];


                return profile_name + '/' + utility.getID_random(utility.name_list.prd_photo)[0] + '_' + fileObj.name + fileObj.ext;

                break;

            case utility.container.AD:

                return profile_name + '/' + utility.getID_random(utility.name_list.AD)[0] + '_' + fileObj.name + fileObj.ext;

                break;
            case utility.container.DS:

                // let _id = uploadingFile.field.split('_')[1];

                return profile_name + '/' + utility.getID_random(utility.name_list.DS)[0] + '_' + fileObj.name + fileObj.ext;

                break;
            default:


        }


        // console.log(profile_name,prod_id);

        // return 'goldenRatio/' + fileObj.name + '_' + Date.now() + fileObj.ext;


    };
};
