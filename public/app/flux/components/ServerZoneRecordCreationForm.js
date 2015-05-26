var React = require('react');
var ServerZoneActions = require('../actions/ServerZoneActions');
var RrTypeDropdown = require('./RrTypeDropdown');
var Input = require('react-bootstrap').Input;

var ENTER_KEY_CODE = 13;

var ServerZoneRecordCreationForm = React.createClass({
    getInitialState: function() {
        return {
            name: this.props.name || '',
            type: this.props.type || null,
            priority: this.props.priority || 0,
            ttl: this.props.ttl || 86400
        };
    },

    /**
     * @return {object}
     */
    render: function () {
        return (
            <div className="box box-success">
                <div className="box-header">
                    <h3 className="box-title" data-widget="collapse">
                        Add a new RR
                    </h3>
                    <div className="box-tools pull-right">
                        <button className="btn btn-box-tool" data-widget="collapse">
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                </div>
                <div className="box-body">
                    <div className="row">
                        <div className="col-xs-12 col-md-2 col-lg-2 rr-dropdown-wrapper">
                            <RrTypeDropdown className="" />
                        </div>
                        <div className="col-xs-12 col-md-4 col-lg-4">
                            <Input
                                type='text'
                                defaultValue=""
                                placeholder='sub.example.org'
                                bsStyle=""
                                hasFeedback
                                ref='rrName'
                            />
                        </div>
                        <div className="col-xs-6 col-md-2 col-lg-2">
                            <Input
                                type='number'
                                defaultValue=""
                                placeholder='0'
                                bsStyle=""
                                hasFeedback
                                ref='priority'
                            />
                        </div>
                        <div className="col-xs-6 col-md-2 col-lg-2">
                            <Input
                                type='number'
                                defaultValue=""
                                placeholder='86400'
                                bsStyle=""
                                hasFeedback
                                ref='ttl'
                            />
                        </div>
                        <div className="col-xs-12 col-md-2 col-lg-2">
                            <button className="btn btn-success btn-flat btn-block icon-left" type="button" onClick={this._save}>
                                <i className="ion ion-ios-plus-outline" />
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    /**
     * Invokes the callback passed in as onSave, allowing this component to be
     * used in different ways.
     */
    _save: function() {
        if (this.state.value.length > 0 && this.state.value.match(/\./)) {
            ServerZoneActions.create(this.state.value);
            this.setState({
                value: ''
            });
        }
    },

    /**
     * @param {object} event
     */
    _onChange: function(/*object*/ event) {
        this.setState({
            value: event.target.value
        });
    },

    /**
     * @param  {object} event
     */
    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save();
        }
    }
});

module.exports = ServerZoneRecordCreationForm;
