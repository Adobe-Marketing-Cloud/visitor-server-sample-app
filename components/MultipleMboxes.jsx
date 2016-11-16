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

const MultipleMboxes = ({ serverState, payload, content, Head, scriptURL }) => {
    payload = JSON.parse(payload);

    return (
        <html>
            <Head scriptURL={scriptURL} serverState={serverState} />
            <body>
                <div>
                    <a href="/">Back</a>
                    <h2>Multiple mbox requests in the same call:</h2>
                    <br/>
                    <h3>Visitor JS Server + Target Payload used to fetch batch content:</h3>
                    <pre>{JSON.stringify(payload, null, 4)}</pre>
                    <br/>
                    <h3>Targeted Content:</h3>
                    {content.map(function (c) {
                        return (
                            <div>
                                <span>{c.name}</span>
                                <pre>{c.html}</pre>
                            </div>
                        );
                    })}
                </div>
            </body>
        </html>
    );
};

module.exports = MultipleMboxes;
