var _ = require('underscore');
var $ = window.jQuery;
var React = require('react');
var Config = require('../../config.js');

var ServerZoneStore = require('../stores/ServerZoneStore');

var ServerZoneDetailUi = React.createClass({
    getInitialState: function() {
        return {
            zone: ServerZoneStore.getById(this.props.zoneId)
        };
    },

    componentDidMount: function() {
        ServerZoneStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ServerZoneStore.removeChangeListener(this._onChange);
    },

    componentDidUpdate: function() {
        if(this.state.zone) {
            $('.content-header h1').text('Edit ' + this.state.zone.name)
        }
    },

    /**
     * @return {object}
     */
    render: function() {
        if(!this.state.zone) {
            $('.wrapper').addClass('loading');
            return (<div />);

        } else {
            $('.wrapper').removeClass('loading');

            return (
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-success collapsed-box">
                            <div className="box-header">
                                <h3 className="box-title" data-widget="collapse">
                                    Add a new Zone
                                </h3>
                                <div className="box-tools pull-right">
                                    <button className="btn btn-box-tool" data-widget="collapse">
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                            </div>
                            <div className="box-body">
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    },

    _onChange: function() {
        this.setState(this.getInitialState());
    }

});

module.exports = ServerZoneDetailUi;
