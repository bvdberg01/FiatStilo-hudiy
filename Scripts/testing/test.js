const { spawn } = require('child_process');

const variableToSend = 100;

spawn('python3', ['test.py', variableToSend]);
