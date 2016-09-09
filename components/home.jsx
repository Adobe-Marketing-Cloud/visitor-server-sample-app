const React = require("react");

const Home = ({ serverState }) => {
    return (
        <html>
            <head>
                <title>Visitor JS Server Sample APP</title>
                <link rel="stylesheet" href="/css/styles.css" />
            </head>
            <body>
                <div>
                    <h1>Server Side Rendering!</h1>
                    <h3>Share server state with client: {serverState}</h3>
                </div>

                <script src="/js/VisitorAPI.js" />
            </body>
        </html>
    );
};

module.exports = Home;
