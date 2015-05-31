var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var ActionConstants = require('./Constants');

let OhSnap = require('oh-snap').ohSnap;

function show(action, color, icon) {
    let thirtySeconds = 30000;
    OhSnap(action.getMessage(), color, icon, thirtySeconds);
}

var ActionLogActions = {
    /**
     * @param action
     */
    add(action) {
        PowerestDispatcher.dispatch({
            actionType: ActionConstants.ACTION_CREATE,
            action: action
        });
    },

    /**
     * @param actionId
     */
    finish(actionId) {
        PowerestDispatcher.dispatch({
            actionType: ActionConstants.ACTION_FINISH,
            actionId: actionId
        });
    },

    /**
     * @param actionId
     */
    fail(actionId) {
        PowerestDispatcher.dispatch({
            actionType: ActionConstants.ACTION_FAIL,
            actionId: actionId
        });
    },

    showError(action) {
        show(action, 'red', 'ion ion-close-circled');
    },

    showWarning(action) {
        show(action, 'yellow', 'ion ion-alert-circled');
    },

    showNotice(action) {
        show(action, 'blue', 'ion ion-information-circled');
    },

    showSuccess(action) {
        show(action, 'green', 'ion ion-checkmark-circled');
    }
};

module.exports = ActionLogActions;
