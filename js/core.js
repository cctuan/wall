

var RETRIVE_CONFIG = {
  //url: 'https://api.flickr.com/services/rest/?method={method}&' +
  //     'api_key={api_key}&photoset_id={photoset_id}&privacy_filter=1&' +
  //     'format=json&nojsoncallback=1',
  FLICKR: {
    path: 'https://api.flickr.com/services/rest/?',
    picPath: 'http://farm{farm_id}.static.flickr.com/{server}/{id}_' +
      '{secret}_m.jpg',
    general: {
      api_key: 'dc326a216ea3cde16d5956a1c79cd8ff'
    },
    methods: {
      photoset: {
        method: 'flickr.photosets.getPhotos',
        photoset_id: '72157644997396196'
      }
    }
  }
};

function LoveWall(container) {
  this.getNum = 100;
  this.galleryOperator = new Retriver(RETRIVE_CONFIG.FLICKR);
  this.container = (typeof container === 'string' ?
    document.querySelector(container) :
    container);
}

LoveWall.prototype.start = function() {
  this.galleryOperator.getPhotoSet(this.getNum, this.render.bind(this));
  this.container.addEventListener('click', this.onImageClick.bind(this));
};

LoveWall.prototype.render = function(files) {
  var html = document.createDocumentFragment();
  for (var i = 0; i < files.length; i++) {
    html.appendChild(this.genTemplate(files[i]));
  }
  this.container.appendChild(html);
  this.pluginOn();
};

LoveWall.prototype.genTemplate = function(file) {
  var temp = document.createElement('div');
  temp.className = 'brick';
  temp.style.width = (1 + 3 * Math.random() << 0) + 'px';
  temp.style.backgroundImage = 'url(' + file + ')';// require a parser to parse file to small size;
  temp.dataset.imageSrc = file;
  return temp;
};

LoveWall.prototype.pluginOn = function() {
  var wall = new freewall("#lovewall");
  wall.reset({
    selector: '.brick',
    animate: true,
    cellW: 150,
    cellH: 'auto',
    onResize: function() {
      wall.fitWidth();
    }
  });

  var images = wall.container.find('.brick');
  images.find('img').load(function() {
    wall.fitWidth();
  });
};

LoveWall.prototype.onImageClick = function(evt) {
  var image = evt.detail;
};

var lovewall = new LoveWall('#lovewall');
lovewall.start();
