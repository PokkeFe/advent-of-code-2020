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
  let invalidNumber = solve1(input);
  console.log("Solution to p2");
  console.log(solve2(input, invalidNumber));
})

solve1 = input => {
  let index = 25;
  while(index < input.length - 1) {
    let ret = isValid(input, index);
    if(ret.val == false) {
      console.log("Invalid".padEnd(8, ' '),input[index].padEnd(12, ' '), index, ret.x, ret.y);
      return input[index];
    } else {
      //console.log("Valid".padEnd(8, ' ',), input[index].padEnd(12, ' '), index);
    }
    index++;
  }
}

solve2 = (input, invalid_num) => {
  console.log(invalid_num);
  let inputValues = input.map(_ => {return parseInt(_)})
  for(let start = 0; start < input.length - 1; start++) {
    let x = inputValues[start];
    let sum = x;
    let min = x;
    let max = x;
    for(let end = start + 1; end < input.length; end++) {
      let y = inputValues[end];
      sum += y;
      if(y < min) min = y;
      if(y > max) max = y;
      if(sum == invalid_num) {
        console.log(sum);
        return (min + max);
      }
    }
    //console.log(start);
  }
}

isValid = (input, index) => {
  for(let i = 25; i > 1; i--) {
    for(let j = i - 1; j > 0; j--) {
      let x = parseInt(input[index-i]);
      let y = parseInt(input[index-j]);
      let inVal = parseInt(input[index]);
      //console.log(x + ' + ' + y + ' = ', x + y);
      if(inVal == x + y){
        if(x != y){
          return {val: true, x: input[index-i], y: input[index-j]};
        }
      }
    }
  }
  return {val: false};
}
