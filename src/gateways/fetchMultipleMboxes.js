 /**
 * Copyright 2016 Adobe Systems, Inc. http://www.adobe.com
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var reqPromise = require('request-promise');
var config = require("./config.json");

// MOCK call to target! Should be implemented by the customer. Make sure to update config.js
// with your own information.
module.exports = function fetchMultipleMboxes(visitor, amcvCookie, callback) {
    var targetPayload = {
        thirdPartyId: "2047337005",
        tntId: "123455",
        imsOrgId: "E4860C0F53CE56C40A490D45@AdobeOrg",
        apiClientId: "tescostoresltd",
        mboxRequests: [
            Object.assign({ name: "adobe-top-left-banner-mbox" }, visitorPayload),
            { name:  "adobe-center-body-banner-mbox" },
            { name: "adobe-bottom-right-nav-mbox" }
        ]
    };

    var visitorPayload = visitor.generatePayload({ 
        sdidConsumerID: "servertesco",
        amcvCookie: amcvCookie 
    });

    // var fullPayload = Object.assign({}, targetPayload, visitorPayload);

    
    return reqPromise({
                url: config.batchUrl,
                qs: config.qs,
                method: "POST",
                json: targetPayload
            })
            .then((content) => {
                console.log("THEN:", content.mboxResponses)
                callback(content.mboxResponses);
            }).catch(function (err) {
                console.error("An error has occured fetching multiple mboxes:", err);
            });
}
