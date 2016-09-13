require("babel-register")({
    presets: ["react"]
});

var cookie = require("cookie");
var express = require("express");
var app = express();

var React = require("react");
var ReactDOMServer = require("react-dom/server");
var HomeComponent = React.createFactory(require("./components/home.jsx"));

var Visitor = require("visitor-js-server");
var visitor = new Visitor("12345sampleapp");

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

function generatePage(state, payload) {
    var html = ReactDOMServer.renderToString(
        React.createElement(HomeComponent, { serverState: state, payload })
    );
    
    return html;
}

app.get("/", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie || "");
    var amcvCookie = cookies.AMCV;

    // Visitor ID Payload: Either a SDID if no AMCV, othewise parse the cookie content into an object.
    var visitorPayload = visitor.generateVisitorPayload(amcvCookie);
    // TODO Here: Make Target call by passing the visitor payload.

    var serverState = visitor.getState();

    var pageHtml = generatePage(JSON.stringify(serverState), JSON.stringify(visitorPayload));
    
    // MOCK: Create AMCV cookie! This would be done by the VisitorAPI.js client side!!
    if (!amcvCookie) {
        var oneWeekInSecond = 60 * 60 * 24 * 7;
        res.cookie("AMCV", "MCMID-3143515|1234|MCAAMB|abcd1234|MCAAMLH|9", { maxAge: oneWeekInSecond });
    }

    res.set({
        "Content-Type": "text/html",
        "Content-Length": pageHtml.length,
        "Expires": new Date().toUTCString()
    });

    res.status(200).send(pageHtml);
});

app.listen(PORT, function () {
    console.log("Visitor Server Sample App is Running on port", PORT);
});
