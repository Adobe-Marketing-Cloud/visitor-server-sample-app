
var cookie = require("cookie");
var fetchMultipleMboxes = require("../gateways/fetchMultipleMboxes");

// 1. Require Visitor:
var Visitor = require("@adobe-mcid/visitor-js-server");

module.exports = function multipleMboxesRoute(req, res) {
    // 2. Instantiate Visitor by passing your Org ID:
    var visitor = new Visitor("9E1005A551ED61CA0A490D45@AdobeOrg");
    var cookies = cookie.parse(req.headers.cookie || "");
    var cookieName = visitor.getCookieName();
    var amcvCookie = cookies[cookieName];

    fetchMultipleMboxes(visitor, amcvCookie, function (mboxResponses) {
        var pageContent = "No targeted content found!";

        if (mboxResponses && mboxResponses.length) {
            pageContent = mboxResponses.reduce(function (c, mbox) {
                var mboxOffer = mbox.offers[0] ? mbox.offers[0].html : "";
                c += mboxOffer;
                return c;
            }, "");
        }

        res.status(200).send(pageContent);
    });
}
