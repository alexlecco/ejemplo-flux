import Reflux from 'reflux';
import $ from 'jquery';
import ImageActions from '../Actions/ImageActions';

let ImageStore = Reflux.createStore({
  url: 'https://api.flickr.com/services/feeds/photos_public.gne?format=json',
  listenables: [ImageActions],
  imagelist: [],
  init: function() {
    this.fetchList();
  },
  fetchList: function() {
    let tags = ['animals', 'nature', 'food', 'travel', 'cars', 'sport'];
    let randomTag = tags[Math.floor(Math.random()*tags.length)];
    $.ajax({
      url: this.url + `&tag=${randomTag}`,
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrFeed',
      cache: false,
      context: this,
      success: function(data) {
        console.log('fetch ok');
        this.imagelist = data.items;
        this.trigger(this.imagelist);
      }
    });
  }
});

export default ImageStore;
