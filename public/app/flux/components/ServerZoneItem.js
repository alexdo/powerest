var React = require('react');
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var ServerZoneActions = require('../actions/ServerZoneActions');

var ServerZoneItem = React.createClass({
    /**
     * @return {object}
     */
    render: function () {
        var dnssecIcon;
        var notifiedSerial;

        if (!!this.props.item.dnssec) {
            dnssecIcon = (<i className="ion ion-ios-locked text-green" data-toggle="tooltip" title="DNSSEC active" />)
        } else {
            dnssecIcon = (<i className="ion ion-ios-unlocked-outline text-muted" data-toggle="tooltip" title="DNSSEC inactive" />)
        }

        if (this.props.item.serial === this.props.item.notified_serial) {
            notifiedSerial = (
                <span className="text-green">
                    {this.props.item.notified_serial}
                    &nbsp;<i className="ion ion-checkmark" />
                </span>
            );
        } else {
            notifiedSerial = (
                <span className="text-yellow" data-toggle="tooltip" title="PowerDNS is notifying slaves about an updated zone.">
                    {this.props.item.notified_serial}
                    &nbsp;<i className="ion ion-loop fa-spin" />
                </span>
            );
        }

        return (
            <tr data-zone-id={this.props.item.id}>
                <td className="leading-icon">
                    {dnssecIcon}
                    <strong className="lg">{this.props.item.name}</strong>
                </td>
                <td>{this.props.item.serial}</td>
                <td>{notifiedSerial}</td>
                <td>{this.props.item.account}</td>
                <td>
                    <ButtonToolbar>
                        <ButtonGroup bsSize="small">
                            <a href="#" className="btn btn-primary btn-flat">
                                <i className="ion ion-edit" />
                            </a>
                            <a href="#" onClick={this._triggerNotify} className="btn btn-default btn-flat">
                                <i className="ion ion-loop" />
                            </a>
                        </ButtonGroup>
                        <ButtonGroup bsSize="small">
                            <a href="#" onClick={this._triggerDestroy} className="btn btn-danger btn-flat">
                                <i className="ion ion-trash-a" />
                            </a>
                        </ButtonGroup>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    },

    _triggerNotify: function (e) {
        e.preventDefault();
        var $btn = $(e.target).closest('.btn');

        if (!$btn.hasClass('disabled')) {
            ServerZoneActions.notify(this.props.item.id);
            $(e.target).closest('.btn').addClass('disabled');
        }
    },

    _triggerDestroy: function (e) {
        e.preventDefault();
        ServerZoneActions.destroy(this.props.item.id);
    }
});

module.exports = ServerZoneItem;
