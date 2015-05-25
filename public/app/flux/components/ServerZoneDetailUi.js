var Config = require('../../config.js');

var ServerZoneStore = require('../stores/ServerZoneStore');
var ServerZoneSoaRecord = require('./ServerZoneSoaRecord');

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
                        <form id="zoneForm">
                            <ServerZoneSoaRecord
                                zone={this.state.zone}
                                record={_.find(this.state.zone.records, zone => zone.type.toUpperCase() === 'SOA')}
                                key={_.uniqueId('SOA_Record_')}
                            />
                        </form>
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
