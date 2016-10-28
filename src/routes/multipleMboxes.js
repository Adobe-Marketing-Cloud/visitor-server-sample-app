
var React = require("react");
var cookie = require("cookie");

var MultipleMboxesComponent = React.createFactory(require("../../components/MultipleMboxes.jsx"));
var fetchMultipleMboxes = require("../gateways/fetchMultipleMboxes");

var stringify = require("../utils").stringify;
var generatePage = require("../utils").generatePage;

var generateMultipleMboxesPage = generatePage(MultipleMboxesComponent);


// 1. Require Visitor:
var Visitor = require("@adobe-mcid/visitor-js-server");

module.exports = function multipleMboxesRoute(req, res) {
    // 2. Instantiate Visitor by passing your Org ID:
    var visitor = new Visitor("9E1005A551ED61CA0A490D45@AdobeOrg");
    var cookies = cookie.parse(req.headers.cookie || "");
    var cookieName = visitor.getCookieName();
    var amcvCookie = cookies[cookieName];

    fetchMultipleMboxes(visitor, amcvCookie, function (mboxes) {
        var pageContent = "No targeted content found!";
        var mboxResponses = mboxes.content;

        // 6. Get Visitor's state and share it with the client side VisitorAPI library:
        var serverState = visitor.getState();

        if (mboxResponses && mboxResponses.length) {
            pageContent = mboxResponses.reduce(function (c, mbox) {
                var offer = { name: mbox.name };
                
                if (mbox.offers[0]) {
                    offer.html = mbox.offers[0].html;
                }
                
                c.push(offer);
                return c;
            }, []);
        }

        var pageHtml = generateMultipleMboxesPage(stringify(serverState), stringify(mboxes.payload), pageContent);

        res.status(200).send(pageHtml);
    });
}
