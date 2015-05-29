var React = require('react');
var ServerZoneActions = require('../actions/ServerZoneActions');
var RrTypeDropdown = require('./RrTypeDropdown');
var Input = require('react-bootstrap').Input;
var Validator = require('../../core/validator');
var GenericRecord = require('../models/GenericRecord');

var ENTER_KEY_CODE = 13;

var ServerZoneRecordCreationForm = React.createClass({
    getInitialState: function() {
        return {
            name: this.props.name,
            content: this.props.content,
            type: this.props.type,
            priority: this.props.priority,
            ttl: this.props.ttl
        };
    },

    validationState: function(ref) {
        var yes = 'success';
        var no = 'error';

        switch(ref) {
            case 'name':
            case 'content':
                if(_.isEmpty(this.state[ref])) {
                    return '';
                } else {
                    return Validator.domain(this.state[ref]) ? yes : no;
                }
            case 'ttl':
            case 'priority':
                if(_.isEmpty(this.state[ref])) {
                    return '';
                } else {
                    return Validator.numeric(this.state[ref]) ? yes : no;
                }
            default:
                return yes;
        }
    },

    handleChange: function(ref, event) {
        if(_.isEmpty(this.refs)) return;
        if(!_.has(this.state, ref)) return;

        var currentState = this.state;
        currentState[ref] = this.refs[ref].getValue();

        this.setState(currentState);
    },

    handleTypeChange(dropdown, newState) {
        var currentState = this.state;
        currentState.type = newState.selected;
        this.setState(currentState);
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
                        <div className="col-xs-12 col-md-2 rr-dropdown-wrapper">
                            <RrTypeDropdown onChange={this.handleTypeChange} />
                        </div>
                        <div className="col-xs-12 col-md-5">
                            <Input
                                type='text'
                                label='Resource Name'
                                placeholder='sub.example.org'
                                bsStyle={this.validationState('name')}
                                hasFeedback
                                ref='name'
                                onChange={this.handleChange.bind(this, 'name')}
                                onKeyDown={this._onKeyDown}
                            />
                        </div>
                        <div className="col-xs-12 col-md-5">
                            <Input
                                type='text'
                                label='Content'
                                placeholder='192.168.0.1'
                                bsStyle={this.validationState('content')}
                                hasFeedback
                                ref='content'
                                onChange={this.handleChange.bind(this, 'content')}
                                onKeyDown={this._onKeyDown}
                            />
                        </div>
                        <div className="col-xs-6 col-md-2 col-md-push-2">
                            <Input
                                type='number'
                                label='Priority'
                                placeholder='0'
                                bsStyle={this.validationState('priority')}
                                hasFeedback
                                ref='priority'
                                onChange={this.handleChange.bind(this, 'priority')}
                                onKeyDown={this._onKeyDown}
                            />
                        </div>
                        <div className="col-xs-6 col-md-3 col-md-push-2">
                            <Input
                                type='number'
                                label='TTL'
                                placeholder='86400'
                                bsStyle={this.validationState('ttl')}
                                hasFeedback
                                ref='ttl'
                                onChange={this.handleChange.bind(this, 'ttl')}
                                onKeyDown={this._onKeyDown}
                            />
                        </div>
                        <div className="col-xs-12 col-md-5 col-md-push-2">
                            <button className="btn btn-success btn-flat btn-block icon-left new-record"
                                type="button" onClick={this._save}>
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
        ServerZoneActions.addRecord(this.props.zone.id, this.toRecord());
    },

    /**
     * @param  {object} event
     */
    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save();
        }
    },

    toRecord() {
        return new GenericRecord({
          name: this.state.name,
          type: this.state.type,
          ttl: this.state.ttl,
          priority: this.state.priority,
          content: this.name,
          disabled: false
        });
    }
});

module.exports = ServerZoneRecordCreationForm;
