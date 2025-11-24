import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const WinModal = ({ winner, onRestart, isDraw }) => {
  useEffect(() => {
    if (winner) {
      // Confetti effect
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
  }, [winner]);

  return (
    <div className="win-modal-overlay">
      <div className={`win-modal ${winner ? 'win' : 'draw'}`}>
        <h2>{winner ? `${winner} WINS!` : 'DRAW!'}</h2>
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
