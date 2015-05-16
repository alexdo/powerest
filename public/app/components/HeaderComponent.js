var React = require('react');

var HeaderNavigationComponent = require('./HeaderNavigationComponent');

var LogoElement = require('../elements/LogoElement');
//var TopNavElement = require('../elements/TopNavElement');

var HeaderComponent = React.createClass({
    render: function() {
        return (
            <header className="main-header">
                <LogoElement />
                <HeaderNavigationComponent />
            </header>

        );
    }
});

module.exports = HeaderComponent;
