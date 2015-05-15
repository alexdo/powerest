/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var RouteHandler = Router.RouteHandler;


var ContentComponent = React.createClass({
    render: function() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Page Header
                        <small>Optional description</small>
                    </h1>
                </section>

                {/* Main content */}
                <section className="content">

                    <RouteHandler />

                </section>
            </div>
        );
    }
});

module.exports = ContentComponent;
