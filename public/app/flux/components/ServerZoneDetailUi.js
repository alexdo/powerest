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
            var soaRecord = _.find(this.state.zone.records, zone => zone.type.toUpperCase() === 'SOA');

            return (
                <div className="row">
                    <div className="col-xs-12">
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
                                            <dd>{soaRecord.primaryMaster}</dd>

                                            <dt>Serial</dt>
                                            <dd>{soaRecord.serial}</dd>

                                            <dt>Refresh</dt>
                                            <dd>{soaRecord.refresh}</dd>

                                            <dt>Expire</dt>
                                            <dd>{soaRecord.expire}</dd>
                                        </dl>
                                    </div>
                                    <div className="col-sm-6 col-xs-12">
                                        <dl className="dl-horizontal">
                                            <dt>Operator Email</dt>
                                            <dd>{soaRecord.email}</dd>

                                            <dt>Notified Serial</dt>
                                            <dd>{this.state.zone.notifiedSerial}</dd>

                                            <dt>Retry</dt>
                                            <dd>{soaRecord.retry}</dd>

                                            <dt>Minimum TTL</dt>
                                            <dd>{soaRecord.minTtl}</dd>
                                        </dl>
                                    </div>
                                </div>
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
