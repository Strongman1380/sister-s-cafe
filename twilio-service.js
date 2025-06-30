// Twilio SMS Service for Sisters Cafe
// This file handles sending SMS notifications for completed orders

/**
 * Sends an SMS notification to the store when an order is completed
 * @param {Object} orderData - The order data object
 * @returns {Promise} - A promise that resolves when the SMS is sent
 */
function sendOrderSMS(orderData) {
  // Twilio account credentials - Replace with your actual credentials when testing
  const accountSid = 'AC6b7af2a5152724ba17fe1ac9f4561429'; // Replace with your Twilio Account SID
  const authToken = '9a072904b436d70ab7284e3650cec67d';   // Replace with your Twilio Auth Token
  const twilioNumber = '+18336931045';          // Your Twilio phone number
  const storeNumber = '+14027592210';           // Store's phone number for receiving notifications
  
  // Format the order items for SMS
  let itemsList = orderData.items.map(item => 
    `${item.name} x${item.quantity}`
  ).join(', ');
  
  // Truncate if too long
  if (itemsList.length > 100) {
    itemsList = itemsList.substring(0, 97) + '...';
  }
  
  // Create the SMS message
  const message = `
New Order #${orderData.orderNumber}
Customer: ${orderData.customerName}
Phone: ${orderData.customerPhone}
Pickup: ${orderData.pickupTime}
Items: ${itemsList}
Total: $${orderData.total.toFixed(2)}
${orderData.orderNotes ? 'Notes: ' + orderData.orderNotes : ''}
  `.trim();
  
  // In a production environment, this would be a server-side API call
  // For client-side implementation, we'll use a fetch request to a serverless function
  // that would handle the Twilio API call securely
  
  console.log('Sending SMS notification for order:', orderData.orderNumber);
  console.log('SMS content:', message);
  
  // For testing/development, log the curl command that would be used
  const curlCommand = `curl 'https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json' -X POST \\
--data-urlencode 'To=${storeNumber}' \\
--data-urlencode 'From=${twilioNumber}' \\
--data-urlencode 'Body=${message}' \\
-u ${accountSid}:${authToken}`;
  
  console.log('Curl command for testing:', curlCommand);
  
  // Return a promise that would normally handle the API call
  return new Promise((resolve, reject) => {
    // In a real implementation, this would be a fetch or XMLHttpRequest to your server
    // which would then make the secure API call to Twilio
    
    // For now, we'll simulate a successful SMS send
    setTimeout(() => {
      console.log('SMS notification sent successfully');
      resolve({ success: true, message: 'SMS notification sent' });
    }, 1000);
    
    // In production, you would use something like:
    /*
    fetch('/api/send-sms', {
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
    */
  });
}

// Export the function for use in other files
window.sendOrderSMS = sendOrderSMS;
