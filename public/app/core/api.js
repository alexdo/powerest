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
        this.performRequest('GET', url, null, callback);
    }

    post(url, payload, callback) {
        this.performRequest('POST', url, payload, callback);
    }

    put(url, payload, callback) {
        this.performRequest('PUT', url, payload, callback);
    }

    del(url, callback) {
        this.performRequest('DELETE', url, null, callback);
    }

    performRequest(method, url, payload = null, callback = null) {
        var clientOptions = { method: method, path: this.buildUrl(url) };

        if(!!payload) {
            clientOptions.entity = JSON.stringify(payload);
        }

        this.client(clientOptions)
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
