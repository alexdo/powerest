var ButtonGroup = require('react-bootstrap').ButtonGroup;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var ServerZoneActions = require('../actions/ServerZoneActions');

var ServerZoneSoaRecord = React.createClass({
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
                                <dd>{this.props.record.primaryMaster}</dd>

                                <dt>Serial</dt>
                                <dd>{this.props.record.serial}</dd>

                                <dt>Refresh</dt>
                                <dd>{this.props.record.refresh}</dd>

                                <dt>Expire</dt>
                                <dd>{this.props.record.expire}</dd>
                            </dl>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <dl className="dl-horizontal">
                                <dt>Operator Email</dt>
                                <dd>{this.props.record.email}</dd>

                                <dt>Notified Serial</dt>
                                <dd>{this.props.zone.notifiedSerial}</dd>

                                <dt>Retry</dt>
                                <dd>{this.props.record.retry}</dd>

                                <dt>Minimum TTL</dt>
                                <dd>{this.props.record.minTtl}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ServerZoneSoaRecord;
