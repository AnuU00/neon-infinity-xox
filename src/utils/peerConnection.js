import Peer from 'peerjs';

let peer = null;
let conn = null;

export const initializePeer = (onOpen) => {
  peer = new Peer();
  
  peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
    if (onOpen) onOpen(id);
  });

  return peer;
};

export const hostGame = (onConnection, onData) => {
  if (!peer) return;

  peer.on('connection', (c) => {
    conn = c;
    console.log('Connected to: ' + conn.peer);
    if (onConnection) onConnection(conn);

    conn.on('data', (data) => {
      if (onData) onData(data);
    });
  });
};

export const joinGame = (hostId, onOpen, onData) => {
  if (!peer) return;

  conn = peer.connect(hostId);

  conn.on('open', () => {
    console.log('Connected to host');
    if (onOpen) onOpen(conn);
  });

  conn.on('data', (data) => {
    if (onData) onData(data);
  });
};

export const sendData = (data) => {
  if (conn && conn.open) {
    conn.send(data);
  }
};

export const destroyPeer = () => {
  if (conn) {
    conn.close();
  }
  if (peer) {
    peer.destroy();
  }
  peer = null;
  conn = null;
};
