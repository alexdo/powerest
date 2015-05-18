var PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
var NotificationConstants = require('../constants/NotificationConstants');

var NotificationActions = {
    /**
     * @param subject
     * @param message
     */
    create: function(subject, message) {
        PowerestDispatcher.dispatch({
            actionType: NotificationConstants.NOTIFICATION_CREATE,
            subject: subject,
            message: message
        });
    },

    /**
     * @param subjectId
     */
    destroy: function(subjectId) {
        PowerestDispatcher.dispatch({
            actionType: NotificationConstants.NOTIFICATION_DESTROY,
            subjectId: subjectId
        });    },

    /**
     * @param subjectId
     */
    markAsRead: function(subjectId) {
        PowerestDispatcher.dispatch({
            actionType: NotificationConstants.NOTIFICATION_READ,
            subjectId: subjectId
        });
    }
};

module.exports = NotificationActions;
