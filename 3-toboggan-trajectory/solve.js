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
  let $1 = solveSlope(input, 1, 1);
  let $2 = solveSlope(input, 3, 1);
  let $3 = solveSlope(input, 5, 1);
  let $4 = solveSlope(input, 7, 1);
  let $5 = solveSlope(input, 1, 2);
  console.log($1 * $2 * $3 * $4 * $5);
}

solveSlope = (input, xinc, yinc) => {
  let x = 0,y = 0;
  let treeCount = 0;
  const width = input[0].length;
  const height = input.length - 1;
  while(y < height) {
    x += xinc;
    y += yinc;
    if(y >= height) continue;
    let char = input[y].charAt(x % width);
    if(char == '#') treeCount++;
  }
  return treeCount;
}
