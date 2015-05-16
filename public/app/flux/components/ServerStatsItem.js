var React = require('react');

var ServerStatsItem = React.createClass({
    _formatSeconds: function(secs) {
        secs = Math.round(secs);
        var hours = Math.floor(secs / (60 * 60));
        var days = Math.floor(hours / 24);

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        return days + ':' + hours + ':' + minutes;
    },

    formatValue: function(val, type) {
        switch(type) {
            case 'seconds':
                return this._formatSeconds(val);
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
