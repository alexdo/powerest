var _ = require('underscore');
var $ = window.jQuery;
var React = require('react');
var Config = require('../../config.js');

//var ServerZoneStore = require('../stores/ServerZoneStore');
//var ServerZoneItem = require('./ServerZoneItem');

function getZoneState() {
    return {
        allZones: [] //ServerZoneStore.getAll()
    };
}

var ServerZoneUi = React.createClass({
    getInitialState: function() {
        return getZoneState();
    },

    componentDidMount: function() {
        //ServerZoneStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        //ServerZoneStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        var allZones = this.state.allZones;
        var serverZoneItems = [];

        if (_.isEmpty(allZones)) {
            $('.wrapper').addClass('loading');
        } else {
            $('.wrapper').removeClass('loading');

            _.each(allZones, function(item) {
                //serverZoneItems.push(<ServerZoneItem key={item.name} item={item} />);
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
                                    {serverZoneItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getZoneState());
    }

});

module.exports = ServerZoneUi;
