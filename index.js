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
require("babel-register")({
    presets: ["react"]
});

var React = require("react");
var express = require("express");
var app = express();
var makeHomeRoute = require("./src/routes/home");
var makeMultipleMboxesRoute = require("./src/routes/multipleMboxes");
var HeadWithDTM = React.createFactory(require("./components/HeadWithDTM.jsx"));
var HeadWithVisitorAPI = React.createFactory(require("./components/HeadWithVisitorAPI.jsx"));

const PORT = process.env.PORT || 5000;
const VISITORAPI_URL = "/js/VisitorAPI.js";

app.use(express.static("public"));

// NOTE: Check config.json to figure out if we are using DTM or not.

// TODO Move to factory!
var config = require("./config.json");
var scriptURL = config.enableDTM ? config.dtmTagUrl : VISITORAPI_URL;
var HeadComponent = config.enableDTM ? HeadWithDTM : HeadWithVisitorAPI

app.get("/", makeHomeRoute(HeadComponent, scriptURL));
app.get("/multiple", makeMultipleMboxesRoute(HeadComponent, scriptURL));

app.listen(PORT, function () {
    console.log("Visitor Server Sample App is Running on Port", PORT);
});
