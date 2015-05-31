var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var ServerZoneConstants = require('../constants/ServerZoneConstants');

var ServerZoneActions = {
    /**
     * @param  {string} domainName zone name
     */
    create: function(domainName) {
        PowerestDispatcher.dispatch({
            actionType: ServerZoneConstants.ZONE_CREATE,
            domainName: domainName
        });
    },

    /**
     * @param  {string} zoneId
     */
    notify: function(zoneId) {
        PowerestDispatcher.dispatch({
            actionType: ServerZoneConstants.ZONE_NOTIFY,
            zoneId: zoneId
        });
    },

    /**
     * @param  {string} zoneId
     */
    destroy: function(zoneId) {
        PowerestDispatcher.dispatch({
            actionType: ServerZoneConstants.ZONE_DESTROY,
            zoneId: zoneId
        });
    },

    /**
     * @param zoneId
     * @param newRecord
     * @param action
     */
    addRecord: function(zoneId, newRecord, action) {
        PowerestDispatcher.dispatch({
            actionType: ServerZoneConstants.RECORD_ADD,
            zoneId: zoneId,
            record: newRecord,
            action: action
        });
    }
};

module.exports = ServerZoneActions;
