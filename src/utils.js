var React = require("react");
var ReactDOMServer = require("react-dom/server");

exports.stringify = function (obj) {
    return obj ? JSON.stringify(obj) : "";
};

exports.generatePage = (Component, Head, scriptURL) => (state, payload, content) => {
    var html = ReactDOMServer.renderToString(
        React.createElement(Component, { serverState: state, payload, content, Head, scriptURL })
    );
    
    return html;
}
