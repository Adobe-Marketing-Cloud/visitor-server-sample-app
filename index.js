var cookie = require("cookie");
var express = require("express");
var app = express();

var Visitor = require("visitor-js-server");
var visitor = new Visitor();

function generatePage(state) {
    var head = "<script>var visitorServerState = " + state + ";</script>";
    return "<html><head>" + head + "</head><body><h1>Share server state with client: " + state + "</h1></body>";
}

app.get("/", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie || "");
    var amcvCookie = cookies.AMCV;

    // Target Payload: Either a SDID if no AMCV, othewise parse the cookie content into an object.
    var visitorPayload = visitor.generateVisitorPayload(amcvCookie);
    // TODO Here: Make Target call by passing the target payload.

    var pageHtml = generatePage(JSON.stringify(visitorPayload));
    
    // MOCK: Create AMCV cookie! This would be done by the VisitorAPI.js client side!!
    if (!amcvCookie) {
        var oneWeekInSecond = 60 * 60 * 24 * 7;
        res.cookie("AMCV", "MCMID|1234|MCAAMB|abcd1234|MCAAMLH|9", { maxAge: oneWeekInSecond });
    }

    res.set({
        "Content-Type": "text/html",
        "Content-Length": pageHtml.length,
        "Expires": new Date().toUTCString()
    });

    res.status(200).send(pageHtml);
});

app.listen(process.env.PORT || 5000, function () {
    console.log("Listening on port 3000!");
});
