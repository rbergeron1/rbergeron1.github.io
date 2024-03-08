/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");

// TODO 4a: Create the snake, apple and score variables
// Game Variables

var snake = {};

var apple = {};

var score = 0;


// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: turn on keyboard inputs
$("body").on("keydown", handleKeyDown);

// start the game
init();

function init() {
  
snake.body = [];

makeSnakeSquare(10, 10);
snake.head = snake.body[0];
  
makeApple();

updateInterval = setInterval(update, 100);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * On each update tick update each bubble's position and check for
 * collisions with the walls.
 */
function update() {
   moveSnake();

   if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
   }

   if (hasCollidedWithApple()) {
    handleAppleCollision();
   }
}

function checkForNewDirection(event) {

  if (activeKey === KEY.LEFT) {
    snake.head.direction = "left";
  } 
  if (activeKey === KEY.UP) {
    snake.head.direction = "up";
  }
  if (activeKey === KEY.RIGHT) {
    snake.head.direction = "right";
  } 
  if (activeKey === KEY.DOWN) {
    snake.head.direction = "down";
  } 
  
  
  //console.log(snake.head.direction);
}

function moveSnake() {

for ( var i = snake.body.length - 1; i > 0; i--) {

var snakeSquare = snake.body[i];
var nextSnakeSquare = snake.body[i - 1];

var nextRow = nextSnakeSquare.row;
var nextColumn = nextSnakeSquare.column;
var nextDirection = nextSnakeSquare.direction;

snakeSquare.direction = nextDirection;
  snakeSquare.row = nextRow;
  snakeSquare.column = nextColumn;
  repositionSquare(snakeSquare);
}

  //Before moving the head, check for a new direction from the keyboard input
  checkForNewDirection();
  if (snake.head.direction === "left") {
    snake.head.column = snake.head.column - 1;
  }
  repositionSquare(snake.head);

  if (snake.head.direction === "right") {
    snake.head.column = snake.head.column + 1;
  }
  repositionSquare(snake.head);

  if (snake.head.direction === "up") {
    snake.head.row = snake.head.row - 1;
  }
  repositionSquare(snake.head);

  if (snake.head.direction === "down") {
    snake.head.row = snake.head.row + 1;
  }
  repositionSquare(snake.head);



}

function hasHitWall() {
  if (snake.head.row === -1 || 
    snake.head.row === ROWS + 1 || 
    snake.head.column === -1 || 
    snake.head.column === COLUMNS + 1)
  {return true}

  return false;
}

function hasCollidedWithApple() {

  if (snake.head.row === apple.row && snake.head.column === apple.column)
return true;
  

return false;
}

function handleAppleCollision() {
  // increase the score and update the score DOM element
  score++;
  scoreElement.text("Score: " + score);

  // Remove existing Apple and create a new one
  apple.element.remove();
  makeApple();

  /* 
  TODO 10: determine the location of the next snakeSquare based on the .row,
  .column and .direction properties of the snake.tail snakeSquare
  
  HINT: snake.tail.direction will be either "left", "right", "up", or "down".
  If the tail is moving "left", place the next snakeSquare to its right. 
  If the tail is moving "down", place the next snakeSquare above it.
  etc...
  */
  var row = snake.tail.row;
  var column = snake.tail.column;

  if (snake.tail.direction === "left") {column++}
  if (snake.tail.direction === "up") {row++}
  if (snake.tail.direction === "right") {column--}
  if (snake.tail.direction === "down") {row--}
  // code to determine the row and column of the snakeSquare to add to the snake

  makeSnakeSquare(row, column);
}

function hasCollidedWithSnake() {

  var headRow = snake.body[0].row;
  var headColumn = snake.body[0].column;
  
  for (var i = 1; i < snake.body.length; i++)
  {
    var tailRow = snake.body[i].row
    var tailColumn = snake.body[i].column
    if (headRow === tailRow && headColumn === tailColumn)
    {return true}


  }

  return false;
}

function endGame() {
  // stop update function from running
  clearInterval(updateInterval);

  // clear board of all elements
  board.empty();

  // update the highScoreElement to display the highScore
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;

  // restart the game after 500 ms
  setTimeout(init, 500);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* Create an HTML element for the apple using jQuery. Then find a random
 * position on the board that is not occupied and position the apple there.
 */
function makeApple() {
  
apple.element = $("<div>").addClass("apple").appendTo(board);
var randomPosition = getRandomAvailablePosition();  
apple.row = randomPosition.row;
apple.column = randomPosition.column;
repositionSquare(apple);
}

/* Create an HTML element for a snakeSquare using jQuery. Then, given a row and
 * column on the board, position it on the screen. Finally, add the new
 * snakeSquare to the snake.body Array and set a new tail.
 */
function makeSnakeSquare(row, column) {
  
  var snakeSquare = {};

  snakeSquare.element = $("<div>").addClass("snake").appendTo(board);

  snakeSquare.row = row;
  snakeSquare.column = column;

  repositionSquare(snakeSquare);

  if (snake.body.length === 0) {
    snakeSquare.element.attr("id", "snake-head");
  }
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

/* 
  event.which returns the keycode of the key that is pressed when the
  keydown event occurs
  
  The KEY Object creates a map for the Arrow Keys to their keycode:

    KEY.LEFT = 37
    KEY.UP = 38
    KEY.RIGHT = 39
    KEY.DOWN = 40
*/
function handleKeyDown(event) {
  // TODO 6a: make the handleKeyDown function register which key is pressed
  activeKey = event.which;
  console.log(activeKey);
}

/* Given a gameSquare (which may be a snakeSquare or the apple), position
 * the gameSquare on the screen.
 */
function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;

  var buffer = 20;

  // position the square on the screen according to the row and column
  squareElement.css("left", column * SQUARE_SIZE + buffer);
  squareElement.css("top", row * SQUARE_SIZE + buffer);
}

/* Returns a (row,column) Object that is not occupied by another game component
 */
function getRandomAvailablePosition() {
  var spaceIsAvailable;
  var randomPosition = {};
  
  while (!spaceIsAvailable) {
      randomPosition.column = 
    Math.floor(Math.random() * COLUMNS);
      randomPosition.row = 
    Math.floor(Math.random() * ROWS);
      spaceIsAvailable = true;
    for (let i = 0; i < snake.body.length; i++) {
      if (randomPosition.column === 
        snake.body[i].column && 
        randomPosition.row === 
        snake.body[i].row) {
        spaceIsAvailable = false;
        Break;
      }
    }
    }

  return randomPosition;

  }

function calculateHighScore() {
  // retrieve the high score from session storage if it exists, or set it to 0
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("Congratulation You Got A New High Score!");
  }

  return highScore;
}
