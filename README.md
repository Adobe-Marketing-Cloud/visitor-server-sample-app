# Visitor sample app

An isomorphic sample app that implements `@adobe-mcid/visitor-js-server`.

## Features:

- Generate page on the server
- Implement Adobe Target server side to generate targeted content
- Implement `Visitor#generatePayload` to generate a stitch ID on the server
- Implement the optional `Visitor#setCustomerIDs` to add custom IDs
- Implement `Visitor#getState` to share Visitor state on the server with the client side VisitorAPI library. In this app we are showing the manual implementation of sharing the state. There's a DTM specific implementation below.
- We share the state with the client side VisitorAPI library to allow stitching the server-side Target call with the client-side Analytics hit.
- Makes multiple calls to Target for multiple mboxes.


## Share state with client side VisitorAPI if using DTM

Replace line 12 - 22 in /components/home.jsx with the following:

```
    <script dangerouslySetInnerHTML={{__html: "var serverState = " + JSON.stringify(serverState) }} />
    <script src="sattelite.js"/> // DTM script
```

And configure DTM to add a new setting:

`serverState = %serverState%`

## Run application

git clone git@github.com:Adobe-Marketing-Cloud/visitor-server-sample-app.git

`npm run start` in your terminal, open your browser and go to localhost:5000
