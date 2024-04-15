// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
applyFilter(Reddify)
applyFilter(decreaseBlue)
applyFilter(increaseGreenByBlue)

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){
  for (let row = 0; row < image.length; row++) {
    for (let column = 0; column < image[row].length; column++) {
  var rgbString = image[row][column]
  var rgbNumbers = rgbStringToArray(rgbString)
  
  filterFunction(rgbNumbers)
  
  rgbString = rgbArrayToString(rgbNumbers);
  image[row][column] = rgbString;
  
  }
  }
}

// TODO 7: Create the applyFilterNoBackground function


// TODO 5: Create the keepInBounds function
function KeepInBounds(boundsNumber) {
return Math.min(255, Math.max(0, boundsNumber))
}

// TODO 3: Create reddify function
function Reddify(redArray) {
redArray[RED] = 200
}

// TODO 6: Create more filter functions
function decreaseBlue(Blueify) {
Blueify[BLUE] = KeepInBounds(Blueify[BLUE] - 50);
}

function increaseGreenByBlue(Greenify) {
Greenify[GREEN] = KeepInBounds(Blueify[BLUE] + Greenify[GREEN])
}

// CHALLENGE code goes below here
