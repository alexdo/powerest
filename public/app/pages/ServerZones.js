var React = require('react');
var Config = require('../config');

var ContentHeader = require('../elements/ContentHeaderElement');

var ServerZones = React.createClass({
    render: function() {
        var headline = '' + Config.server + ' Zones';

        return (
            <div className="content-wrapper">
                <ContentHeader headline={headline} />
            </div>
        );
    }
});

module.exports = ServerZones;
