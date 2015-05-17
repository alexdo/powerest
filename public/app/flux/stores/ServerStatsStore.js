var _ = require('underscore');
var assign = require('object-assign');

var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var EventEmitter = require('events').EventEmitter;
var ServerStatsConstants = require('../constants/ServerStatsConstants');
var ApiClient = require('../../core/api');

var CHANGE_EVENT = 'change';

var _items = {}; // collection of stats items
var _initialized = false;

/**
 * Create a stats item.
 *
 * @param {string} name  the name of the stats item
 * @param {string} value The content of our stats item
 * @param {string} unit
 * @param {string} color
 * @param {string} icon
 */
function create(name, value, unit = 'numeric', color = 'gray', icon = '') {
    _items[name] = {
        name: name,
        value: value,
        changed: false,
        unit: unit,
        color: color,
        icon: icon
    };
}

/**
 * Delete a stats item
 * @param {string} name
 */
function destroy(name) {
    delete _items[name];
}

var ServerStatsStore = assign({}, EventEmitter.prototype, {
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
        ApiClient.get('statistics', function(response) {
            var payload = response.entity;

            _.each(payload, function(item) {
                create(
                    item.name,
                    item.value,
                    that.unitForStat(item.name),
                    that.colorForStat(item.name),
                    that.iconForStat(item.name)
                );
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
            case ServerStatsConstants.STATS_CREATE:
                ServerStatsStore.emitChange();
                break;

            case ServerStatsConstants.STATS_DESTROY:
                ServerStatsStore.emitChange();
                break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    }),

    unitForStat: function(statName) {
        statName = ('' + statName).toLowerCase();

        switch(statName) {
            case 'uptime':
                return 'seconds';
            case 'latency':
                return 'milliseconds';
            case 'sys-msec':
            case 'user-msec':
                return 'cputime';
            case 'signature-cache-size':
            case 'udp-answers-bytes':
                return 'size';
            default:
                return 'numeric';
        }
    },

    colorForStat: function(statName) {
        statName = ('' + statName).toLowerCase();

        switch(statName) {
            case 'corrupt-packets':
            case 'packetcache-miss':
            case 'query-cache-miss':
            case 'servfail-packets':
                return 'red';

            case 'packetcache-hit':
            case 'query-cache-hit':
                return 'green';

            case 'sys-msec':
            case 'user-msec':
                return 'purple';

            case 'uptime':
            case 'latency':
                return 'green';

            case 'signature-cache-size':
            case 'signatures':
            case 'udp-answers':
            case 'udp-queries':
            case 'udp-answers-bytes':
                return 'blue';

            default:
                return 'gray';
        }
    },

    iconForStat: function(statName) {
        statName = ('' + statName).toLowerCase();

        switch(statName) {
            case 'latency':
                return 'ion-speedometer';
            case 'uptime':
                return 'ion-ios-time-outline';
            case 'sys-msec':
            case 'user-msec':
                return 'ion-flash';
            case 'signature-cache-size':
            case 'udp-answers-bytes':
                return 'ion-ios-cloud-upload';
            case 'signatures':
                return 'ion-ios-locked';
            default:
                return 'ion-information';
        }
    }
});

module.exports = ServerStatsStore;
