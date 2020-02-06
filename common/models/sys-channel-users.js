'use strict';

module.exports = function(Syschannelusers) {

    // 'upsert','find','replaceOrCreate','create','prototype.updateAttributes','findById','exists','replaceById','deleteById','prototype.verify','changePassword','createChangeStream','confirm','count','findOne','login','logout','resetPassword','setPassword','update','upsertWithWhere','prototype.__get__accessTokens','prototype.__create__accessTokens','prototype.__delete__accessTokens','prototype.__findById__accessTokens','prototype.__updateById__accessTokens','prototype.__destroyById__accessTokens','prototype.__count__accessTokens'

    const remoteMethodNames = ['upsert','find','replaceOrCreate','prototype.updateAttributes','findById','exists','replaceById','deleteById','prototype.verify','createChangeStream','confirm','count','findOne','update','upsertWithWhere','prototype.__get__accessTokens','prototype.__create__accessTokens','prototype.__delete__accessTokens','prototype.__findById__accessTokens','prototype.__updateById__accessTokens','prototype.__destroyById__accessTokens','prototype.__count__accessTokens'];


    remoteMethodNames.forEach(function (value) {
        Syschannelusers.disableRemoteMethodByName(value);
    });


};
