var assign = require('object-assign');

var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var EventEmitter = require('events').EventEmitter;
var ServerConfigConstants = require('../constants/ServerConfigConstants');
var ApiClient = require('../../core/api');
var NotificationActions = require('../actions/NotificationActions');

var CHANGE_EVENT = 'change';

var _items = {}; // collection of config items
var _initialized = false;

/**
 * Create a config item.
 *
 * @param {string} name  the name of the config item
 * @param {string} value The content of our config item
 */
function create(name, value) {
    _items[name] = {
        name: name,
        value: value,
        changed: false
    };
}

/**
 * Delete a config item
 * @param {string} name
 */
function destroy(name) {
    delete _items[name];
}

var ServerConfigStore = assign({}, EventEmitter.prototype, {
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
        ApiClient.get('config', function(response) {
            var payload = response.entity;

            _.each(payload, function(item) {
                create(item.name, item.value);
            });

            that.emitChange();
        }, function(failResponse) {
            that.initialized = false;
            console.log("FAILED REQUEST: ", failResponse);

            if(failResponse.error === 'timeout') {
                NotificationActions.create(
                    'Connection error',
                    'Unable to connect to server. Please check your connectivity and reload the page.'
                );
            } else {
                NotificationActions.create(
                    'Error',
                    'Server returned a ' + failResponse.status.code + '.' +
                    'Please check your console for more detailed errors'
                );
            }
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
            case ServerConfigConstants.CONFIG_CREATE:
                ServerConfigStore.emitChange();
                break;

            case ServerConfigConstants.CONFIG_DESTROY:
                ServerConfigStore.emitChange();
                break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ServerConfigStore;
