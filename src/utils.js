var React = require("react");
var ReactDOMServer = require("react-dom/server");

exports.stringify = function (obj) {
    return obj ? JSON.stringify(obj) : "";
};

exports.generatePage = (Component) => (state, payload, content) => {
    var html = ReactDOMServer.renderToString(
        React.createElement(Component, { serverState: state, payload, content })
    );
    
    return html;
}
