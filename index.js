require("babel-register")({
    presets: ["react"]
});

var cookie = require("cookie");
var request = require("request");
var express = require("express");
var app = express();
var config = require("./config.json");

var React = require("react");
var ReactDOMServer = require("react-dom/server");
var HomeComponent = React.createFactory(require("./components/home.jsx"));

// 1. Require Visitor:
var Visitor = require("@adobe-mcid/visitor-js-server");
var AuthState = Visitor.AuthState; // AuthState enum to be used to set Customer IDS.

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

function stringify(obj) {
    return obj ? JSON.stringify(obj) : "";
}

function generatePage(state, payload, content) {
    var html = ReactDOMServer.renderToString(
        React.createElement(HomeComponent, { serverState: state, payload, content })
    );
    
    return html;
}

// MOCK call to target! Should be implemented by the customer:
function fetchTargetedContent(payload, callback) {
    
    payload.mbox = "GHS-target-global-mbox";
    
    payload.requestLocation = {
        "pageURL" : config.pageURL,
        "impressionId" : "1",
        "host" : config.host
    };

    payload.thirdPartyId = "2047337005";
    payload.tntId = "123455";

    request({
        url: config.url,
        qs: config.qs,
        method: "POST",
        json: payload
    }, function (error, response, body) {
        callback(body.content);
    });
}

app.get("/", function (req, res) {
    // 2. Instantiate Visitor by passing your Org ID:
    var visitor = new Visitor("9E1005A551ED61CA0A490D45@AdobeOrg");
    var cookies = cookie.parse(req.headers.cookie || "");
    var cookieName = visitor.getCookieName();
    var amcvCookie = cookies[cookieName];

    // 3. Optionally, set custom Customer IDS:
    visitor.setCustomerIDs({
        userid: {
            id: "1234567890",
            authState: AuthState.UNKNOWN
        }
    });

    // 3. Generate Visitor Payload by passing consumerID (mbox name/id) and AMCV Cookie if found in Req:
    var visitorPayload = visitor.generatePayload({ consumerID: "GHS-target-global-mbox", amcvCookie: amcvCookie });

    // 4. Call target by mixing in Visitor Payload with other info needed by Target API call:
    fetchTargetedContent(visitorPayload, function (content) {

        // 5. Get Visitor's state and share it with the client side VisitorAPI library:
        var serverState = visitor.getState();

        var pageHtml = generatePage(stringify(serverState), stringify(visitorPayload), content);
        
        // MOCK: Create AMCV cookie! This would be done by the VisitorAPI.js client side!!
        if (!amcvCookie) {
            var oneWeekInSecond = 60 * 60 * 24 * 7;
            res.cookie(cookieName, "MCMID-2167743609|1234|MCAAMB|abcd1234|MCAAMLH|9", { maxAge: oneWeekInSecond });
        }

        res.set({
            "Content-Type": "text/html",
            "Content-Length": pageHtml.length,
            "Expires": new Date().toUTCString()
        });

        res.status(200).send(pageHtml);
    });
});

app.listen(PORT, function () {
    console.log("Visitor Server Sample App is Running on port", PORT);
});
