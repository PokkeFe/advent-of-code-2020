const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.resolve(__dirname, 'input'));

chunks = [];
stream.on('data', chunk => {
  chunks.push(chunk);
})

stream.on('end', _ => {
  input = Buffer.concat(chunks).toString('utf8').split('\n');
  console.log("Solution to p1");
  solve1(input);
  console.log("Solution to p2");
  solve2(input);
})

solve1 = input => {
  input = input.slice(0, -1);
  let inVals = input.map(_=>parseInt(_));
  inVals.sort((a, b) => a - b);

  let differences = {1: 0, 2: 0, 3: 0}
  let index = 1;

  let v = inVals[0] - 0;
  differences[v] += 1;

  while(index < inVals.length) {
    v = inVals[index] - inVals[index-1];
    differences[v] += 1;
    index++;
  }
  differences[3] += 1
  console.log(differences);
  console.log(differences[3] * differences[1]);
}

solve2 = (input) => {

}
