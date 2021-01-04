const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.resolve(__dirname, 'input'));

chunks = [];
stream.on('data', chunk => {
  chunks.push(chunk);
})

stream.on('end', _ => {
  input = Buffer.concat(chunks).toString('utf8').split('\n');
  console.log("Test 1");
  solve1(test);
  console.log("Solution to p1");
  solve1(input);
  console.log("-----------------");
  console.log("Test p2");
  solve2(test2);
  console.log("Solution to p2");
  solve2(input);
})

let test = [
  "51",
  "17,x,13,19", // p2 3417
  ""
];

let test2 = [
  "51",
  "1789,37,47,1889", // p2 754018
  ""
];

let test3 = [
  "51",
  "17,x,x,x,x,x,x,x,x,x,x,x,x,x,4", // p2 754018
  ""
];

solve1 = input => {
  let minTime = parseInt(input[0]), departData = undefined;
  let busses = input[1].split(',');
  let time = minTime;
  while(!departData) {
    for(let bus of busses) {
      if(bus == 'x') continue;
      let val = parseInt(bus);
      if(time % val == 0) {
        console.log(`Bus ${bus} arrived at ${time}`);
        departData = {bus: bus, time: time};
        break;
      }
    }
    time += 1;
  }
  console.log(`${departData.bus * (departData.time - minTime)}`);
}


solve2 = input => {

  let busses = input[1].split(',');

  let x = 0, N = 1;
  let i = 0;

  // Generate N11
  for(let i = 0; i < busses.length; i++) {
    if(busses[i] != 'x') {
      let id = parseInt(busses[i]);
      N *= id;
    }
  }
  // Calc
  for(let i = 0; i < busses.length; i++) {
    if(busses[i] != 'x') {
      let id = parseInt(busses[i]);
      let Ni = N / id;
      let bi = posMod(id - i, id);
      let xi = getInverse(Ni, id);
      console.log(`id: ${id.toString().padEnd(5, ' ')} |bi: ${(bi.toString()).padEnd(5, ' ')} | Ni: ${(Ni.toString()).padEnd(17, ' ')} | xi: ${xi}`);
      x += (Ni * bi * xi);
    }
  }
  x = x % N
  console.log(`Location of the departure sequence is ${x}`);

  console.log('time     |');
  for(let i = x; i < x + busses.length; i++) {
    let bussesString = '';
    for(let id of busses) {
      let str = ' ';
      if(id != 'x'){
        if(i % id == 0) {
          str = 'D';
        } else {
          str = '.';
        }
      }
      bussesString += str;
    }
    console.log(`${i.toString().padStart(8, ' ')} | ${bussesString}`)
  }
}

function posMod(x, y) {
  return (((x % y) + y) % y);
}

function getInverse(Ni, id) {
  let i = 0;
  let Nri = Ni % id;
  while(i <= id) {
    if(posMod(Nri * i, id) == 1) {
      //console.log(`Modular multiplicative inverse of ${Ni}x = (mod ${id}) -> ${i}`);
      return i;
    }
    i++;
  }
  return false;
}

function gcd(x, y) {
  let div, rem;
  div = y;
  rem = x % y;
  if(rem == 0) {
    return y;
  } else {
    return gcd(div, rem);
  }
}
