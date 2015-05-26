const ServerZoneSoaHelp = React.createClass({
    getInitialState() {
        return {
            key: 'primaryMaster'
        };
    },

    handleSelect(key) {
        this.setState({key});
    },

    classFor(key, prefix = '') {
        if (this.state.key === key) {
            return prefix + ' active';
        } else {
            return prefix;
        }
    },

    componentDidMount() {
        $.AdminLTE.boxWidget.activate();
        $(document).bind('soaHelp', this.openHelpTab);
    },

    componentWillUnmount() {
        $(document).unbind('soaHelp', this.openHelpTab);
    },

    openHelpTab(event) {
        var $trigger = $(event.target);
        var tabName = $trigger.data('tabName');

        if ($('#soaHelp').hasClass('collapsed-box')) {
            $.AdminLTE.boxWidget.collapse($('#openSoaHelp'));
        }

        this.setState({key: tabName});
    },

    /**
     * @return {object}
     */
    render() {
        return (
            <div className="box box-info collapsed-box" id="soaHelp">
                <div className="box-header">
                    <h3 className="box-title" data-widget="collapse">
                        <i className="fa-fw ion ion-help-circled" />
                        About SOA record structure
                    </h3>
                    <div className="box-tools pull-right">
                        <button id="openSoaHelp" className="btn btn-box-tool" data-widget="collapse">
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                </div>
                <div className="box-body">
                    <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                            <li className={this.classFor('primaryMaster')}>
                                <a
                                    href="#helpPrimaryMaster"
                                    data-toggle="tab"
                                    onClick={this.handleSelect.bind(this, 'primaryMaster')}
                                >
                                    Primary Master
                                </a>
                            </li>
                            <li className={this.classFor('email')}>
                                <a
                                    href="#helpEmail"
                                    data-toggle="tab"
                                    onClick={this.handleSelect.bind(this, 'email')}
                                >
                                    Contact Email
                                </a>
                            </li>
                            <li className={this.classFor('serial')}>
                                <a
                                    href="#helpSerial"
                                    data-toggle="tab"
                                    onClick={this.handleSelect.bind(this, 'serial')}
                                >
                                    Serial / Notified Serial
                                </a>
                            </li>
                            <li className={this.classFor('refresh')}>
                                <a
                                    href="#helpRefresh"
                                    data-toggle="tab"
                                    onClick={this.handleSelect.bind(this, 'refresh')}
                                >
                                    Refresh
                                </a>
                            </li>
                            <li className={this.classFor('retry')}>
                                <a
                                    href="#helpRetry"
                                    data-toggle="tab"
                                    onClick={this.handleSelect.bind(this, 'retry')}
                                >
                                    Retry
                                </a>
                            </li>
                            <li className={this.classFor('expire')}>
                                <a
                                    href="#helpExpire"
                                    data-toggle="tab"
                                    onClick={this.handleSelect.bind(this, 'expire')}
                                >
                                    Expire
                                </a>
                            </li>
                            <li className={this.classFor('minTtl')}>
                                <a
                                    href="#helpMinTtl"
                                    data-toggle="tab"
                                    onClick={this.handleSelect.bind(this, 'minTtl')}
                                >
                                    Minimum TTL
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className={this.classFor('primaryMaster', 'tab-pane')} id="helpPrimaryMaster">
                                <p>
                                    Fully-qualified domain name of the primary or master name server for the zone file.
                                </p>
                                <p>
                                    Within the structure of DNS, there can only be one server that holds the master,
                                    editable zone file. All secondary name servers create their zone files by
                                    transferring the contents from the primary name server.
                                    Changes to the domain's resource records are made to the primary name server's
                                    zone file and are then propagated to the secondary name servers when they check
                                    for updates.
                                </p>
                                <p>
                                    However, in practice, the Primary Master is of almost no relevance as it only defines
                                </p>
                                <ul className="unstyled">
                                    <li>to whom dynamic updates are sent (DynDNS) and</li>
                                    <li>which nameserver should not receive NOTIFYs for this zone.</li>
                                </ul>
                            </div>
                            <div className={this.classFor('email', 'tab-pane')} id="helpEmail">
                                <p>
                                    Email address of the person responsible for the domain's zone file. Often it will
                                    be an alias or group address rather than a particular idividual.
                                </p>
                                <p>
                                    Normally, this email address has to be in a custom format. Fortunately, you can just
                                    enter a normal email address here and Powerest takes care of the rest.
                                </p>
                            </div>
                            <div className={this.classFor('serial', 'tab-pane')} id="helpSerial">
                                <p>
                                    <b>Serial number</b>
                                    of the zone file that is incremented each time a change is made.
                                    The secondary name servers compare the serial number returned by the primary name
                                    server with the serial number in their copy of the zone file to determine if they
                                    should update their zone file.  If the serial number from the primary name server
                                    is greater than their serial number, they will do a zone update transfer.
                                </p>
                                <p>
                                    Changing a zone in Powerest will automatically increase the serial, so you don't have
                                    to worry about it. Afterwards, PowerDNS will send a NOTIFY to all nameservers of your
                                    zone. The serial which were used to NOTIFY secondary nameserver is listed here as
                                    <b> Notified Serial</b>
                                </p>
                                <p>
                                    It's recommended to use the format YYYYMMDDNN, where YYYY is the year, MM is the
                                    month, DD is the day, and NN is an increasing number, starting with 01.
                                </p>
                            </div>
                            <div className={this.classFor('refresh', 'tab-pane')} id="helpRefresh">
                                <p>
                                    <span className="label label-primary">
                                        RIPE-203 Recommendation: 86,400s (1 day)
                                    </span>
                                </p>
                                <p>
                                    Time in seconds a secondary DNS server waits before querying the primary DNS
                                    server's SOA record to check for changes. The value should not be so short that the
                                    primary name server is overwhelmed by update checks and not so long that
                                    propagation of changes to the secondary name servers are unduely delayed.
                                </p>
                                <p>
                                    If you control the secondary name
                                    servers and the zone file doesn't change that often, then you might want to set
                                    this to as long as day (86400 seconds), especially if you can force an update
                                    on the secondary name servers if needed. But if your secondary name servers are
                                    not under your control, then you'll probably want to set this to somewhere
                                    between 30 minutes (1800 seconds) and 2 hours (7200 seconds) to ensure any
                                    changes you make are propagated in a timely fashion.
                                </p>
                                <p>
                                    Even with PowerDNS sending NOTIFYs, you should never completely depend on this to
                                    ensure timely propagation of the changes, especially when using third-party
                                    secondary name servers. The decision to honor a NOTIFY message is entirely up to
                                    the secondary name server and some DNS servers do not support NOTIFY.
                                </p>
                            </div>
                            <div className={this.classFor('retry', 'tab-pane')} id="helpRetry">
                                <p>
                                    <span className="label label-primary">
                                        RIPE-203 Recommendation: 7200s (2 hours)
                                    </span>
                                </p>
                                <p>
                                    Time in seconds that a secondary name server should wait before retrying a failed
                                    AXFR.
                                </p>
                                <p>
                                    There are all kinds of reasons why a zone file update check could fail, and not all
                                    of them mean that there is something wrong with the primary name server. Perhaps it
                                    was too busy handling other requests just then. The Retry Interval simply tells the
                                    secondary name server to wait for a period of time before trying again.
                                    A good retry value would be between 10 minutes (600 seconds) and 1 hour (3600 seconds),
                                    depending on the length of the Refresh Interval.
                                </p>
                                <p>
                                    The retry interval should always be shorter than the refresh interval. But don't make
                                    this value too short. When in doubt, use a 15 minute (900 second) retry interval.
                                </p>
                            </div>
                            <div className={this.classFor('expire', 'tab-pane')} id="helpExpire">
                                <p>
                                    <span className="label label-primary">
                                        RIPE-203 Recommendation: 3,600,000s (1,000 hours)
                                    </span>
                                </p>
                                <p>
                                    Time in seconds that a secondary name server will treat its zone file as valid when
                                    the primary name server cannot be contacted. If your primary name server goes offline
                                    for some reason, you want the secondary name names to keep answering DNS queries for
                                    your domain until you can get the primary back online. Make this value too short and
                                    your domain will disapear from the Internet before you can bring the primary back
                                    online.
                                </p>
                                <p>
                                    If you stop using a domain and delete it from the configuration of the primary name
                                    server, remember to remove it from the secondary name servers as well. This is
                                    especially important if you use third-party secondary name servers since they will
                                    continue to answer queries for the deleted domain — answers which could now be
                                    completely incorrect — until the expiry interval is reached.
                                </p>
                            </div>
                            <div className={this.classFor('minTtl', 'tab-pane')} id="helpMinTtl">
                                <p>
                                    <span className="label label-primary">
                                        RIPE-203 Recommendation: 172,800s (2 days)
                                    </span>
                                </p>
                                <p>
                                    This field requires special attention since how it's interpreted depends on the DNS
                                    server you are using. There have been three possible meanings for the MINIMUM field:
                                </p>
                                <ul>
                                    <li>
                                        Defines the minimum time in seconds that a resource record should be cached by
                                        any name server. Though this was the original meaning of this field (and it
                                        still retains the name from this meaning), it was never actually used this
                                        way by most name servers.
                                        <b>This meaning is now officially deprecated.</b>
                                    </li>
                                    <li>
                                        Defines the default Time To Live (TTL) for all resource records that do not
                                        have an explicit TTL. This only applies to the zone file on the primary name
                                        server since a zone transfer to the secondary server adds the explicit TTL
                                        to the resource record if it is missing. Versions of BIND prior to 8.2 use
                                        the MINIMUM field as the default TTL for all resource records, as do all
                                        versions of Windows DNS Server.
                                    </li>
                                    <li>
                                        Defines the time in seconds that any name server or resolver should cache a
                                        negative response.
                                        <b>This is now the official meaning of this field as
                                            set by RFC 2308.</b>
                                    </li>
                                </ul>
                                <p>
                                    Unlike all the other SOA fields,
                                    <u>the Minimum TTL effects every name server or
                                        resolver that queries your domain</u>
                                    . If your DNS server is compliant with RFC
                                    2308, then this field only applies to how long a negative response (that is, for
                                    a query where no resource record is found) is cached. But if your DNS server uses
                                    this as the default TTL for resource records without an explicit TTL, then it
                                    controls how long any response could be cached by a name server.
                                </p>
                                <p>
                                    If you make this too long, then name servers and resolvers will keep using their
                                    cached result even after all the secondary name servers have updated their zone
                                    files.  And there is no method available for you to force these name servers and
                                    resolvers to flush their cache.  Again, if your DNS server is compliant with RFC
                                    2308, it only applies to negative responses.  But if not, then all resource
                                    records without an explicit TTL will use this value as the default TTL. If you
                                    were to set this to 1 week (604800 seconds), then it could take up to a week
                                    for any change to finally be seen everywhere on the Internet.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = ServerZoneSoaHelp;


