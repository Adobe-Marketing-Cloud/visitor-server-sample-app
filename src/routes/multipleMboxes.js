
var React = require("react");
var cookie = require("cookie");

var MultipleMboxesComponent = React.createFactory(require("../../components/MultipleMboxes.jsx"));
var fetchMultipleMboxes = require("../gateways/fetchMultipleMboxes");

var config = require("../../config.json");

var stringify = require("../utils").stringify;
var generatePage = require("../utils").generatePage;

// 1. Require Visitor:
var Visitor = require("@adobe-mcid/visitor-js-server");

module.exports = (HeadComponent, scriptUrl) => (req, res) => {
    // 2. Instantiate Visitor by passing your Org ID:
    var visitor = new Visitor(config.imsOrgID);
    var cookies = cookie.parse(req.headers.cookie || "");
    var cookieName = visitor.getCookieName();
    var amcvCookie = cookies[cookieName];

    var generateMultipleMboxesPage = generatePage(MultipleMboxesComponent, HeadComponent, scriptUrl);
    
    fetchMultipleMboxes(visitor, amcvCookie, function (mboxes) {
        var pageContent = "No targeted content found!";
        var mboxResponses = mboxes.content;

        // 6. Get Visitor's state and share it with the client side VisitorAPI library:
        var serverState = visitor.getState();

        if (mboxResponses && mboxResponses.length) {
            pageContent = mboxResponses.reduce(function (c, mbox) {
                var offer = { name: mbox.name };
                
                if (mbox.offers && mbox.offers[0]) {
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
