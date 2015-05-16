var React = require('react');

var FooterComponent = React.createClass({
    render: function() {
        return (
            <footer className="main-footer">
                {/* To the right */}
                <div className="pull-right hidden-xs">
                    <small>Admin LTE Theme by <a href="https://almsaeedstudio.com/">Abdullah Almsaeed</a>.</small>
                </div>
                {/* Default to the left */}
                <small><strong>Powerest &copy; 2015 <a href="#">Alexander Dormann</a>.</strong> All rights reserved.</small>
            </footer>
        );
    }
});

module.exports = FooterComponent;
