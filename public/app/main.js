var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = require('./core/application');
var Home = require('./pages/Home');
var ServerConfig = require('./pages/ServerConfig');
var ServerZones = require('./pages/ServerZones');
var ServerZoneDetail = require('./pages/ServerZoneDetail');


var routes = (
    <Route path="/" name="root" handler={App}>
        <DefaultRoute name="home" handler={Home} />
        <Route name="config" handler={ServerConfig} />
        <Route name="zones" handler={ServerZones} />
        <Route name="newZone" path="zones/new" handler={ServerZoneDetail} />
        <Route name="zone" path="zones/:zoneId" handler={ServerZoneDetail} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});
