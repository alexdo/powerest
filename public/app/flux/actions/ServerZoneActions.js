var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var ServerZoneConstants = require('../constants/ServerZoneConstants');

var ServerZoneActions = {

    /**
     * @param  {string} zoneId
     */
    notify: function(zoneId) {
        PowerestDispatcher.dispatch({
            actionType: ServerZoneConstants.ZONE_NOTIFY,
            zoneId: zoneId
        });
    }
};

module.exports = ServerZoneActions;
