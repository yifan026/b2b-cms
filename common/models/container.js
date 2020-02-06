/**
 * Created by YFC on 2018/8/29 下午 3:59
 */
module.exports = function (Container) {



  Container.disableRemoteMethodByName('getContainer');
  // Container.disableRemoteMethodByName('getContainers');
  // Container.disableRemoteMethodByName('download');
  // Container.disableRemoteMethodByName('removeFile');
  // Container.disableRemoteMethodByName('getFiles');
  // Container.disableRemoteMethodByName('getFile');
  // Container.disableRemoteMethodByName('upload');


  Container.disableRemoteMethodByName('createContainer');
  Container.disableRemoteMethodByName('destroyContainer');

};
