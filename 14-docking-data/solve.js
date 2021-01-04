const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.resolve(__dirname, 'input'));

chunks = [];
stream.on('data', chunk => {
  chunks.push(chunk);
});

stream.on('end', _ => {
  input = Buffer.concat(chunks).toString('utf8').split('\n');
  console.log("Test");
  //solve1(test);
  console.log("Solution to p1");
  //solve1(input);

  console.log("Test 2");
  solve2(test2);
  console.log("Solution to p2");
  solve2(input);
})

////////////////////////////////////
// PART 1
////////////////////////////////////

solve1 = input => {
  let mask = undefined;
  let entry;
  let pre, post, mem = {};
  let instr;
  // Loop through each line and extract instruction
  let i = 0;
  while(i < input.length - 1) {
    entry = input[i];
    instr = entry.slice(0,4);

    // Branch to instruction
    if(instr == "mask") {
      // Extract mask
      mask = entry.slice(-36);
    }
    if(instr == "mem[") {
      // Get mem loc
      let endBracketIndex = entry.indexOf("]");
      let val = parseInt(entry.slice(4, endBracketIndex));

      // extract pre
      let preDecimal = parseInt(entry.slice(endBracketIndex + 4));

      pre = preDecimal.toString(2).padStart(36, '0');
      pre = pre.split('');

      // Calc post from mask
      for(let i = 0; i < mask.length; i++) {
        switch(mask[i]){
          case '0':
            pre[i] = '0';
            break;
          case '1':
            pre[i] = '1';
            break;
        }
      }

      pre = pre.join("");
      post = parseInt(pre, 2);

      // Save to mem
      mem[val] = post;
    }
    i++;
  }

  // Sum up all mask values
  let sum = 0;
  let memkeys = Object.keys(mem);
  for(let key of memkeys) {
    memloc = mem[key];
    sum += memloc;
  }
  console.log("Sum: ", sum);
}

// Test Input
let test = [ // Result of 100
  "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0", // 36 bit
  "mem[1] = 21",
  "mem[2] = 30",
  "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1",
  "mem[3] = 15",
  "mem[14] = 24",
  "mem[14] = 34",
  ""
];

////////////////////////////////////
// PART 2
////////////////////////////////////

solve2 = input => {
  let mask = undefined;
  let entry;
  let pre, post, mem = {};
  let instr;
  // Loop through each line and extract instruction
  let i = 0;
  while(i < input.length - 1) {
    entry = input[i];
    instr = entry.slice(0,4);

    // Branch to instruction
    if(instr == "mask") {
      // Extract mask
      mask = entry.slice(-36);
      console.log(mask);
    }
    if(instr == "mem[") {
      // Get mem loc
      let endBracketIndex = entry.indexOf("]");
      let memVal = parseInt(entry.slice(4, endBracketIndex));

      // extract pre
      let writeVal = parseInt(entry.slice(endBracketIndex + 4));

      memBinary = memVal.toString(2).padStart(36, '0').split('');

      let permStack = [];
      // Calc post from mask
      for(let i = 0; i < mask.length; i++) {
        switch(mask[i]){
          case '1':
            memBinary[i] = '1';
            break;
          case 'X':
            // add to stack
            permStack.push(i);
            break;
        }
      }

      let range = 1 << permStack.length;

      for(let i = 0; i < range; i++) {
        let binary = i.toString(2).padStart(permStack.length, '0');
        for(let j = 0; j < permStack.length; j++) {
          memBinary[permStack[j]] = binary[j];
        }

        let newMemVal = parseInt(memBinary.join(""), 2);
        mem[newMemVal] = writeVal;
      }
    }
    i++;
  }

  // Sum up all mask values
  let sum = 0;
  let memkeys = Object.keys(mem);
  for(let key of memkeys) {
    memloc = mem[key];
    sum += memloc;
  }
  console.log("Sum: ", sum);
}

// Test input

let test2 = [ // Result of 100
  "mask = 00000000000000000000000000000000XXX0", // 36 bit
  "mem[1] = 21",
  "mem[2] = 30",
  "mask = 0000000000000000000000000000001XXXX0",
  "mem[3] = 15",
  "mem[14] = 24",
  "mem[14] = 34",
  ""
];
