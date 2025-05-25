# Twilio SMS Integration for Sisters Cafe

This document explains how to set up and deploy the Twilio SMS notification system for the Sisters Cafe online ordering system.

## Overview

When a customer completes an order on the website, an SMS notification is sent to the store's phone number with the order details. This helps staff prepare orders promptly and improves customer service.

## Files Added/Modified

1. `twilio-service.js` - Client-side JavaScript for formatting and sending SMS notifications
2. `menu-script.js` - Modified to call the SMS service when an order is submitted
3. `menu_new.html` - Updated to include the Twilio service script
4. `serverless/send-sms.js` - Serverless function for securely sending SMS via Twilio API

## Setup Instructions

### 1. Twilio Account Setup

You need to use your Twilio account credentials:
- Account SID: Your Twilio Account SID
- Auth Token: Your Twilio Auth Token
- Twilio Phone Number: +18336931045
- Store Phone Number: +14027592210

**Important Security Note:** In a production environment, these credentials should never be stored in client-side code. They should be stored as environment variables in your serverless function provider.

### 2. Serverless Function Deployment

The `serverless/send-sms.js` file needs to be deployed to a serverless function provider. Here are instructions for common providers:

#### Netlify

1. Create a `netlify.toml` file in your project root:
   ```toml
   [build]
     functions = "serverless"
   ```

2. Set up environment variables in Netlify dashboard:
   - TWILIO_ACCOUNT_SID
   - TWILIO_AUTH_TOKEN
   - TWILIO_PHONE_NUMBER

3. Install Twilio package:
   ```
   npm init -y
   npm install twilio
   ```

4. Deploy to Netlify:
   ```
   netlify deploy --prod
   ```

#### Vercel

1. Create a `vercel.json` file:
   ```json
   {
     "functions": {
       "serverless/*.js": {
         "runtime": "nodejs14.x"
       }
     }
   }
   ```

2. Set up environment variables in Vercel dashboard.

3. Install Twilio package and deploy:
   ```
   npm init -y
   npm install twilio
   vercel --prod
   ```

### 3. Update Client-Side Code

After deploying the serverless function, update the `twilio-service.js` file to use your deployed endpoint:

```javascript
// Replace the commented-out code with:
fetch('https://your-site.netlify.app/.netlify/functions/send-sms', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: storeNumber,
    body: message,
    orderNumber: orderData.orderNumber
  })
})
.then(response => response.json())
.then(data => resolve(data))
.catch(error => reject(error));
```

## Testing

You can test the SMS functionality by:

1. Placing a test order on the website
2. Checking the browser console for success/error messages
3. Verifying that the SMS is received on the store's phone

For direct testing of the Twilio API, you can use the following curl command:

```bash
curl 'https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json' -X POST \
--data-urlencode 'To=+14027592210' \
--data-urlencode 'From=+18336931045' \
--data-urlencode 'Body=Test message from Sisters Cafe' \
-u YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN
```

## Troubleshooting

- **SMS not sending:** Check browser console for errors and verify serverless function logs
- **Error responses:** Ensure Twilio credentials are correct and the phone numbers are in the proper format
- **Function deployment issues:** Verify that the Twilio package is installed and environment variables are set correctly

## Security Considerations

- Never expose Twilio credentials in client-side code
- Use environment variables in your serverless function
- Consider implementing rate limiting to prevent abuse
- Add authentication to your serverless function in a production environment