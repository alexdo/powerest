var _ = require('underscore');
var assign = require('object-assign');

var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var EventEmitter = require('events').EventEmitter;
var ServerConfigConstants = require('../constants/ServerConfigConstants');

var CHANGE_EVENT = 'change';

var _items = {}; // collection of config items

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
        return _items;
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
