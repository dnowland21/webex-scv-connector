// File: main.js
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

    await line.register();
    console.log('🚀 Webex Calling initialized');
  } catch (error) {
    console.error('❌ Initialization failed:', error);
  }
}

window.startCall = async function () {
  if (!line) {
    console.warn('Line not initialized');
    return;
  }

  const number = prompt('📞 Enter number to call:');
  if (number) {
    try {
      call = await line.dial(number);
      console.log('📞 Call started to', number);
    } catch (error) {
      console.error('❌ Call failed:', error);
    }
  }
};

window.endCall = async function () {
  if (call) {
    await call.hangup();
    console.log('📴 Call ended');
    call = null;
  }
};

window.addEventListener('message', (event) => {
  const { type } = event.data || {};
  if (type === 'init') {
    initializeWebexCalling();
  }
});