var React = require('react');
var Config = require('../config');

var ContentHeader = require('../elements/ContentHeaderElement');
var ServerStatsUi = require('../flux/components/ServerStatsUi');

var Home = React.createClass({
    render: function() {
        var headline = '' + Config.server + ' Statistics';

        return (
            <div className="content-wrapper">
                <ContentHeader headline={headline} />
                <section className="content">
                    <ServerStatsUi />
                </section>
            </div>
        );
    }
});

module.exports = Home;
