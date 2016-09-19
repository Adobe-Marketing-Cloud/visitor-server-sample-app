const React = require("react");

const Home = ({ serverState, payload, content }) => {
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
                    <h2>Server Side Rendering!</h2>
                    <h3>Visitor JS Server State:</h3>
                    <pre>{JSON.stringify(serverState, null, 4)}</pre>
                    <br/>
                    <h3>Visitor JS Server Payload:</h3>
                    <pre>{JSON.stringify(payload, null, 4)}</pre>
                    <br/>
                    <h3>Targeted Content:</h3>
                    <pre>{content}</pre>
                </div>

                <script src="/js/VisitorAPI.js" />
                <script dangerouslySetInnerHTML={{__html: `
                    var orgId = '9E1005A551ED61CA0A490D45';
                    var visitor = Visitor.getInstance(orgId, {
                        serverState: ` + JSON.stringify(serverState) + `
                    });
                    console.log(visitor);
                    console.log(` + JSON.stringify(payload) + `);
                `}} />
            </body>
        </html>
    );
};

module.exports = Home;
