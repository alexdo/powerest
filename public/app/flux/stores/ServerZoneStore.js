var _ = require('underscore');
var assign = require('object-assign');

var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var EventEmitter = require('events').EventEmitter;
var ServerZoneConstants = require('../constants/ServerZoneConstants');
var ApiClient = require('../../core/api');

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

    dispatcherIndex: PowerestDispatcher.register(function(payload) {
        var action = payload.action;

        switch(action.actionType) {
            case ServerZoneConstants.ZONE_CREATE:
                // TODO create zone
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
                // TODO notify zone
                ServerZoneStore.emitChange();
                break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ServerZoneStore;
