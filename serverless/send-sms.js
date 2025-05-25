// Serverless function for sending SMS via Twilio
// This would be deployed to a service like Netlify, Vercel, or AWS Lambda

// Example for Netlify Functions
exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the incoming request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.to || !data.body || !data.orderNumber) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }
    
    // Twilio credentials would be stored as environment variables
    // in your serverless function provider (NOT in client-side code)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER; // +18336931045
    
    // Initialize Twilio client
    const twilio = require('twilio')(accountSid, authToken);
    
    // Send the SMS
    const message = await twilio.messages.create({
      body: data.body,
      from: twilioNumber,
      to: data.to
    });
    
    console.log(`SMS sent for order ${data.orderNumber}: ${message.sid}`);
    
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'SMS sent successfully',
        messageId: message.sid
      })
    };
    
  } catch (error) {
    console.error('Error sending SMS:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Failed to send SMS'
      })
    };
  }
};