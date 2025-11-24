import React from 'react';
import Cell from './Cell';

const Board = ({ board, onClick, xMoves, oMoves }) => {
  // Identify fading cells (the first one in the queue if queue is full)
  const fadingIndexX = xMoves.length === 3 ? xMoves[0] : null;
  const fadingIndexO = oMoves.length === 3 ? oMoves[0] : null;

  return (
    <div className="board">
      {board.map((value, index) => (
        <Cell 
          key={index} 
          value={value} 
          onClick={() => onClick(index)}
          isFading={index === fadingIndexX || index === fadingIndexO}
          disabled={value !== null}
        />
      ))}
    </div>
  );
};

export default Board;
