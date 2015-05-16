var _ = require('underscore');
var $ = window.jQuery;
var React = require('react');
var Config = require('../../config.js');

var ServerConfigStore = require('../stores/ServerConfigStore');
var ServerConfigItem = require('./ServerConfigItem');

function getConfigState() {
    return {
        allConfigs: ServerConfigStore.getAll()
    };
}

var ServerConfigUi = React.createClass({
    getInitialState: function() {
        return getConfigState();
    },

    componentDidMount: function() {
        ServerConfigStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ServerConfigStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        var allConfigs = this.state.allConfigs;
        var serverConfigItems = [];

        if (_.isEmpty(allConfigs)) {
            $('.wrapper').addClass('loading');
        } else {
            $('.wrapper').removeClass('loading');

            _.each(allConfigs, function(item) {
                serverConfigItems.push(<ServerConfigItem key={item.name} item={item} />);
            });
        }

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">
                                {Config.server}
                            </h3>
                        </div>
                        <div className="box-body table-responsive no-padding">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="col-xs-4">Key</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serverConfigItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getConfigState());
    }

});

module.exports = ServerConfigUi;
