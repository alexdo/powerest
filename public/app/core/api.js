var Config = require('../config.js');

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var defaultRequest = require('rest/interceptor/defaultRequest');
var errorCode = require('rest/interceptor/errorCode');
var retry = require('rest/interceptor/retry');
var timeout = require('rest/interceptor/timeout');

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


    get(url, callback, timeoutCallback) {
        var client = this.client;
        client = client.wrap(retry, { initial: 1e3, max: 10e3 }).wrap(timeout, { timeout: 60e3 });

        this.performRequest(client, 'GET', url, null, callback, timeoutCallback);
    }

    post(url, payload, callback, errorCallback) {
        var client = this.client;
        client = client.wrap(errorCode, { code: 400 });

        this.performRequest(client, 'POST', url, payload, callback, errorCallback);
    }

    put(url, payload, callback, errorCallback) {
        var client = this.client;
        client = client.wrap(errorCode, { code: 400 });

        this.performRequest(client, 'PUT', url, payload, callback, errorCallback);
    }

    patch(url, payload, callback, errorCallback) {
        var client = this.client;
        client = client.wrap(errorCode, { code: 400 });

        this.performRequest(client, 'PATCH', url, payload, callback, errorCallback);
    }

    del(url, callback, errorCallback) {
        var client = this.client;
        client = client.wrap(errorCode, { code: 400 });

        this.performRequest(client, 'DELETE', url, null, callback, errorCallback);
    }

    performRequest(client, method, url, payload = null, callback = null, failCallback = null) {
        var clientOptions = { method: method, path: this.buildUrl(url) };

        if(!!payload) {
            clientOptions.entity = JSON.stringify(payload);
        }

        client(clientOptions)
            .then(
                function(response) {
                    if(typeof callback === 'function') {
                        callback(response);
                    } else {
                        console.log(response)
                    }
                },
                function(failResponse) {
                    if(typeof failCallback === 'function') {
                        failCallback(failResponse);
                    } else {
                        console.log(failCallback)
                    }
                }
            );
    }
}

module.exports = new PdnsApiClient();
