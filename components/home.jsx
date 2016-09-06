const React = require("react");

const Home = ({ serverState }) => {
    return (
        <html>
            <head>
                <title>Visitor JS Server Sample APP</title>
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <div>
                    <h1>React Server Side Rendering!</h1>
                    <h3>Share server state with client: {serverState}</h3>
                </div>
            </body>
        </html>
    );
};

module.exports = Home;
