var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
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
            case 'email':
                return Validator.email(this.state.email) ? yes : no;
            case 'refresh':
            case 'retry':
            case 'expire':
            case 'minTtl':
                return Validator.numeric(this.state[ref]) ? yes : no;
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

    showHelp: function(e) {
        e.preventDefault();

        $(e.target).trigger('soaHelp');

        $('html, body').animate({
            scrollTop: $('#soaHelp').offset().top
        }, 200);
    },

    /**
     * @return {object}
     */
    render: function () {
        /*
         * Coming from the zone list, our initial render does not
         * have an SOA record. These will be fetched asynchronously
         * and trigger a re-render of this component. However,
         * operations on our state will yield undefined errors.
         */
        if(!this.props.record) {
            return (<div />);
        }


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
                                <dt>
                                    <a href="#soaHelp" onClick={this.showHelp}>
                                        <i className="help-popover ion ion-ios-information-outline fa-fw"
                                            data-tab-name="primaryMaster" />
                                    </a>
                                    Primary Master
                                </dt>
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
                                        onChange={this.handleChange.bind(this, 'primaryMaster')}
                                    />
                                </dd>

                                <dt>
                                    <a href="#soaHelp" onClick={this.showHelp}>
                                        <i className="help-popover ion ion-ios-information-outline fa-fw"
                                            data-tab-name="serial" />
                                    </a>
                                    Serial
                                </dt>
                                <dd>
                                    <Input
                                        type='text'
                                        defaultValue={this.state.serial}
                                        ref='serial'
                                        disabled={true}
                                    />
                                </dd>

                                <dt>
                                    <a href="#soaHelp" onClick={this.showHelp}>
                                        <i className="help-popover ion ion-ios-information-outline fa-fw"
                                            data-tab-name="refresh" />
                                    </a>
                                    Refresh
                                </dt>
                                <dd>
                                    <Input
                                        type='text'
                                        defaultValue={this.state.refresh}
                                        placeholder='86400'
                                        bsStyle={this.validationState('refresh')}
                                        hasFeedback
                                        ref='refresh'
                                        groupClassName='group-class'
                                        labelClassName='label-class'
                                        onChange={this.handleChange.bind(this, 'refresh')}
                                    />
                                </dd>

                                <dt>
                                    <a href="#soaHelp" onClick={this.showHelp}>
                                        <i className="help-popover ion ion-ios-information-outline fa-fw"
                                            data-tab-name="expire" />
                                    </a>
                                    Expire
                                </dt>
                                <dd>
                                    <Input
                                        type='text'
                                        defaultValue={this.state.expire}
                                        placeholder='3600000'
                                        bsStyle={this.validationState('expire')}
                                        hasFeedback
                                        ref='expire'
                                        groupClassName='group-class'
                                        labelClassName='label-class'
                                        onChange={this.handleChange.bind(this, 'expire')}
                                    />
                                </dd>
                            </dl>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <dl className="dl-horizontal">
                                <dt>
                                    <a href="#soaHelp" onClick={this.showHelp}>
                                        <i className="help-popover ion ion-ios-information-outline fa-fw"
                                            data-tab-name="email" />
                                    </a>
                                    Operator Email
                                </dt>
                                <dd>
                                    <Input
                                        type='text'
                                        defaultValue={this.state.email}
                                        placeholder='postmaster@example.org'
                                        bsStyle={this.validationState('email')}
                                        hasFeedback
                                        ref='email'
                                        groupClassName='group-class'
                                        labelClassName='label-class'
                                        onChange={this.handleChange.bind(this, 'email')}
                                    />
                                </dd>

                                <dt>
                                    <a href="#soaHelp" onClick={this.showHelp}>
                                        <i className="help-popover ion ion-ios-information-outline fa-fw"
                                            data-tab-name="serial" />
                                    </a>
                                    Notified Serial
                                </dt>
                                <dd>
                                    <Input
                                        type='text'
                                        defaultValue={this.props.zone.notifiedSerial}
                                        ref='notifiedSerial'
                                        disabled={true}
                                    />
                                </dd>

                                <dt>
                                    <a href="#soaHelp" onClick={this.showHelp}>
                                        <i className="help-popover ion ion-ios-information-outline fa-fw"
                                            data-tab-name="retry" />
                                    </a>
                                    Retry
                                </dt>
                                <dd>
                                    <Input
                                        type='text'
                                        defaultValue={this.state.retry}
                                        placeholder='7200'
                                        bsStyle={this.validationState('retry')}
                                        hasFeedback
                                        ref='retry'
                                        groupClassName='group-class'
                                        labelClassName='label-class'
                                        onChange={this.handleChange.bind(this, 'retry')}
                                    />
                                </dd>

                                <dt>
                                    <a href="#soaHelp" onClick={this.showHelp}>
                                        <i className="help-popover ion ion-ios-information-outline fa-fw"
                                            data-tab-name="minTtl" />
                                    </a>
                                    Minimum TTL
                                </dt>
                                <dd>
                                    <Input
                                        type='text'
                                        defaultValue={this.state.minTtl}
                                        placeholder='172800'
                                        bsStyle={this.validationState('minTtl')}
                                        hasFeedback
                                        ref='minTtl'
                                        groupClassName='group-class'
                                        labelClassName='label-class'
                                        onChange={this.handleChange.bind(this, 'minTtl')}
                                    />
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ServerZoneSoaRecord;
