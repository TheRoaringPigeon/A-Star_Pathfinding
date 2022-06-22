class Cell{
  constructor(x, y, tx, ty){
    this.pos = createVector(x, y);
    this.x = tx;
    this.y = ty;
    this.visited = false;
    this.occupied = false;
    this.obstacle = false;
    this.goal = false;
    this.f = 0;
    this.g = 1000;
    this.h = 0;
    this.neighbors = [];
    this.setNeighbors();
    this.previous = null;
    if (random(1) < 0.2){
      this.obstacle = true;
    }
  }
  setNeighbors(){
    if (this.x > 0){
      this.neighbors.push([this.x-1, this.y]);
    }
    if (this.x < cols-1){
      this.neighbors.push([this.x+1, this.y]);
    }
    if (this.y > 0){
      this.neighbors.push([this.x, this.y-1]);
    }
    if (this.y < rows-1){
      this.neighbors.push([this.x, this.y+1]);
    }
  }
  getNeighbors(){
    return this.neighbors;
  }
  show(c){
    if (this.visited){
      fill(0);
    }else{
      fill(200);
    }
    rect(this.pos.x, this.pos.y, size);
    if (c){
      fill(c);
      rect(this.pos.x, this.pos.y, size);
    }
    if (this.occupied){
      fill(255);
      ellipse(this.pos.x + size/2, this.pos.y + size/2, size/2);
    }else if (this.goal){
      fill(color('red'));
      ellipse(this.pos.x + size/2, this.pos.y + size/2, size/2);
    }else if (this.obstacle){
      fill(0);
      rect(this.pos.x, this.pos.y, size);
    }
  }
  visit(){
    this.visited = true;
    this.occupied = true;
  }
  leave(){
    this.occupied = false;
  }
  giveDist(d){
    this.h = d;
  }
}
