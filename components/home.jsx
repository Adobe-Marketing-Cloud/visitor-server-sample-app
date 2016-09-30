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
const React = require("react");

const Home = ({ serverState, payload, content }) => {
    serverState = JSON.parse(serverState);
    payload = JSON.parse(payload);

    return (
        <html>
            <head>
                <title>Visitor JS Server Sample APP</title>
                <link rel="stylesheet" href="/css/styles.css" />
                <script src="/js/VisitorAPI.js" />
                {/* Share Visitor state with client side VisitorAPI: */}
                <script dangerouslySetInnerHTML={{__html: `
                    var orgId = '9E1005A551ED61CA0A490D45';
                    var visitor = Visitor.getInstance(orgId, {
                        serverState: ` + JSON.stringify(serverState) + `
                    });
                    console.log(visitor);
                    console.log('Payload:', ` + JSON.stringify(payload) + `);
                    console.log('Server State:', ` + JSON.stringify(serverState) + `);
                `}} />
            </head>
            <body>
                <div>
                    <h2>Server Side Rendering!</h2>
                    <h3>Visitor JS Server State:</h3>
                    <pre>{JSON.stringify(serverState, null, 4)}</pre>
                    <br/>
                    <h3>Visitor JS Server Payloads used to fetch the 3 Targeted Contents:</h3>
                    <pre>{JSON.stringify(payload, null, 4)}</pre>
                    <br/>
                    <h3>Targeted Content:</h3>
                    <pre>TOP LEFT: {content.topLeft}</pre>
                    <pre>CENTER: {content.center}</pre>
                    <pre>BOTTOM RIGHT: {content.bottomRight}</pre>
                </div>
            </body>
        </html>
    );
};

module.exports = Home;
