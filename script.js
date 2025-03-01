const board = document.getElementById('board');
const resetBtn = document.getElementById('reset-btn');
const mineCount = document.getElementById('mine-count');
const timer = document.getElementById('timer');

const rows = 10;
const cols = 10;
const mines = 10;

let tiles = [];
let minePositions = [];

function createBoard() {
  board.innerHTML = '';
  tiles = [];
  minePositions = generateMines();
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.row = r;
      tile.dataset.col = c;
      board.appendChild(tile);
      tiles.push(tile);
      tile.addEventListener('click', () => revealTile(r, c));
    }
  }
}

function generateMines() {
  const positions = [];
  while (positions.length < mines) {
    const pos = Math.floor(Math.random() * rows * cols);
    if (!positions.includes(pos)) {
      positions.push(pos);
    }
  }
  return positions;
}

function revealTile(row, col) {
    const tile = tiles[row * cols + col];
    if (tile.classList.contains('clicked')) return;
  
    tile.classList.add('clicked');
    
    // 지뢰 클릭 시 모든 지뢰 드러내기
    if (minePositions.includes(row * cols + col)) {
      tile.textContent = '💣';
      revealAllMines();
      status.textContent = '😔'; // 상태 이모티콘 변경
      alert('Game Over!');
      return;
    }
  
    const nearbyMines = countMines(row, col);
    if (nearbyMines > 0) {
      tile.textContent = nearbyMines;
    } else {
      revealNearbyTiles(row, col);
    }
  }
  
  resetBtn.addEventListener('click', () => {
    createBoard();
    status.textContent = '😊'; // 게임 초기화 시 이모티콘 복구
  });

function revealAllMines() {
  minePositions.forEach(pos => {
    const mineTile = tiles[pos];
    mineTile.textContent = '💣';
    mineTile.classList.add('clicked');
  });
}

function countMines(row, col) {
  let count = 0;
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      const nr = row + r;
      const nc = col + c;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && minePositions.includes(nr * cols + nc)) {
        count++;
      }
    }
  }
  return count;
}

function revealNearbyTiles(row, col) {
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      const nr = row + r;
      const nc = col + c;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        revealTile(nr, nc);
      }
    }
  }
}

resetBtn.addEventListener('click', createBoard);

createBoard();
