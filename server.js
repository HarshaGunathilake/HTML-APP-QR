const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const PORT = 4000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Explicit route to serve mobile.html
app.get('/mobile', (req, res) => {
    console.log("Request received for /mobile");
    res.sendFile(path.join(__dirname, 'public/mobile.html'));
});

// WebSocket server
const wss = new WebSocket.Server({ port: 4001 });

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', message => {
        console.log('Received message:', message);
        ws.send('Session ID received: ' + message);
    });
    ws.on('close', () => console.log('Client disconnected'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://138.68.129.50:${PORT}`);
});


//app.listen(PORT, () => {
  //  console.log(`Server running at http://localhost:${PORT}`);
//});
