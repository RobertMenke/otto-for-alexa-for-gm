# ChevyHitters
An Alexa app that interacts with GM vehicles

# Steps to get the code running

**Step 1**
```git
git clone https://github.com/RobertMenke/ChevyHitters.git
```

**Step 2**

Look at `/src/config.js`. Make sure you have the correct ARN and APP_ID.

**Step 3**

When you want you're done editing the code and want to upload it to your AWS lambda function, go to the project's directory in your terminal and type 

```bash
npm run build
```

This will generate a zip called alexa.app.zip that you can upload to AWS.