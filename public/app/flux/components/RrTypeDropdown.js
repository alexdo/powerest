const RrTypes = require('../constants/RecordTypeConstants');

/**
 * Possible props:
 *
 * string   selectedValue  Preselected Value. has to match a rr type.
 * string   id             DOM Id of the rendered <select>
 * array    limitTypes     Array of strings. Can control which RR types are chooseable.
 * string   className      String of classes to apply to <select>
 * string   ref            React ref attribut of the select
 * function onChange       Custom onChange handler. Receives this and the new state ({object} this, {object} newState)
 */
const RrTypeDropdown = React.createClass({
    getInitialState() {
        return {
            selected: this.props.selectedValue || null
        }
    },

    getOptions() {
        return _.map(this.getAllowedTypes(), (type) => {
            var isSelected = this.state.selectedValue === type.toUpperCase();
            if(isSelected) {
                return (<option key={type} value={type} selected="selected">{type}</option>);
            } else {
                return (<option key={type} value={type}>{type}</option>);
            }
        })
    },

    getId() {
        if (_.isEmpty(this.props.id) && _.isEmpty(this._defaultId)) {
            this._defaultId = _.uniqueId('type_dropdown_')
        }

        return this.props.id || this._defaultId;
    },

    getAllowedTypes() {
        var that = this;
        var types = RrTypes;

        if (this.props.limitTypes && _.isArray(this.props.limitTypes)) {
            types = _.filter(RrTypes, (type) => _.includes(that.props.limitTypes, type));
        }

        return types;
    },

    getClasses() {
        var classes = this.props.className || '';
        classes += ' rr-dropdown';
        return classes;
    },

    getRef() {
        return this.props.ref || this.getId();
    },

    _handleChange(e) {
        var ref = this.getRef();
        var newState = {
            selected: this.refs[ref].getDOMNode().value
        };

        if(_.isFunction(this.props.onChange)) {
            this.props.onChange(this, newState);
        }

        this.setState(newState);
    },

    componentDidMount() {
        $('#' + this.getId()).select2();
    },

    componentWillUnmount() {
        $('#' + this.getId()).select2('destroy');
    },

    render() {
        return (
            <select id={this.getId()} className={this.getClasses()} ref={this.getRef()}
                onChange={this._handleChange} style={{width: '100%'}}>
                {this.getOptions()}
            </select>
        );
    }
});

module.exports = RrTypeDropdown;
