import { CallingClient } from '@webex/calling';

let line, call;

async function initializeWebexCalling() {
  const callingClient = new CallingClient();

  try {
    await callingClient.initialize();
    line = Object.values(callingClient.getLines())[0];

    line.on('registered', (info) => {
      console.log('✅ Line registered:', info);
    });

    line.register();
    console.log('🚀 Webex Calling initialized.');
  } catch (error) {
    console.error('❌ Initialization failed:', error);
  }
}

// Listen for Salesforce Open CTI events
window.addEventListener('message', async (event) => {
  const { type, payload } = event.data || {};

  if (type === 'init') {
    console.log('📡 Salesforce initialized connector:', payload);
    // Respond back to confirm readiness
    parent.postMessage({ type: 'init_response', payload: { status: 'success' } }, '*');
  }

  if (type === 'makeCall') {
    const { phoneNumber } = payload;
    console.log('📞 Placing outbound call to:', phoneNumber);

    try {
      call = await line.dial(phoneNumber);
    } catch (err) {
      console.error('Dial failed:', err);
    }
  }

  if (type === 'endCall') {
    if (call) {
      await call.hangup();
      call = null;
      console.log('📴 Call ended');
    }
  }

  // Add more handlers for hold/resume, etc., if needed
});

// Start Webex Calling
initializeWebexCalling();