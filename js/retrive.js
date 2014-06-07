
function Retriver(config) {
  this.path = config.path;
  this.generalConfig = config.general;
  this.methods = config.methods;
  this.picLink = config.picPath;
}

Retriver.prototype = {
  init: function() {},

  getPhotoSet: function(number, callback) {
    var method = this.methods.photoset;
    var path = this.path + $.param(this.generalConfig) + $.param(method);
    var picLink = this.picLink;
    this.callback = callback;
    $.getJSON(path, this.dataHandler.bind(this));
  },

  dataHandler: function(data) {
    var pics = [];
    if (!(data && data.photoset && data.photoset.photo)) {
      console.log('error');
      return;
    }
    data.photoset.photo.forEach(function(item) {
      var link = picLink.replace('{farm_id}', item.farm)
                        .replace('{id}', item.id)
                        .replace('{server}', item.server)
                        .replace('{secret}', item.secret);
      pics.push(link);
    }, this);
    this.callback(pics);
  }
};