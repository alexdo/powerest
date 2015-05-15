/** @jsx React.DOM */

var App = require('./core/application');
var Home = require('./pages/Home');
var About = require('./pages/About');
var React = require('react');

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var routes = (
    <Route path="/" name="root" handler={App}>
        <DefaultRoute name="home" handler={Home} />
        <Route name="about" handler={About} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, document.body);
});

