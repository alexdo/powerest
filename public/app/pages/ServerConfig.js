var React = require('react');
var ContentHeader = require('../elements/ContentHeaderElement');
var ServerConfigUi = require('../flux/components/ServerConfigUi');

var ServerConfig = React.createClass({
    render: function() {
        return (
            <div className="content-wrapper">
                <ContentHeader headline="Server Configuration" />
                <section className="content">

                    <ServerConfigUi />

                </section>
            </div>
        );
    }
});

module.exports = ServerConfig;
