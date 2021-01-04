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
  let addrCount = [];
  let accumulator = 0;
  let pc = 0;
  // initialize count array with zeros
  for(let i = 0; i < input.length; i++) addrCount.push(0);

  let running = true;
  let line = undefined, instr = undefined, val = 0;

  while(running) {
    addrCount[pc] += 1;
    if(addrCount[pc] > 1) break;
    line = input[pc];
    instr = line.slice(0, 3);
    val = parseInt(line.slice(4));
    if(instr == 'jmp') {
      pc += val;
    } else {
      pc += 1;
      if(instr == 'acc') {
        accumulator += val;
      }
    }
  }

  console.log(accumulator);
}

solve2 = input => {
  let runCode;
  let index = input.length - 1;
  while(index >= 0) {
    runCode = [...input];
    instr = input[index].slice(0, 3);
    let val = input[index].slice(4);
    if(instr == 'jmp') {
      runCode[index] = `nop ${val}`;
    } else if(instr == 'nop') {
      runCode[index] = `jmp ${val}`;
    }

    let result = runBoot(runCode);
    if(result.code == 0) {
      console.log(result.acc);
      return;
    }
    index--;
  }
}

runBoot = input => {
  let addrCount = [];
  let accumulator = 0;
  let pc = 0;
  // initialize count array with zeros
  for(let i = 0; i < input.length; i++) addrCount.push(0);

  let running = true;
  let line = undefined, instr = undefined, val = 0;


  while(running) {
    addrCount[pc] += 1;
    if(addrCount[pc] > 1) return {code: 1, acc: accumulator};
    line = input[pc];
    if(line == '') return {code: 0, acc: accumulator};
    if(!line) {
      console.log(`line undefined at ${pc}`);
    }
    instr = line.slice(0, 3);
    val = parseInt(line.slice(4));
    if(instr == 'jmp') {
      pc += val;
    } else {
      pc += 1;
      if(instr == 'acc') {
        accumulator += val;
      }
    }
  }
}
