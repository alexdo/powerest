var ButtonGroup = require('react-bootstrap').ButtonGroup;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Input = require('react-bootstrap').Input;

var ServerZoneActions = require('../actions/ServerZoneActions');
var Validator = require('../../core/validator');

var ServerZoneSoaRecord = React.createClass({
    getInitialState: function() {
        return {
            primaryMaster: this.props.record.primaryMaster,
            email: this.props.record.email,
            serial: this.props.record.serial,
            refresh: this.props.record.refresh,
            retry: this.props.record.retry,
            expire: this.props.record.expire,
            minTtl: this.props.record.minTtl
        }
    },

    validationState: function(ref) {
        var yes = 'success';
        var no = 'error';

        switch(ref) {
            case 'primaryMaster':
                return Validator.nameserver(this.state.primaryMaster) ? yes : no;
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

    /**
     * @return {object}
     */
    render: function () {
        return (
            <div className="box box-solid box-primary">
                <div className="box-header">
                    <h3 className="box-title">
                        Start of Authority
                        &nbsp;
                        <small className="label label-info">SOA</small>
                    </h3>
                </div>
                <div className="box-body">
                    <div className="row record-soa">
                        <div className="col-sm-6 col-xs-12">
                            <dl className="dl-horizontal">
                                <dt>Primary Master</dt>
                                <dd>
                                    <Input
                                        type='text'
                                        defaultValue={this.state.primaryMaster}
                                        placeholder='ns.example.org'
                                        bsStyle={this.validationState('primaryMaster')}
                                        hasFeedback
                                        ref='primaryMaster'
                                        groupClassName='group-class'
                                        labelClassName='label-class'
                                        onChange={this.handleChange.bind(this, 'primaryMaster')} />
                                </dd>

                                <dt>Serial</dt>
                                <dd>{this.state.serial}</dd>

                                <dt>Refresh</dt>
                                <dd>{this.state.refresh}</dd>

                                <dt>Expire</dt>
                                <dd>{this.state.expire}</dd>
                            </dl>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <dl className="dl-horizontal">
                                <dt>Operator Email</dt>
                                <dd>{this.state.email}</dd>

                                <dt>Notified Serial</dt>
                                <dd>{this.props.zone.notifiedSerial}</dd>

                                <dt>Retry</dt>
                                <dd>{this.state.retry}</dd>

                                <dt>Minimum TTL</dt>
                                <dd>{this.state.minTtl}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ServerZoneSoaRecord;
