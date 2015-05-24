var HeaderComponent = require('../components/HeaderComponent');
var SidebarComponent = require('../components/SidebarComponent');
var ContentComponent = require('../components/ContentComponent');
var FooterComponent = require('../components/FooterComponent');

require('./application.scss');

// AdminLTE compatibility hacks; (does not support common js)
window.jQuery = require('jquery');
window.$ = window.jQuery;

require('bootstrap');
require('datatables');
require('datatables-bootstrap3-plugin');
require('../../components/admin-lte/dist/js/app');

var App = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <HeaderComponent />
                <SidebarComponent />
                <ContentComponent />
                <FooterComponent />

                {/* loading indicator */}
                <div className="spinner" />
            </div>
        );
    }
});

module.exports = App;
