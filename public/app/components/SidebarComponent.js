var React = require('react');

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Link = Router.Link;

var createActiveRouteComponent = require('react-router-active-component'); // or var Router = ReactRouter; in browsers
var NavLink = createActiveRouteComponent('li');

var SidebarComponent = React.createClass({
    render: function() {
        return (
            <aside className="main-sidebar">

                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar">

                    {/* Sidebar Menu */}
                    <ul className="sidebar-menu">
                        {/*<li className="header">HEADER</li>*/}
                        {/* Optionally, you can add icons to the links */}
                        <NavLink to="home">
                            <i className='fa fa-link'></i> <span>Home</span>
                        </NavLink>
                        <NavLink to="about">
                            <i className='fa fa-link'></i> <span>About</span>
                        </NavLink>
                        <li><a href="#"><i className='fa fa-link'></i> <span>Another Link</span></a></li>
                        <li className="treeview">
                            <a href="#"><i className='fa fa-link'></i> <span>Multilevel</span> <i className="fa fa-angle-left pull-right"></i></a>
                            <ul className="treeview-menu">
                                <li><a href="#">Link in level 2</a></li>
                                <li><a href="#">Link in level 2</a></li>
                            </ul>
                        </li>
                    </ul>{/* /.sidebar-menu */}
                </section>
                {/* /.sidebar */}
            </aside>
        );
    }
});

module.exports = SidebarComponent;
