/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

require('./application.css');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <header>
                    <ul>
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="about">About</Link></li>
                    </ul>
                </header>

                <RouteHandler />
            </div>
        );
    }
});

module.exports = App;
