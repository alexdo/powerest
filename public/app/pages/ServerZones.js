var React = require('react');
var Config = require('../config');

var ContentHeader = require('../elements/ContentHeaderElement');
var ServerZoneUi = require('../flux/components/ServerZoneUi');

var ServerZones = React.createClass({
    render: function() {
        var headline = '' + Config.server + ' Zones';

        return (
            <div className="content-wrapper">
                <ContentHeader headline={headline} />
                <section className="content">
                    <ServerZoneUi />
                </section>
            </div>
        );
    }
});

module.exports = ServerZones;
