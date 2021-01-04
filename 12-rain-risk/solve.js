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
  entries = input.slice(0, -1);

  let ship = {x: 0, y: 0, dir: 0}
  for(let entry of entries) {
    const instr = entry[0];
    const val = parseInt(entry.slice(1));
    switch(instr) {
      case 'F':
        moveForward(ship, val);
        break;
      case 'R':
        turn(ship, -val);
        break;
      case 'L':
        turn(ship, val);
        break;
      case 'N':
        moveLong(ship, -val);
        break;
      case 'S':
        moveLong(ship, val);
        break;
      case 'E':
        moveLat(ship, val);
        break;
      case 'W':
        moveLat(ship, -val);
        break;
    }
  }
  console.log(Math.abs(ship.x) + Math.abs(ship.y));
}

let test = [
  "W10",
  "S1",
  "N1",
  "F10",
  "W1",
  "R90",
  "F10",
  "S1",
  "L270",
  "F30",
  "E1",
  "R180",
  "F10",
  ""
];

solve2 = input => {
  entries = input.slice(0, -1);
  let ship = {x: 0, y: 0, way: {x: 10, y: 1}}
  for(let entry of entries) {
    const instr = entry[0];
    const val = parseInt(entry.slice(1));
    switch(instr) {
      case 'F':
        moveToWay(ship, val);
        break;
      case 'R':
        rotateWay(ship, -val);
        break;
      case 'L':
        rotateWay(ship, val);
        break;
      case 'N':
        moveLong(ship.way, val);
        break;
      case 'S':
        moveLong(ship.way, -val);
        break;
      case 'E':
        moveLat(ship.way, val);
        break;
      case 'W':
        moveLat(ship.way, -val);
        break;
    }
  }
  console.log(Math.abs(ship.x) + Math.abs(ship.y));
}

// For Part 1

function moveForward(ship, val) {
  let {x, y, dir} = ship;
  x += Math.cos(deg2Rad(dir)) * val;
  y += Math.sin(deg2Rad(dir)) * val;
  ship.x = x;
  ship.y = y;
}

function turn(ship, val) {
  let dir = (ship.dir + val);
  if(dir < 0) dir += 360;
  dir = dir % 360;
  ship.dir = dir;
}

function moveLong(ship, val) {
  ship.y += val;
}

function moveLat(ship, val) {
  ship.x += val;
}

function deg2Rad(deg) {
  return (deg/360) * 2 * Math.PI;
}

// For Part 2

function moveToWay(ship, val) {
  ship.x += ship.way.x * val;
  ship.y += ship.way.y * val;
}

function rotateWay(ship, val) {
  let z = Math.sqrt(ship.way.x*ship.way.x + ship.way.y*ship.way.y);
  let theta = Math.acos(ship.way.x / z);
  if(ship.way.y < 0) theta = -theta;

  theta += deg2Rad(val);
  if(theta < 0) theta += (2*Math.PI);
  theta = theta % (2*Math.PI);

  let x = z * Math.cos(theta);
  let y = z * Math.sin(theta);
  ship.way.x = Math.round(x);
  ship.way.y = Math.round(y);
}
