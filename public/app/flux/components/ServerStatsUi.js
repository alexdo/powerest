var _ = require('underscore');
var $ = window.jQuery;
var React = require('react');
var Config = require('../../config.js');

var ServerStatsStore = require('../stores/ServerStatsStore');
var ServerStatsItem = require('./ServerStatsItem');

function getStatsState() {
    return {
        allStats: ServerStatsStore.getAll()
    };
}

var ServerStatsUi = React.createClass({
    getInitialState: function() {
        return getStatsState();
    },

    componentDidMount: function() {
        ServerStatsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ServerStatsStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        var allStats = this.state.allStats;
        var whitelistedItems = [ "latency", "udp-queries", "udp-answers", "udp-answers-bytes",
                "uptime", "user-msec", "sys-msec", "corrupt-packets",
                "signatures", "signature-cache-size", "packetcache-hit", "packetcache-miss",
                "servfail-packets"
             ];
        var serverStatsItems = [];

        if (_.isEmpty(allStats)) {
            $('.wrapper').addClass('loading');
        } else {
            $('.wrapper').removeClass('loading');

            var stats = _.reject(allStats, function(item) { return !_.contains(whitelistedItems, item.name.toLowerCase()) });

            _.each(whitelistedItems, function(itemName) {
                var item = _.findWhere(stats, { name: itemName });
                if(item) {
                    serverStatsItems.push(<ServerStatsItem item={item} />);
                }
            });
        }

        return (
            <div className="row">
                {serverStatsItems}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStatsState());
    }

});

module.exports = ServerStatsUi;
