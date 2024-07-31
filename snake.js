const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [];
let direction;
let food;
let score;
let game;

function initializeGame() {
  snake = [];
  snake[0] = { x: 7 * box, y: 7 * box };
  direction = 'RIGHT';
  food = generateFood();
  score = 0;
  document.getElementById('score').innerText = 'Score: ' + score;
  if (game) clearInterval(game);
  game = setInterval(draw, 100);
}

document.addEventListener('keydown', setDirection);

function setDirection(event) {
  if (event.keyCode == 37 && direction != 'RIGHT') {
    direction = 'LEFT';
  } else if (event.keyCode == 38 && direction != 'DOWN') {
    direction = 'UP';
  } else if (event.keyCode == 39 && direction != 'LEFT') {
    direction = 'RIGHT';
  } else if (event.keyCode == 40 && direction != 'UP') {
    direction = 'DOWN';
  } else if (event.keyCode == 82) { // 'R' key
    initializeGame();
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function generateFood() {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
    if (!collision(newFood, snake)) {
      return newFood;
    }
  }
}

function draw() {
  ctx.fillStyle = 'lightgreen';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == 'LEFT') snakeX -= box;
  if (direction == 'UP') snakeY -= box;
  if (direction == 'RIGHT') snakeX += box;
  if (direction == 'DOWN') snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    document.getElementById('score').innerText = 'Score: ' + score;
    food = generateFood();
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
    clearInterval(game);
  }

  snake.unshift(newHead);
}

initializeGame();
