var App = require('./core/application');
var Home = require('./pages/Home');
var ServerConfig = require('./pages/ServerConfig');
var React = require('react');

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var routes = (
    <Route path="/" name="root" handler={App}>
        <DefaultRoute name="home" handler={Home} />
        <Route name="config" handler={ServerConfig} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});
