/** @jsx React.DOM */

var React = require('react');

var LogoElement = React.createClass({
    render: function() {
        return (
            <a href="components/admin-lte/index2.html" className="logo">
                <span className="logo-mini">
                    <img src="images/logo-lg-transculent.png" alt="Logo" />
                </span>

                <span className="logo-lg">
                    <img src="images/logo-lg-transculent.png" alt="Logo" />
                    Powerest
                </span>
            </a>
        );
    }
});

module.exports = LogoElement;
