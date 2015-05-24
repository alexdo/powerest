var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Link = Router.Link;
var createActiveRouteComponent = require('react-router-active-component'); // or var Router = ReactRouter; in browsers
var NavLink = createActiveRouteComponent('li');

var Config = require('../config');
var DEFAULT_USER_NAME = 'Powerest User';

var SidebarComponent = React.createClass({
    getInitialState: function() {
        return {
            name: this.getCurrentUserName()
        }
    },

    getCurrentUserName: function() {
        if (_.isString(Config.user_name)) {
            return Config.user_name;
        } else {
            if (window.localStorage && _.isString(window.localStorage.getItem('powerestUser'))) {
                Config.user_name = window.localStorage.getItem('powerestUser');
                return Config.user_name;
            } else {
                return DEFAULT_USER_NAME;
            }
        }
    },

    showForm: function() {
        var that = this;

        $('#current-name').hide();
        $('#change-name-form').fadeIn()
            .on('submit', this.changeCurrentUserName)
            .find('input')
            .val(this.getCurrentUserName)
            .focus()
            .select()
            .on('blur', this.changeCurrentUserName)
            .on('keyup', function(e) {
                var code = e.which; // recommended to use e.which, it's normalized across browsers
                if (code === 13) {
                    that.changeCurrentUserName(e);
                }
            });
    },

    changeCurrentUserName: function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $form = $('#change-name-form');
        var newName = $('input', $form).val();
        $form.fadeOut('fast');
        $('#current-name').text(newName).show('slow');

        if (window.localStorage) {
            window.localStorage.setItem('powerestUser', newName);
        }
        Config.user_name = newName;
        this.state.name = newName;
    },

    render: function() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="images/icon-user-160.png" className="img-circle" alt="User Image" style={{opacity: .4}} />
                        </div>
                        <div className="pull-left info">
                            <p id="current-name">{this.state.name}</p>
                            <form action="#" method="get" className="sidebar-form" style={{display: 'none'}} id="change-name-form">
                                <div className="input-group">
                                    <input type="text" name="q" className="form-control" />
                                </div>
                            </form>

                            <a className="change-name" onClick={this.showForm}>
                                <i className="ion ion-edit"></i>
                                Change Name
                            </a>
                        </div>
                    </div>

                    <ul className="sidebar-menu">
                        <li className="header">{Config.server.toUpperCase()}</li>
                        <NavLink to="zones">
                            <i className='ion ion-code-working'></i> <span>Zone Management</span>
                        </NavLink>
                        <NavLink to="home">
                            <i className='ion ion-stats-bars'></i> <span>Server Statistics</span>
                        </NavLink>
                        <NavLink to="config">
                            <i className='ion ion-wrench'></i> <span>Server Configuration</span>
                        </NavLink>
                    </ul>
                </section>
            </aside>
        );
    }
});

module.exports = SidebarComponent;
