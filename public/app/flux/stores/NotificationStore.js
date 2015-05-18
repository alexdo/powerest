var _ = require('underscore');
var assign = require('object-assign');

var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var EventEmitter = require('events').EventEmitter;
var NotificationConstants = require('../constants/NotificationConstants');

var CHANGE_EVENT = 'change';

var _items = {}; // collection of config items

/**
 * Create a config item.
 *
 * @param {string} subject  The name of the config item
 * @param {string} message  The content of our config item
 */
function create(subject, message) {
    var id = _.uniqueId('notification_');

    _items[id] = {
        id: id,
        headline: subject,
        message: message,
        date: Date.now(),
        read: false
    };
}

/**
 * Delete a config item
 * @param {string} subjectId
 */
function destroy(subjectId) {
    delete _items[subjectId];
}

/**
 * Delete a config item
 * @param {string} subjectId
 */
function markAsRead(subjectId) {
    if (_.has(_items, subjectId)) {
        _items[subjectId]['read'] = true;
    }
}

var NotificationStore = assign({}, EventEmitter.prototype, {
    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function () {
        return _items;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    create: function (subject, message) {
        create(subject, message);
    },

    destroy: function (subjectId) {
        destroy(subjectId);
    },

    markAsRead: function (subjectId) {
        markAsRead(subjectId);
    },

    dispatcherIndex: PowerestDispatcher.register(function (action) {
        switch (action.actionType) {
            case NotificationConstants.NOTIFICATION_CREATE:
                NotificationStore.create(action.subject, action.message);
                NotificationStore.emitChange();
                break;

            case NotificationConstants.NOTIFICATION_DESTROY:
                NotificationStore.destroy(action.subjectId);
                NotificationStore.emitChange();
                break;

            case NotificationConstants.NOTIFICATION_READ:
                NotificationStore.markAsRead(action.subjectId);
                NotificationStore.emitChange();
                break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = NotificationStore;
