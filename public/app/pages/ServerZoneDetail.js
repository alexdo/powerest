var React = require('react');
var Config = require('../config');

var ContentHeader = require('../elements/ContentHeaderElement');
//var ServerZoneUi = require('../flux/components/ServerZoneUi');

var ServerZoneDetail = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var headline = '' + Config.server + ' Zones';

        return (
            <div className="content-wrapper">
                <ContentHeader headline={headline} />
                <section className="content">
                    {this.context.router.getCurrentParams().zoneId}
                </section>
            </div>
        );
    }
});

module.exports = ServerZoneDetail;
