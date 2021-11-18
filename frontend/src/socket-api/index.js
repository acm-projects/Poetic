import openSocket from 'socket.io-client';

export function disconnectFromSocket(socket) {
    if (socket) {
        socket.emit('about to disconnect');
        socket.disconnect();
    }
}

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
    socket.on('editor change', data => callback(null, data));
}

export function sendEditorDataChange(socket, data) {
    socket.emit('editor change', data);
}

export function subscribeToTitleData(socket, callback) {
    socket.on('title change', data => callback(null, data));
}

export function sendTitleDataChange(socket, data) {
    socket.emit('title change', data);
}

export function subscribeToTagData(socket, callback) {
    socket.on('tags change', data => callback(null, data));
}

export function sendTagDataChange(socket, data) {
    socket.emit('tags change', data);
}

export function sendEditorAndTitleAndTagsData(socket, data) {
    socket.emit('editor and title and tags change', data);
}