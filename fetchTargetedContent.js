var reqPromise = require('request-promise');
var config = require("./config.json");

// MOCK call to target! Should be implemented by the customer. Make sure to update config.js
// with your own information.
module.exports = function fetchTargetedContent(visitor, amcvCookie, callback) {
    var targetPayload = {
            requestLocation: {
            "pageURL" : config.pageURL,
            "impressionId" : "1",
            "host" : config.host
        },
        thirdPartyId: "2047337005",
        tntId: "123455"
    };

    // Memoize payloads: This is simply informative, to be able to show them on the page.
    var payloads = {};

    function createRequestFor(mboxName) {
        return function () {
            // 4. Generate Visitor Payload by passing sdidConsumerID (mbox name/id) and AMCV Cookie if found in Req:
            var visitorPayload = visitor.generatePayload({ 
                sdidConsumerID: mboxName,
                amcvCookie: amcvCookie 
            });

            var fullPayload = Object.assign({}, targetPayload, { mbox: mboxName}, visitorPayload);
            payloads[mboxName] = fullPayload; 

            return reqPromise({
                url: config.url,
                qs: config.qs,
                method: "POST",
                json: fullPayload
            });
        };
    }

    var fetchTopLeftBanner = createRequestFor("adobe-top-left-banner-mbox");
    var fetchCenterBanner = createRequestFor("adobe-center-body-banner-mbox");
    var fetchBottomRightNav = createRequestFor("adobe-bottom-right-nav-mbox");
    
    return Promise.all([fetchTopLeftBanner(), fetchCenterBanner(), fetchBottomRightNav()])
                .then((content) => {
                    var [topLeft, center, bottomRight] = content;
                    callback({
                        topLeft: topLeft.content,
                        center: center.content,
                        bottomRight: center.content,
                        payloads
                    });
                }).catch(function (err) {
                    console.error("An error has occured, please try again.", err);
                });
}
