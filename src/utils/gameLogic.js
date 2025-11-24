// Winning combinations indices
const WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export function checkWin(board) {
  for (let combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Minimax AI
export function getBestMove(board, xMoves, oMoves, aiPlayer = 'O') {
  // Clone state to simulate moves
  const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
  
  // Simple heuristic for immediate win/block if depth is too high, 
  // but for 3x3 with max 3 pieces, the state space is small enough for full minimax.
  
  let bestScore = -Infinity;
  let move = -1;

  // If it's the first move for AI and center is open, take it (optimization)
  if (availableMoves.length === 8 && board[4] === null) return 4;
  if (availableMoves.length === 9) return 4;

  for (let i of availableMoves) {
    // Simulate move
    let newBoard = [...board];
    let newXMoves = [...xMoves];
    let newOMoves = [...oMoves];

    // Apply move
    newBoard[i] = aiPlayer;
    if (aiPlayer === 'X') {
      newXMoves.push(i);
      if (newXMoves.length > 3) {
        const removed = newXMoves.shift();
        newBoard[removed] = null;
      }
    } else {
      newOMoves.push(i);
      if (newOMoves.length > 3) {
        const removed = newOMoves.shift();
        newBoard[removed] = null;
      }
    }

    let score = minimax(newBoard, newXMoves, newOMoves, 0, false, aiPlayer);
    
    // Undo move (implicit by using clones in loop)

    if (score > bestScore) {
      bestScore = score;
      move = i;
    }
  }

  return move;
}

const SCORES = {
  X: -10,
  O: 10,
  TIE: 0
};

function minimax(board, xMoves, oMoves, depth, isMaximizing, aiPlayer) {
  const winner = checkWin(board);
  if (winner === 'O') return SCORES.O - depth; // Prefer faster wins
  if (winner === 'X') return SCORES.X + depth; // Prefer slower losses
  
  // In infinity mode, there are no ties by full board, but we need a depth limit to prevent infinite loops 
  // if the game cycles. However, with 3 pieces, cycles are possible. 
  // We'll limit depth.
  if (depth > 6) return 0; 

  const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
  
  // If no moves (shouldn't happen in infinity unless board is full which is impossible with 3 pieces limit logic applied correctly)
  if (availableMoves.length === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i of availableMoves) {
      let newBoard = [...board];
      let newXMoves = [...xMoves];
      let newOMoves = [...oMoves];

      // AI ('O') moves
      newBoard[i] = 'O';
      newOMoves.push(i);
      if (newOMoves.length > 3) {
        const removed = newOMoves.shift();
        newBoard[removed] = null;
      }

      let score = minimax(newBoard, newXMoves, newOMoves, depth + 1, false, aiPlayer);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i of availableMoves) {
      let newBoard = [...board];
      let newXMoves = [...xMoves];
      let newOMoves = [...oMoves];

      // Human ('X') moves
      newBoard[i] = 'X';
      newXMoves.push(i);
      if (newXMoves.length > 3) {
        const removed = newXMoves.shift();
        newBoard[removed] = null;
      }

      let score = minimax(newBoard, newXMoves, newOMoves, depth + 1, true, aiPlayer);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}
