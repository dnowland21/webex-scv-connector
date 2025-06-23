import WebexCalling from '@webex/calling';

let line, call;

async function initializeWebexCalling() {
  const callingClient = new WebexCalling();

  try {
    await callingClient.initialize();

    line = Object.values(callingClient.getLines())[0];
    line.on('registered', (info) => {
      console.log('✅ Line registered:', info);
    });

    await line.register();
    console.log('🚀 Webex Calling initialized');
  } catch (error) {
    console.error('❌ Initialization failed:', error);
  }
}

// Expose functions globally for Salesforce context
window.startCall = async function () {
  if (!line) {
    console.warn('Line not initialized yet');
    return;
  }

  try {
    const number = prompt('Enter number to dial:');
    if (number) {
      call = await line.dial(number);
      console.log('📞 Call started');
    }
  } catch (error) {
    console.error('❌ Call failed:', error);
  }
};

window.endCall = async function () {
  if (call) {
    await call.hangup();
    console.log('🔚 Call ended');
    call = null;
  }
};

// Handle Salesforce message integration
window.addEventListener('message', async (event) => {
  const { type, payload } = event.data || {};

  if (type === 'init') {
    console.log('📡 Salesforce initialized connector:', payload);
    parent.postMessage({ type: 'init_response', payload: { status: 'success' } }, '*');
  }

  if (type === 'makeCall' && payload?.phoneNumber) {
    window.startCall(payload.phoneNumber);
  }

  if (type === 'endCall') {
    window.endCall();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startCallBtn')?.addEventListener('click', window.startCall);
  document.getElementById('endCallBtn')?.addEventListener('click', window.endCall);
});

initializeWebexCalling();