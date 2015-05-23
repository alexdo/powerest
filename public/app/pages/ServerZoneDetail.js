var React = require('react');
var Config = require('../config');

var ContentHeader = require('../elements/ContentHeaderElement');
var ServerZoneDetailUi = require('../flux/components/ServerZoneDetailUi');

var ServerZoneDetail = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var headline = 'Edit ' + this.context.router.getCurrentParams().zoneId;

        return (
            <div className="content-wrapper">
                <ContentHeader headline={headline} />
                <section className="content">
                    <ServerZoneDetailUi zoneId={this.context.router.getCurrentParams().zoneId} />
                </section>
            </div>
        );
    }
});

module.exports = ServerZoneDetail;
