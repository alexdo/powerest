var _ = require('underscore');
var assign = require('object-assign');
var $ = window.jQuery;

var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var EventEmitter = require('events').EventEmitter;
var ServerZoneConstants = require('../constants/ServerZoneConstants');
var ApiClient = require('../../core/api');
var Config = require('../../config');

var CHANGE_EVENT = 'change';

var _items = {}; // collection of config items
var _initialized = false;

/**
 * Create a config item.
 *
 * @param {string} name  the name of the config item
 * @param {string} api_response The content of our config item
 */
function create(name, api_response) {
    _items[name] = api_response;
}

/**
 * Delete a config item
 * @param {string} name
 */
function destroy(name) {
    delete _items[name];
}

var ServerZoneStore = assign({}, EventEmitter.prototype, {
    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        if (!this._initialized) {
            this.loadFromApi();
            this._initialized = true;
        }

        return _items;
    },

    loadFromApi: function() {
        var that = this;
        ApiClient.get('zones', function(response) {
            var payload = response.entity;

            _.each(payload, function(item) {
                create(item.id, item);
            });

            that.emitChange();
        });
    },

    notifyZone: function (zoneId) {
        var that = this;

        ApiClient.put('zones/' + zoneId + '/notify', null, function(response) {
            $('.wrapper').addClass('loading');
            window.setTimeout(function() {
                that.loadFromApi();
            }, 1000);
        });
    },


    create: function (domainName) {
        var that = this;

        var payload = {
            kind: 'master',
            name: domainName,
            account: !!Config.user_name ? Config.user_name : null,
            nameservers: []
        };

        ApiClient.post('zones', payload, function(response) {
            console.log(response);
            $('.wrapper').addClass('loading');
            window.setTimeout(function() {
                that.loadFromApi();
            }, 1000);
        });
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: PowerestDispatcher.register(function(action) {
        switch(action.actionType) {
            case ServerZoneConstants.ZONE_CREATE:
                ServerZoneStore.create(action.domainName);
                ServerZoneStore.emitChange();
                break;

            case ServerZoneConstants.ZONE_EDIT:
                // TODO edit zone
                ServerZoneStore.emitChange();
                break;

            case ServerZoneConstants.CONFIG_DESTROY:
                // TODO delete zone
                ServerZoneStore.emitChange();
                break;

            case ServerZoneConstants.ZONE_NOTIFY:
                ServerZoneStore.notifyZone(action.zoneId);
                ServerZoneStore.emitChange();
                break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ServerZoneStore;
