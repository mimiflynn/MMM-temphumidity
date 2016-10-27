// var initChart = require('../nodejs/utils/graph');

const magicMirrorModule = {
  defaults: {
    text: 'Temperature and Humidity'
  },
  getDom: function() {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = this.config.text;
    return wrapper;
  }
};

Module.register('temphumidity', magicMirrorModule);
