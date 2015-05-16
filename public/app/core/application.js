var React = require('react');

var HeaderComponent = require('../components/HeaderComponent');
var SidebarComponent = require('../components/SidebarComponent');
var ContentComponent = require('../components/ContentComponent');
var FooterComponent = require('../components/FooterComponent');

require('./application.scss');

var App = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <HeaderComponent />
                <SidebarComponent />
                <ContentComponent />
                <FooterComponent />
            </div>
        );
    }
});

module.exports = App;
