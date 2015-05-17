var React = require('react');

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Link = Router.Link;

var LogoElement = React.createClass({
    render: function() {
        return (
            <a href="/#/" className="logo">
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
