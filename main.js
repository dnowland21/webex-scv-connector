import WebexCalling from '@webex/calling';

let line, call;

async function initializeWebexCalling() {
  const { CallingClient } = WebexCalling; // Destructure from default import
  const callingClient = new CallingClient();

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

window.addEventListener('message', async (event) => {
  const { type } = event.data || {};

  if (type === 'init') {
    initializeWebexCalling();
  }
});