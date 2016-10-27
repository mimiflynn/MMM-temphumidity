const getJSON = (url, cb) => {
  const req = new XMLHttpRequest();
  req.onload = () => {
    if (req.status === 404) {
      cb(new Error('not found'));
    } else {
      cb(null, JSON.parse(req.response));
    }
  };
  req.open('GET', url);
  req.send();
};

const magicMirrorModule = {
  defaults: {
    text: 'Temperature and Humidity'
  },
  getData: function () {
    console.log('getData in temphumidity');
    getJSON('http://black-monolith.com:2001/api/dht/latest', (error, response, body) => {
      console.log('response', response);
      initChart({
        dht: response,
        width: 500,
        height: 300
      });
    });
  },
  getDom: function () {
    var header = document.createElement('div');
    var title = document.createTextNode(this.config.text);
    var wrapper = document.createElement('div');
    var xmlns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS (xmlns, 'svg');
        svg.setAttributeNS (null, 'width', 500);
        svg.setAttributeNS (null, 'height', 300);
        svg.setAttributeNS (null, 'id', 'visualization');
        svg.style = {
          display: 'block',
          margin: 'auto'
        };
    title.className = 'bright medium light';
    header.appendChild(title);
    wrapper.appendChild(header);
    wrapper.appendChild(svg);

    return wrapper;
  },
  getScripts: function () {
    return [this.file('node_modules/d3/build/d3.min.js'), this.file('graph.js')]
  },
  start: function () {
    setTimeout(() => {
      this.getData();
    }, 2000);
    setInterval(() => {
      this.getData();
    }, 60005);
  }
};

Module.register('temphumidity', magicMirrorModule);
