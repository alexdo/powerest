var Config = require('../config.js');

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var defaultRequest = require('rest/interceptor/defaultRequest');

class PdnsApiClient {
    constructor() {
        this.config = Config;
        this.client = rest.wrap(mime)
                          .wrap(defaultRequest, { headers: { 'X-API-Key': Config.api_key } });

        this.urlBase  = Config.use_ssl ? 'https' : 'http';
        this.urlBase += '://' + Config.api_host + ':' + Config.api_port;

        this.urlServer = '/servers/' + Config.server;
    }

    buildUrl(...fragmentsOrUrl) {
        return this.urlBase + this.urlServer + '/' + fragmentsOrUrl.join('/');
    }


    get(url, callback) {
        this.performRequest('GET', url, callback);
    }

    post(url, callback) {
        this.performRequest('POST', url, callback);
    }

    put(url, callback) {
        this.performRequest('PUT', url, callback);
    }

    del(url, callback) {
        this.performRequest('DELETE', url, callback);
    }

    performRequest(method, url, callback) {
        this.client({ method: method, path: this.buildUrl(url) })
            .then(function(response) {
                if(typeof callback === 'function') {
                    callback(response);
                } else {
                    console.log(response)
                }
            });
    }
}

module.exports = new PdnsApiClient();
