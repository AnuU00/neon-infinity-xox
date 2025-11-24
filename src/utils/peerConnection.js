import Peer from 'peerjs';

let peer = null;
let conn = null;

export const initializePeer = (onOpen, onError) => {
  // Ensure we don't create multiple peers
  if (peer) {
    if (peer.open) {
      if (onOpen) onOpen(peer.id);
      return peer;
    } else {
      peer.destroy();
    }
  }

  peer = new Peer(null, {
    debug: 2
  });
  
  peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
    if (onOpen) onOpen(id);
  });

  peer.on('error', (err) => {
    console.error('PeerJS Error:', err);
    if (onError) onError(err);
  });

  return peer;
};

export const hostGame = (onConnection, onData) => {
  if (!peer) return;

  peer.on('connection', (c) => {
    // Enforce max 1 opponent
    if (conn && conn.open) {
      console.log('Rejecting connection: Room full');
      c.on('open', () => {
        c.send({ type: 'ERROR', message: 'Room is full' });
        setTimeout(() => c.close(), 500);
      });
      return;
    }

    conn = c;
    console.log('Connected to: ' + conn.peer);
    if (onConnection) onConnection(conn);

    conn.on('data', (data) => {
      if (onData) onData(data);
    });
    
    conn.on('close', () => {
      console.log('Opponent disconnected');
      conn = null;
    });
  });
};

export const joinGame = (hostId, onOpen, onData, onError) => {
  if (!peer) return;

  console.log('Connecting to host:', hostId);
  conn = peer.connect(hostId, {
    reliable: true
  });

  conn.on('open', () => {
    console.log('Connected to host');
    if (onOpen) onOpen(conn);
  });

  conn.on('data', (data) => {
    if (onData) onData(data);
  });

  conn.on('error', (err) => {
    console.error('Connection Error:', err);
    if (onError) onError(err);
  });
  
  // Handle connection close
  conn.on('close', () => {
    console.log('Connection closed');
    if (onError) onError(new Error('Connection closed'));
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
