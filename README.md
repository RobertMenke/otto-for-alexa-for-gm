# This Repo Is
A Voice platform for GM vehicles using the Amazon Echo.

# Sample Functionality

Otto is an app for Alexa that can be triggered using the phrase, "Alexa, ask Otto...". Here are some of the things that Otto can do:

**Request**
> "Alexa, ask Otto if I need to get gas"

**Response**
> "You're getting low, you have just over a quarter tank of gas left"

**Request**
> "Alexa, ask Otto if I need an oil change"

**Response**
> "Wow. That's quite a drive, but your engine oil looks just fine!"

**Request**
> "Alexa, as Otto to set a course to Zach"

**Response**
> "I've located Zach and set your route guidance to him. Drive safely."

# Requirements

Node and NPM

Check out this blog from treehouse if you don't already have these [Installing Node and NPM](http://blog.teamtreehouse.com/install-node-js-npm-mac)


> To check if node is installed, open terminal and type `node -v`

> To check if npm is installed, open terminal and type `npm -v`

# Steps to get the code running

**Step 1**
```git
git clone https://github.com/RobertMenke/otto-for-alexa-for-gm.git
```

**Step 2**

Look at `/src/config.js`. Make sure you have the correct ARN and APP_ID.

**Step 3*

This application is meant to be paired with a small server that communicates between Alexa and GM. The server component can be found here https://github.com/saintpete/GMServer.

To run the server, run the `Connection.js` file through node located in the GMServer project root.

**Step 4**

To run the GM electron application, navigate to the `otto-for-alexa-for-gm` repo's project root. Type `ngi serve` into your terminal and press enter to start the application.

# Optional

To get the location of your friends, use the Otto Companion App, which is located here https://github.com/zackm0571/GE-Hack-A-thon-2017.