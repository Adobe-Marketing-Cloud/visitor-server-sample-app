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

const HeadWithVisitorAPI = ({ serverState, scriptURL }) => {
    return (
        <head>
            <title>Visitor JS Server Sample APP - Using VisitorAPI</title>
            <link rel="stylesheet" href="/css/styles.css" />
            
            <script src={scriptURL} />
            
            <script dangerouslySetInnerHTML={{__html: `
                var orgId = '35860E205658606B7F000101';
                var visitor = Visitor.getInstance(orgId, {
                    serverState: ` + JSON.stringify(serverState) + `
                });
            `}} />
        </head>
    );
};

module.exports = HeadWithVisitorAPI;
