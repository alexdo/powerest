var React = require('react');

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
                        <li className="dropdown notifications-menu">
                            {/* Menu toggle button */}
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-bell-o"></i>
                                <span className="label label-primary">10</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="header">You have 10 notifications</li>
                                <li>
                                    {/* Inner Menu: contains the notifications */}
                                    <ul className="menu">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-users text-aqua"></i> 5 new members joined today
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="footer"><a href="#">View all</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = HeaderNavigationComponent;
