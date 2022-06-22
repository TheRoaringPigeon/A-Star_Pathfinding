let cols, rows, size;
let grid;
function setup() {
  createCanvas(windowWidth, windowHeight);
  size = 15;
  cols = floor(width/size);
  rows = floor(height/size);
  grid = new Grid();
}

function draw() {
  background(220);
  grid.show();
  grid.run();
}
