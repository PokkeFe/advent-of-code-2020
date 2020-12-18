const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.resolve(__dirname, 'input'));

chunks = [];
stream.on('data', chunk => {
  chunks.push(chunk);
})

stream.on('end', _ => {
  input = Buffer.concat(chunks).toString('utf8').split('\n');
  solve(input);
})

solve = input => {
  let highestSeatId = -1;
  let minSeatId = 100000;
  let seatIds = [];

  for(let entry of input) {
    if(entry == '') continue;
    let startRow = 0;
    let numRow = 128;
    let startCol = 0;
    let numCol = 8;
    for(let i = 0; i < 7; i++) {
      char = entry.charAt(i);
      if(char == 'F') {
        numRow /= 2;
      } else if(char == 'B') {
        startRow = startRow + (numRow/2);
        numRow /= 2;
      }
    }
    for(let i = 7; i < 10; i++) {
      char = entry.charAt(i);
      if(char == 'L') {
        numCol /= 2;
      } else if(char == 'R') {
        startCol = startCol + (numCol/2);
        numCol /= 2;
      }
    }
    let id = startRow * 8 + startCol;
    seatIds.push(id);
    if(id < minSeatId) minSeatId = id;
    if(id > highestSeatId) highestSeatId = id;
  }
  seatIds.sort();

  ind = minSeatId;
  while(seatIds.indexOf(ind) != -1) {
    ind = ind + 1;
  }
  console.log(ind);
}
