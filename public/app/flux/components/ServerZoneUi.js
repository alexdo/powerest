var _ = require('underscore');
var $ = window.jQuery;
var React = require('react');
var Config = require('../../config.js');

var ServerZoneStore = require('../stores/ServerZoneStore');
var ServerZoneItem = require('./ServerZoneItem');
var ServerZoneCreationForm = require('./ServerZoneCreationForm');

function getZoneState() {
    return {
        allZones: ServerZoneStore.getAll()
    };
}

var ServerZoneUi = React.createClass({
    getInitialState: function() {
        return getZoneState();
    },

    _initializeDataTables: function() {
        this._dataTable = $('#zone-list-table').dataTable({
            "bPaginate": true,
            "bLengthChange": false,
            "bFilter": false,
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false
        });
    },

    _removeDataTables: function() {
        if(!!this._dataTable) {
            this._dataTable.fnDestroy();
        }
    },

    componentDidMount: function() {
        ServerZoneStore.addChangeListener(this._onChange);
        this._initializeDataTables();
    },

    componentWillUnmount: function() {
        ServerZoneStore.removeChangeListener(this._onChange);
        this._removeDataTables();
    },

    componentWillUpdate: function() {
        this._removeDataTables();
    },

    componentDidUpdate: function() {
        this._initializeDataTables();
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
                serverZoneItems.push(<ServerZoneItem key={item.id} item={item} />);
            });
        }

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-success">
                        <div className="box-header">
                            <h3 className="box-title">
                                Add a new Zone
                            </h3>
                        </div>
                        <div className="box-body">
                            <ServerZoneCreationForm />
                        </div>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header">
                            <h3 className="box-title">
                                Available Zones
                            </h3>
                        </div>
                        <div className="box-body">
                            <table className="table table-bordered table-striped table-hover" id="zone-list-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Serial</th>
                                        <th>Notified serial</th>
                                        <th>Creator</th>
                                        <th>Actions</th>
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
