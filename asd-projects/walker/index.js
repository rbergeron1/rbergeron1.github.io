/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  }

  var walker = {
  positionX: 0,
  speedX: 0,
  positionY: 0,
  speedY: 0,
}

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown); 
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
  repositionGameItem();
  redrawGameItem();
  wallCollision();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if ( event.which === KEY.LEFT) {
    console.log(event.Key + ' ' + event.which);
    walker.speedX = -5;
    }
    if ( event.which === KEY.UP) {
    console.log(event.Key + ' ' + event.which);
    walker.speedY = -5;
    }
    if ( event.which === KEY.RIGHT) {
    console.log(event.Key + ' ' + event.which);
    walker.speedX = 5;
    }
    if ( event.which === KEY.DOWN) {
    console.log(event.Key + ' ' + event.which);
    walker.speedY = 5;
    }
  }
  function handleKeyUp(event) {
    if( event.which === KEY.LEFT || event.which === KEY.UP || event.which === KEY.RIGHT || event.which === KEY.DOWN) {
      walker.speedX = 0;
      walker.speedY = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
function repositionGameItem() {
walker.positionX += walker.speedX;
walker.positionY += walker.speedY;
}


function redrawGameItem() {
  $("#walker").css("left", walker.positionX);
  $("#walker").css("top", walker.positionY);
}

function wallCollision() {
  var char1H = $("#walker").height()
  var char1W = $("#walker").width()

  var boardWidth = $("#board").width() - char1W
  var boardHeight = $("#board").height() - char1H
  
  if (walker.positionX < 0) {
    walker.positionX = 0
  }
  if (walker.positionY < 0) {
    walker.positionY = 0
  }
  if (walker.positionX > boardWidth) {
    walker.positionX = boardWidth
  }
  if (walker.positionY > boardHeight) {
    walker.positionY = boardHeight
  }
}

  }
