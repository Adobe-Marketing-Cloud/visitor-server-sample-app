require("babel-register")({
    presets: ["react"]
});

var React = require("react");
var HomeComponent = React.createFactory(require("../../components/home.jsx"));

var cookie = require("cookie");
var fetchTargetedContent = require("../gateways/fetchTargetedContent");

var config = require("../../config.json");

// 1. Require Visitor:
var Visitor = require("@adobe-mcid/visitor-js-server");
var AuthState = Visitor.AuthState; // AuthState enum to be used to set Customer IDS.

var stringify = require("../utils").stringify;
var generatePage = require("../utils").generatePage;

module.exports = (HeadComponent, scriptUrl) => (req, res) => {
    // 2. Instantiate Visitor by passing your Org ID:
    var visitor = new Visitor(config.imsOrgID);
    var cookies = cookie.parse(req.headers.cookie || "");
    var cookieName = visitor.getCookieName();
    var amcvCookie = cookies[cookieName];

    var generateHomePage = generatePage(HomeComponent, HeadComponent, scriptUrl);

    // 3. Optionally, set custom Customer IDS:
    visitor.setCustomerIDs({
        userid: {
            id: "1234567890",
            authState: AuthState.UNKNOWN
        }
    });

    // 5. Call target by mixing in Visitor Payload with other info needed by Target API call:
    fetchTargetedContent(visitor, amcvCookie, function (content) {

        // 6. Get Visitor's state and share it with the client side VisitorAPI library:
        var serverState = visitor.getState();

        // NOTE: Open /components/Home.jsx and look at the script tags in the head.
        var pageHtml = generateHomePage(stringify(serverState), stringify(content.payloads), content);
        
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
}
