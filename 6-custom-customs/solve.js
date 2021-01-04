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
  let sum = 0;
  let isInGroup = false;
  let qStack = [];
  for(let entry of input) {
    if(entry === ''){
      sum += qStack.length;
      // new group
      isInGroup = false;
    } else {
      //
      if(isInGroup == false) {
        isInGroup = true;
        // for each character
        // qStack = the character array of the fisrt entry
        qStack = entry.split('');
      } else {
        // for the subsequent group members
        // filter qStack by characters in entry
        let newStack = qStack.filter(q => {
          for(let c of entry) {
            if(c == q) {
              return true;
            }
          }
          return false;
        });
        qStack = newStack;
      }
    }
  }
  console.log(sum);
}
