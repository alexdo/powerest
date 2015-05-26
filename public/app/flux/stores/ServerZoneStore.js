var assign = require('object-assign');

var EventEmitter = require('events').EventEmitter;

var ApiClient = require('../../core/api');
var Config = require('../../config');
var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var ServerZoneConstants = require('../constants/ServerZoneConstants');
var NotificationActions = require('../actions/NotificationActions');
var Zone = require('../models/Zone');

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
    _items[name] = new Zone(api_response);
}

/**
 * Delete a config item
 * @param {string} name
 */
function destroy(name) {
    delete _items[name];
}

/**
 * Clear all current items
 */
function clear() {
    _items = {};
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

    /**
     * This function is called by zone detail views. In here, we need
     * all records of our zone. However, the /zones Endpoint does not
     * return any records.
     * So, when coming from the zone index, we are about to operate on
     *
     *   a) a potentially outdated zone,
     *   b) a zone which has no records.
     *
     * To avoid this, we check if the zone has records and if not refetch
     * it.
     *
     * @param zoneId
     * @param refetch
     * @returns {*}
     */
    getById: function(zoneId, refetch = false) {
        var that = this;

        if (!refetch && _.has(_items, zoneId) && !_.isEmpty(_items[zoneId].records)) {
            return _items[zoneId];
        } else {
            ApiClient.get('zones/' + zoneId, function(response) {
                var zone = response.entity;
                create(zone.id, zone);
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

            return null;
        }
    },

    loadFromApi: function() {
        var that = this;
        ApiClient.get('zones', function(response) {
            var payload = response.entity;

            clear();
            _.each(payload, function(item) {
                create(item.id, item);
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

        $('.wrapper').addClass('loading');
        ApiClient.post('zones', payload, function(response) {
            NotificationActions.create('Successfully created ' + domainName);
            window.setTimeout(function() {
                that.loadFromApi();
            }, 1000);
        }, function(failResponse) {
            $('.wrapper').removeClass('loading');

            if(_.has(failResponse, "status")) {
                NotificationActions.create(
                    'Zone Creation Error (HTTP ' + failResponse.status.code + ')',
                    failResponse.entity.error
                );
            } else {
                NotificationActions.create(
                    'Unable to create a new Domain',
                    'This could be due to a network error. Check the console for further information.'
                );
                console.log(failResponse);
            }
        });
    },

    destroy: function(zoneId) {
        var that = this;
        var zone;

        if(_.has(_items, zoneId)) {
            zone = _items[zoneId];
        } else {
            NotificationActions.create(
                'No such zone',
                'Unable to find "' + zoneId + '" in Powerest Registry'
            );
        }

        if (!window.confirm(
                "Are you sure you want to delete '" + zone.name + "' and all associated records from your server?\n\n" +
                "This operation can not be undone!"
        )) {
            return;
        }

        $('.wrapper').addClass('loading');
        ApiClient.del('zones/' + zoneId, function(response) {
            NotificationActions.create('Successfully deleted ' + zone.name);
            window.setTimeout(function() {
                that.loadFromApi();
            }, 1000);
        }, function(failResponse) {
            $('.wrapper').removeClass('loading');

            if(_.has(failResponse, "status")) {
                NotificationActions.create(
                    'Zone Deletion Error (HTTP ' + failResponse.status.code + ')',
                    failResponse.entity.error
                );
            } else {
                NotificationActions.create(
                    'Unable to delete ' + zone.name,
                    'This could be due to a network error. Check the console for further information.'
                );
                console.log(failResponse);
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
            case ServerZoneConstants.ZONE_CREATE:
                ServerZoneStore.create(action.domainName);
                ServerZoneStore.emitChange();
                break;

            case ServerZoneConstants.ZONE_EDIT:
                // TODO edit zone
                ServerZoneStore.emitChange();
                break;

            case ServerZoneConstants.ZONE_DESTROY:
                ServerZoneStore.destroy(action.zoneId);
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
