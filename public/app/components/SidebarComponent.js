var React = require('react');

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Link = Router.Link;

var createActiveRouteComponent = require('react-router-active-component'); // or var Router = ReactRouter; in browsers
var NavLink = createActiveRouteComponent('li');

var SidebarComponent = React.createClass({
    render: function() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        <NavLink to="home">
                            <i className='ion ion-home'></i> <span>Home</span>
                        </NavLink>
                        <NavLink to="config">
                            <i className='ion ion-gear-a'></i> <span>Server Configuration</span>
                        </NavLink>
                        <NavLink to="zones">
                            <i className='ion ion-code-working'></i> <span>Zone Management</span>
                        </NavLink>
                        <NavLink to="zones">
                            <i className='ion ion-ribbon-b'></i> <span>DNSSEC Signatures</span>
                        </NavLink>
                    </ul>
                </section>
            </aside>
        );
    }
});

module.exports = SidebarComponent;
