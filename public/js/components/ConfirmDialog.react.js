var React = require('react');
var createClass = require('create-react-class');
var VegaDNSActions = require('../actions/VegaDNSActions');

var ConfirmDialog = createClass({
    render: function() {
        return (
            <span>
                <strong>{this.props.confirmText}</strong><br />
                <button type="submit" onClick={this.props.confirmCallback} className="btn btn-success">OK</button>
                &nbsp;
                <button type="submit" onClick={this.props.cancelCallback} className="btn btn-danger">Cancel</button>
            </span>
        );
    }
});

export default ConfirmDialog;
