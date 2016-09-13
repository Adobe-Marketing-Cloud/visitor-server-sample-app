const React = require("react");

const Home = ({ serverState, payload }) => {
    serverState = JSON.parse(serverState);
    payload = JSON.parse(payload);
    return (
        <html>
            <head>
                <title>Visitor JS Server Sample APP</title>
                <link rel="stylesheet" href="/css/styles.css" />
            </head>
            <body>
                <div>
                    <h1>Server Side Rendering!</h1>
                    
                    <h3>Visitor JS Server State:</h3>
                    <pre>{JSON.stringify(serverState, null, 4)}</pre>
                    <br/>
                    <h3>Visitor JS Server Payload:</h3>
                    <pre>{JSON.stringify(payload, null, 4)}</pre>
                </div>

                <script src="/js/VisitorAPI.js" />
            </body>
        </html>
    );
};

module.exports = Home;
