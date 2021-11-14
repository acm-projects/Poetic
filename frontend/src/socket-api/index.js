import openSocket from 'socket.io-client';

export function connectToSocket(query, callback) {
    console.log("About to connect with query", query);
    const socket = openSocket('http://localhost:8081', { query: "poemTitle="+query });
    socket.on('initial value', initValue => callback(null, initValue));
    return socket;
}

export function subscribeToTimer(socket, callback) {
    socket.on('timer', timestamp => callback(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

export function subscribeToEditorData(socket, callback) {
    socket.on('message', data => callback(null, data));
}

export function sendEditorDataChange(socket, data) {
    socket.send(data);
}