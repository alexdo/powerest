var React = require('react');

var ServerConfigItem = React.createClass({
    /**
     * @return {object}
     */
    render: function() {
        return (
            <tr>
                <td className="pre">{this.props.item.name}</td>
                <td className="wrap-content pre">{this.props.item.value}</td>
            </tr>
        );
    }
});

module.exports = ServerConfigItem;
