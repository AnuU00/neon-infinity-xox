import React, { useState } from 'react';

const Menu = ({ onStartGame, onJoinGame }) => {
  const [joinId, setJoinId] = useState('');

  return (
    <div className="menu-overlay">
      <div className="menu-container">
        <h1 className="neon-title">ANU XOX</h1>
        
        <div className="menu-options">
          <button className="menu-btn" onClick={() => onStartGame('ai')}>
            Play vs Robot
          </button>
          
          <button className="menu-btn" onClick={() => onStartGame('local')}>
            Pass & Play (Local)
          </button>

          <div className="divider"></div>

          <button className="menu-btn" onClick={() => onStartGame('p2p-host')}>
            Host Online Game
          </button>

          <div className="join-section">
            <input 
              type="text" 
              placeholder="Enter Game ID" 
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              className="join-input"
            />
            <button 
              className="menu-btn small" 
              onClick={() => onJoinGame(joinId)}
              disabled={!joinId}
            >
              Join Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
