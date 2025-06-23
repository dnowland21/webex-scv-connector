import WebexCalling from '@webex/calling';

let line, call;

async function initializeWebexCalling() {
  const callingClient = new WebexCalling(); // ✅ correct usage

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

// Listen for messages from Salesforce
window.addEventListener('message', async (event) => {
  const { type, payload } = event.data || {};

  if (type === 'init') {
    console.log('📡 Salesforce initialized connector:', payload);
    parent.postMessage({ type: 'init_response', payload: { status: 'success' } }, '*');
  }

  if (type === 'makeCall') {
    const { phoneNumber } = payload;
    try {
      call = await line.dial(phoneNumber);
    } catch (err) {
      console.error('Dial failed:', err);
    }
  }

  if (type === 'endCall' && call) {
    await call.hangup();
    call = null;
  }
});

initializeWebexCalling();