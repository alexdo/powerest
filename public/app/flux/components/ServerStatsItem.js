var React = require('react');
var moment = require('moment');
var filesize = require('file-size');

var ServerStatsItem = React.createClass({
    formatValue: function(val, type) {
        switch(type) {
            case 'milliseconds':
                return val + 'ms';
            case 'seconds':
                return moment.duration(parseInt(val, 10), 'seconds').humanize();
            case 'size':
                return filesize(parseInt(val, 10)).human();
            default:
                return parseInt(val, 10).toLocaleString();
        }
    },

    /**
     * @return {object}
     */
    render: function() {
        var widgetClasses = 'small-box bg-' + this.props.item.color;
        var iconClasses = 'ion  ' + this.props.item.icon;

        var formattedVal = this.formatValue(this.props.item.value, this.props.item.unit);

        return (
            <div className="col-lg-3 col-xs-6">
                <div className={widgetClasses}>
                    <div className="inner">
                        <h3>{formattedVal}</h3>
                        <p>{this.props.item.name}</p>
                    </div>
                    <div className="icon">
                        <i className={iconClasses}></i>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ServerStatsItem;
