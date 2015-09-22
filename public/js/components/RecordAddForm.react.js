var React = require('react'); var VegaDNSActions = require('../actions/VegaDNSActions');
var VegaDNSActions = require('../actions/VegaDNSActions');

var RecordAddForm = React.createClass({
    getInitialState: function() {
        return {
            'record_type': "A",
            'name': "",
            'value': "",
            'distance': "",
            'weight': "",
            'port': "",
            'ttl': 3600,
        }
    },

    handleChange: function(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },

    addRecord: function(e) {
        e.preventDefault();

        var payload = {} 
        for (var key in this.state) {
            payload[key] = this.state[key];
        }
        payload["domain_id"] = this.props.domain.domain_id;
        VegaDNSActions.addRecord(payload);
    },

    render: function() {
        var distance =
                    <div className="form-group">
                        <label htmlFor="distance" className="col-sm-4 control-label">Distance/Priority</label>
                        <div className="col-sm-2">
                            <input onChange={this.handleChange.bind(this, 'distance')} className="form-control" id="distance" placeholder="10" />
                        </div>
                    </div>
        var weight =
                    <div className="form-group">
                        <label htmlFor="weight" className="col-sm-4 control-label">Weight</label>
                        <div className="col-sm-2">
                            <input onChange={this.handleChange.bind(this, 'weight')} className="form-control" id="weight" />
                        </div>
                    </div>
        var port =
                    <div className="form-group">
                        <label htmlFor="port" className="col-sm-4 control-label">Port</label>
                        <div className="col-sm-2">
                            <input onChange={this.handleChange.bind(this, 'port')} className="form-control" id="port" />
                        </div>
                    </div>


        return (
            <section id="add_record">
                <h3 className="text-center">Create a new resource record for domain "{this.props.domain.domain}"</h3>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="record_type" className="col-sm-4 control-label">RR Type</label>
                        <div className="col-sm-2">
                            <select id="record_type" onChange={this.handleChange.bind(this, 'record_type')} className="form-control" value={this.state.record_type}>
                                <option value="A">A</option>
                                <option value="A+PTR">A+PTR</option>
                                <option value="AAAA">AAAA</option>
                                <option value="AAAA+PTR">AAAA+PTR</option>
                                <option value="NS">NS</option>
                                <option value="MX">MX</option>
                                <option value="PTR">PTR</option>
                                <option value="TXT">TXT</option>
                                <option value="CNAME">CNAME</option>
                                <option value="SRV">SRV</option>
                                <option value="SPF">SPF</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="col-sm-4 control-label">Hostname</label>
                        <div className="col-sm-8">
                            <input onChange={this.handleChange.bind(this, 'name')} className="form-control" id="name" placeholder={"foo." + this.props.domain.domain} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="value" className="col-sm-4 control-label">Value (target)</label>
                        <div className="col-sm-8">
                            <input onChange={this.handleChange.bind(this, 'value')} className="form-control" id="value" placeholder="1.2.3.4" />
                        </div>
                    </div>
                    {["MX", "SRV"].indexOf(this.state.record_type) > -1 ? distance : null}
                    {this.state.record_type == "SRV" ? weight : null}
                    {this.state.record_type == "SRV" ? port : null}
                    <div className="form-group">
                        <label htmlFor="ttl" className="col-sm-4 control-label">TTL</label>
                        <div className="col-sm-2">
                            <input onChange={this.handleChange.bind(this, 'ttl')} className="form-control" id="ttl" value={this.state.ttl} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-8">
                            <button type="submit" onClick={this.addRecord} className="btn btn-success">Create</button>
                            &nbsp;
                            <button type="submit" onClick={this.props.hideCallback} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </form>
            </section>
        );
    }
});

module.exports = RecordAddForm;