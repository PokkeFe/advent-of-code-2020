const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.resolve(__dirname, 'input'));

// console.log(stream);

let chunks = [];

stream.on('data', chunk => {
  chunks.push(chunk);
})

stream.on('end', _ => {
  res = Buffer.concat(chunks);
  const numArray = parseInput(res.toString('utf8'));
  const p1Solution = getP1Solution(numArray);

  console.log("Solution to part 1", p1Solution);

  const p2Solution = getP2Solution(numArray);
  console.log("Solution to part 2", p2Solution);
});

parseInput = str => {
  let stringArr = str.split('\n');
  let intArr = [];
  for(const i of stringArr) {
    intArr.push(parseInt(i));
  }
  return intArr;
}

getP1Solution = req => {
  for(let i = 0; i < req.length; i++) {
    for(let j = i; j < req.length; j++) {
      const n = req[i];
      const m = req[j];
      if(n + m == 2020) return (n * m);
    }
  }
  return undefined;
}

getP2Solution = req => {
  for(let i = 0; i < req.length; i++) {
    for(let j = i; j < req.length; j++) {
      for(let k = j; k < req.length; k++) {
        n = req[i];
        m = req[j];
        o = req[k];

        if(n + m + o == 2020) return n * m * o;
      }
    }
  }
}
