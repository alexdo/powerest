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
    }
};

module.exports = ServerZoneActions;
