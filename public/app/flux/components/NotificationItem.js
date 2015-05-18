var _ = require('underscore');
var $ = window.jQuery;
var moment = require('moment');
var React = require('react');

var Config = require('../../config.js');
var NotificationActions = require('../actions/NotificationActions');

var NotificationItem = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        var classNames = 'notification';

        if(!!this.props.notification.read) {
            classNames += ' read';
        } else {
            classNames += ' unread';
        }

        return (
            <li>
                <a href="#" className={classNames} data-notification-id={this.props.notification.id} onClick={this.markAsRead}>
                    <h4>
                        {this.props.notification.subject}
                        <small className="time">{moment(this.props.notification.date).fromNow()}</small>
                    </h4>
                    <p>{this.props.notification.message}</p>
                </a>
            </li>
        );
    },

    markAsRead: function(e) {
        e.preventDefault();
        NotificationActions.markAsRead(this.props.notification.id);
    }
});

module.exports = NotificationItem;
