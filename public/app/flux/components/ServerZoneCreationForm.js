var React = require('react');
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var ServerZoneActions = require('../actions/ServerZoneActions');

var ENTER_KEY_CODE = 13;

var ServerZoneCreationForm = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },

    /**
     * @return {object}
     */
    render: function () {
        return (
            <div className="input-group input-group-lg">
                <input type="text" className="form-control"
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    value={this.state.value}
                />
                <span className="input-group-btn">
                    <button className="btn btn-success btn-flat icon-left" type="button" onClick={this._save}>
                        <i className="ion ion-ios-plus-outline" />
                        Create
                    </button>
                </span>
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

module.exports = ServerZoneCreationForm;
