var React = require('react');
var ContentHeader = require('../elements/ContentHeaderElement');


var Home = React.createClass({
    render: function() {
        return (
            <div className="content-wrapper">
                <ContentHeader headline="Home" />
                <section className="content">

                    HOME MAN!

                </section>
            </div>
        );
    }
});

module.exports = Home;
