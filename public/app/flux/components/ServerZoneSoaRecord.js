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
                                <dt>
                                    <OverlayTrigger
                                        trigger='hover'
                                        rootClose={true}
                                        placement='right'
                                        overlay={
                                            <Popover title='Primary Master'>
                                                <p>
                                                    Contains the primary nameserver of this zone. Yet, the primary master
                                                    is of almost no relevance as it only defines
                                                </p>
                                                <ul className="unstyled">
                                                    <li>to whom dynamic updates are sent (DynDNS) and</li>
                                                    <li>which nameserver should not receive NOTIFYs for this zone.</li>
                                                </ul>
                                            </Popover>
                                            }
                                        >
                                        <i className="help-popover ion ion-ios-information-outline fa-fw" />
                                    </OverlayTrigger>
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
                                    <OverlayTrigger
                                        trigger='hover'
                                        rootClose={true}
                                        placement='right'
                                        overlay={
                                            <Popover title='Serial'>
                                                <p>
                                                    The revision number of this zone file. This number will be incremented
                                                    on each change automatically, as the changes will be
                                                    distributed to any secondary DNS servers on serial change.
                                                </p>
                                                <p>
                                                    Also, serials are a nice way to check which changes have already
                                                    been propagated to root nameservers, etc.
                                                </p>
                                            </Popover>
                                            }
                                        >
                                        <i className="help-popover ion ion-ios-information-outline fa-fw" />
                                    </OverlayTrigger>
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
                                    <OverlayTrigger
                                        trigger='hover'
                                        rootClose={true}
                                        placement='right'
                                        overlay={
                                            <Popover title='Refresh'>
                                                <p>
                                                    <span className="label label-primary">
                                                        RIPE-203 Recommendation: 86400s (1 day)
                                                    </span>
                                                </p>
                                                <p>
                                                    Time in seconds a secondary DNS server waits before querying the
                                                    primary DNS server's SOA record to check for changes.
                                                </p>
                                                <p>
                                                    When the refresh time expires, the secondary DNS server requests a
                                                    copy of the current SOA record from the primary. Afterwards, the
                                                    secondary DNS server compares the serial numbers. If they are
                                                    different, the secondary DNS server will request an AXFR.
                                                </p>
                                            </Popover>
                                            }
                                        >
                                        <i className="help-popover ion ion-ios-information-outline fa-fw" />
                                    </OverlayTrigger>
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
                                    <OverlayTrigger
                                        trigger='hover'
                                        rootClose={true}
                                        placement='right'
                                        overlay={
                                            <Popover title='Expire'>
                                                <p>
                                                    <span className="label label-primary">
                                                        RIPE-203 Recommendation: 3,600,000s (1,000 hours)
                                                    </span>
                                                </p>
                                                <p>
                                                    Time in seconds that a secondary NS will keep trying to complete an
                                                    AXFR. If this time expires prior to a successful zone transfer, the
                                                    secondary NS will expire its own zone file. This means the secondary
                                                    will stop answering queries, as it considers its data too old to be
                                                    reliable.
                                                </p>
                                            </Popover>
                                            }
                                        >
                                        <i className="help-popover ion ion-ios-information-outline fa-fw" />
                                    </OverlayTrigger>
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

                                <dt>Notified Serial</dt>
                                <dd>
                                    <Input
                                        type='text'
                                        defaultValue={this.props.zone.notifiedSerial}
                                        ref='notifiedSerial'
                                        disabled={true}
                                    />
                                </dd>

                                <dt>
                                    <OverlayTrigger
                                        trigger='hover'
                                        rootClose={true}
                                        placement='right'
                                        overlay={
                                            <Popover title='Retry'>
                                                <p>
                                                    <span className="label label-primary">
                                                        RIPE-203 Recommendation: 7200s (2 hours)
                                                    </span>
                                                </p>
                                                <p>
                                                    Time in seconds a secondary NS waits before retrying a failed AXFR.
                                                    Normally, the retry time should be less than the refresh time.
                                                </p>
                                            </Popover>
                                            }
                                        >
                                        <i className="help-popover ion ion-ios-information-outline fa-fw" />
                                    </OverlayTrigger>
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
                                    <OverlayTrigger
                                        trigger='hover'
                                        rootClose={true}
                                        placement='right'
                                        overlay={
                                            <Popover title='Minimum TTL'>
                                                <p>
                                                    <span className="label label-primary">
                                                        RIPE-203 Recommendation: 172,800s (2 days)
                                                    </span>
                                                </p>
                                                <p>
                                                    This field requires special attention since how it's interpreted
                                                    depends on the DNS server you are using:
                                                </p>
                                                <ul>
                                                    <li>
                                                        Defines the minimum time in seconds that a resource record
                                                        should be cached by any name server.  Though this was the
                                                        original meaning of this field (and it still retains the name
                                                        from this meaning), it was never actually used this way by most
                                                        name servers. <em>This meaning is now officially deprecated.</em>
                                                    </li>
                                                    <li>
                                                        Defines the default Time To Live (TTL) for all resource records
                                                        that do not have an explicit TTL.  This only applies to the zone
                                                        file on the primary name server since a zone transfer to the
                                                        secondary server adds the explicit TTL to the resource record if
                                                        it is missing.  Versions of BIND prior to 8.2 use the MINIMUM
                                                        field as the default TTL for all resource records, as do all
                                                        versions of Windows DNS Server.
                                                    </li>
                                                    <li>
                                                        Defines the time in seconds that any name server or resolver
                                                        should cache a negative response. <strong>This is now the official
                                                        meaning of this field as set by RFC 2308.</strong>
                                                    </li>
                                                </ul>
                                                <p>
                                                    Unlike all the other SOA fields, this one effects every name server
                                                    or resolver that queries your domain.
                                                    If your DNS server is compliant with RFC 2308, then this field only
                                                    applies to how long a negative response (that is, for a query where
                                                    no resource record is found) is cached. But if your DNS server uses
                                                    this as the default TTL for resource records without an explicit
                                                    TTL, then it controls how long any response could be cached by a
                                                    name server.
                                                </p>
                                                <p>
                                                    If you make this too long, then name servers and resolvers will keep
                                                    using their cached result even after all the secondary name servers
                                                    have updated their zone files.  And there is no method available for
                                                    you to force these name servers and resolvers to flush their cache.
                                                    Again, if your DNS server is compliant with RFC 2308, it only applies
                                                    to negative responses.  But if not, then all resource records without
                                                    an explicit TTL will use this value as the default TTL. If you were
                                                    to set this to 1 week (604800 seconds), then it could take up to a
                                                    week for any change to finally be seen everywhere on the Internet.
                                                </p>
                                            </Popover>
                                            }
                                        >
                                        <i className="help-popover ion ion-ios-information-outline fa-fw" />
                                    </OverlayTrigger>
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
