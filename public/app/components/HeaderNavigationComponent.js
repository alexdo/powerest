var React = require('react');

var NotificationUi = require('../flux/components/NotificationUi');

var HeaderNavigationComponent = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-static-top" role="navigation">
                {/* Sidebar toggle button */}
                <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>
                {/* Navbar Right Menu */}
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">

                        {/* Notifications Menu */}
                        <NotificationUi />
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = HeaderNavigationComponent;
