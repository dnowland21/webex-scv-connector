import calling from '@webex/calling';

let call, line;

// Initialize the Webex Calling client
const callingClient = await calling.init({
  auth: {
    accessToken: '54e9fc2e8f2afc055fcaeeb14e5a4ff971aeb8b3a83da7c514f9e659121fa272' // Replace with your actual token or dynamic injection
  }
});

line = Object.values(callingClient.getLines())[0];

line.on('registered', (info) => {
  document.getElementById('status').textContent = 'Registered with Webex';
  document.getElementById('start-call').disabled = false;
  console.log('Line info:', info);
});

line.on('unregistered', () => {
  document.getElementById('status').textContent = 'Unregistered';
});

line.register();

document.getElementById('start-call').addEventListener('click', () => {
  call = line.dial('+15555555555'); // Example number
  document.getElementById('status').textContent = 'Calling...';
});