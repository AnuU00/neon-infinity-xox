import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const WinModal = ({ winner, onRestart, isDraw, playerRole, gameMode }) => {
  const isWin = winner === playerRole;
  const isLocal = gameMode === 'local';
  
  let message = '';
  if (isDraw) {
    message = 'DRAW!';
  } else if (isLocal) {
    message = `${winner} WINS!`;
  } else {
    message = isWin ? 'YOU WON!' : 'YOU LOST!';
  }

  useEffect(() => {
    if (winner && (isWin || isLocal)) {
      // Confetti effect only for winner or local games
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#0ff', '#f0f', '#fff']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#0ff', '#f0f', '#fff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [winner, isWin, isLocal]);

  return (
    <div className="win-modal-overlay">
      <div className={`win-modal ${isDraw ? 'draw' : (isWin || isLocal ? 'win' : 'loss')}`}>
        <h2>{message}</h2>
        <div className="modal-actions">
          <button className="reset-btn" onClick={onRestart}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
