# Notes Management Tool – JavaScript Client

This is a Notes Management Tool written in JavaScript using the vue.js framework.

Note: This is the client only. You need the appropriate server which is hosted at <https://github.com/tbreuss/notes-api>.

## Install

Clone repo and install dependencies: 

    git clone https://github.com/tbreuss/notes-client.git
    cd notes-client
    npm install

## Config

Copy the example configuration files:

    cd config
    cp dev.dist.js dev.env.js
    cp prod.dist.js prod.env.js
    cp test.dist.js test.env.js

Open at least the `prod.env.js` file and add the API_URL.

## Run

    cd notes-client
    npm run dev
    
Open the URL <http://localhost:8080> with your web browser. You should see a login screen.

Please refer to the server documentation on how to add a valid user to the notes database.

## Demo

You can see a Demo running at: <https://notes.tebe.ch>  
Login details are "guest" with "guestguest".

## More npm commands

~~~bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
~~~
