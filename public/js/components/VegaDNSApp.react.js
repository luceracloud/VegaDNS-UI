var React = require('react');
var LogInStore = require('../stores/LogInStore');
var LogIn = require('./LogIn.react');
var HeaderSection = require('./HeaderSection.react');
var Logo = require('./Logo.react');
var DomainList = require('./DomainList.react');
var RecordList = require('./RecordList.react');
var Menu = require('./Menu.react');

var VegaDNSApp = React.createClass({
    getInitialState: function() {
        return {
            loggedIn: false
        }
    },

    componentWillMount: function() {
        LogInStore.checkLoginState()
    },

    componentDidMount: function() {
        LogInStore.addChangeListener(this.onChange);
    },

    onChange() {
        this.setState({loggedIn: LogInStore.isLoggedIn()});
    },

    render: function() {
        if (this.state.loggedIn == false) {
            return (
            <div>
                <LogIn />
            </div>
            );
        } else {
            var Params = {};
            var Route = "";

            if (this.props.route != undefined) {
                var RouteParts = this.props.route.split("?");
                var Route = RouteParts[0];

                // Parse out faux query string within fragment
                if (RouteParts.length > 1) {
                    var Route = RouteParts[0];
                    var QueryString = RouteParts[1];

                    var Pairs = QueryString.split("&");
                    for (var i = 0; i < Pairs.length; i++) {
                        var pair = Pairs[i].split("=");
                        if (pair.length == 1) {
                            Params[pair[0]] = null;
                        } else {
                            Params[pair[0]] = pair[1];
                        }
                    }
                }
            }

            var Child;
            switch (Route) {
                case 'domains':
                    Child = DomainList;
                    break;
                case 'records':
                    Child = RecordList;
                    break;
                default:
                    Child = DomainList;
            }

            return (
                <div>
                    <section id="header">
                        <HeaderSection />
                    </section>
                    <section id="main">
                        <row>
                            <div>
                                <Menu />
                            </div>
                            <div>
                                <Logo />
                                <Child route={Route} params={Params}/>
                            </div>
                        </row>
                    </section>
                </div>
            );
        }
    }
});

module.exports = VegaDNSApp;
