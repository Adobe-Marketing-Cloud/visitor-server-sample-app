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
var config = require("../../config.json");

// MOCK call to target! Should be implemented by the customer. Make sure to update config.js
// with your own information.
module.exports = function fetchMultipleMboxes(visitor, amcvCookie, callback) {
    
    // Use new `visitor.generateBatchPayload` to generate a payload compatible with Target Batch API:
    var visitorPayload = visitor.generateBatchPayload({ 
        sdidConsumerID: "servertesco",
        amcvCookie: amcvCookie,
        mboxNames: [
            "adobe-top-left-banner-mbox", "adobe-center-body-banner-mbox", "adobe-bottom-right-nav-mbox"
        ]
    });

    var targetPayload = {
        thirdPartyId: "2047337005",
        tntId: "123455",
        imsOrgId: config.imsOrgID,
        apiClientId: config.apiClientId
    };

    var fullPayload = Object.assign({}, targetPayload, visitorPayload);

    return reqPromise({
                url: config.batchUrl,
                qs: config.qs,
                method: "POST",
                json: fullPayload
            })
            .then((content) => {
                callback({
                    content: content.mboxResponses,
                    payload: fullPayload
                });
            })
            .catch(function (err) {
                console.error("An error has occured fetching multiple mboxes:", err);
            });
}
