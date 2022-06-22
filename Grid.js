class Grid{
  constructor(){
    this.cells = Array(cols)
      .fill(0)
      .map((x) => Array(rows).fill(0));
    for (let x = 0; x < cols; x++){
      for (let y = 0; y < rows; y++){
        this.cells[x][y] = new Cell(x*size, y*size, x, y);
      }
    }
    this.cells[0][0].visit();
    this.cells[0][0].g = 0;
    this.cells[cols-1][rows-1].goal = true;
    this.goal = this.cells[cols-1][rows-1].pos.copy();
    this.giveDist();
    this.openSet = [this.cells[0][0]];
    this.closedSet = [];
    this.end = this.cells[cols-1][rows-1];
    this.path = [];
  }
  removeFromArray(arr, elmt){
    for (let i = arr.length-1; i >= 0; i--){
      if (arr[i] == elmt){
        arr.splice(i, 1);
      }
    }
  }
  run(){
    if (this.openSet.length > 0){
      //keep looking for solution
      let winnerIndex = 0;
      for (let i = 0; i < this.openSet.length; i++){
        if (this.openSet[i].f < this.openSet[winnerIndex].f){
          winnerIndex = i;
        }
      }
      let current = this.openSet[winnerIndex];
      if (current == this.end){
        //backtrack
        this.path = [];
        let temp = current;
        while(temp.previous){
          this.path.push(temp.previous);
          temp = temp.previous;
        }
        for (let i = 0; i < this.path.length; i++){
          this.path[i].show(color('red'));
        }
        console.log("DONE!");
        noLoop();
      }
      this.closedSet.push(current);
      this.removeFromArray(this.openSet, current);
      let neighborsIndex = current.getNeighbors();
      let neighbors = [];
      for (let i = 0; i < neighborsIndex.length; i++){
        neighbors.push(this.cells[neighborsIndex[i][0]][neighborsIndex[i][1]]);
      }
      for (let i = 0; i < neighbors.length; i++){
        let neighbor = neighbors[i];
        if (!this.closedSet.includes(neighbor) && !neighbor.obstacle){
          let tempG = current.g + 1;
          let newPath = false;
          if (this.openSet.includes(neighbor)){
            if (tempG < neighbor.g){
              neighbor.g = tempG;
              newPath = true;
            }
          }else{
            neighbor.g = tempG;
            this.openSet.push(neighbor);
            newPath = true;
          }
          if (newPath){
            neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
          }
        }
      }
    }else{
      // no solution
      console.log("No Solution");
      noLoop();
    }
  }
  show(){
    for (let x = 0; x < cols; x++){
      for (let y = 0; y < rows; y++){
        this.cells[x][y].show();
      }
    }
    for (let i = this.openSet.length-1; i >= 0; i--){
      this.openSet[i].show(color('green'));
    }
    for (let i = this.closedSet.length-1; i >=0; i--){
      this.closedSet[i].show(color('blue'));
    }
  }
  giveDist(){
    for (let x = 0; x < cols; x++){
      for (let y = 0; y < rows; y++){
        if (x != cols-1 && y != rows-1){
          let d = dist(this.cells[x][y].pos.x, this.cells[x][y].pos.y, this.goal.x, this.goal.y);
          this.cells[x][y].giveDist(d);
        }
      }
    }
  }
}
