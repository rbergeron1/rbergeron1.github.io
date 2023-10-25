$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    for (let i = 100; i < canvas.width; i += 100) {
      createPlatform(i, canvas.height, -1, -canvas.height);
     }
     for (let i = 100; i < canvas.height; i += 100) {
       createPlatform(canvas.width, i, -canvas.width, -1);
     }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    createPlatform(300, 650, 200, 300)
    createPlatform(450, 600, 300, 500)
    createPlatform(765, 500, 250, 500)
    createPlatform(1250, 450, 80, 20)
    createPlatform(950, 350, 65, 20)
    createPlatform(1300, 100, 900, 900)
    createPlatform(1250, 270, 80, 20)
    createPlatform(1100, 620, 100, 400)
    createPlatform(1, 200, 950, 25)
    createPlatform(1000, 700, 100, 0)


    createCollectable("database", 1, 700, 00)
    createCollectable("database", 1050, 680, 00)
    createCollectable("database", 1270, 60, 00)
    createCollectable("database", 735, 580, 00)
    
    createCannon("top", 300, 820, 50);
    createCannon("bottom", 700, 2002, 50);
    createCannon("right", 450, 3100, 200);
    createCannon("left", 332, 3100, 200);
    createCannon("bottom", 1000, 2000, 1);
    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
