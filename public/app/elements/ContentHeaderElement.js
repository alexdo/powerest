var React = require('react');

var ContentHeaderElement = React.createClass({
    render: function() {
        return (
            <section className="content-header">
                <h1>
                    {this.props.headline}
                </h1>
            </section>
        );
    }
});

module.exports = ContentHeaderElement;
