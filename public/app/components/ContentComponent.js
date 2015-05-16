var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var RouteHandler = Router.RouteHandler;


var ContentComponent = React.createClass({
    render: function() {
        return (
            <RouteHandler />
        );
    }
});

module.exports = ContentComponent;
