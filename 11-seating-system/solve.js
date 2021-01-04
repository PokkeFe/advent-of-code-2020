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
  let state = [...(input.slice(0, -1))].map(row => {
    return row.split('');
  });

  let newState;

  while(1) {
    newState = getNewState([...state], 1);
    if(areEqual(state, newState)) break;
    state = newState;
  };
  let count = 0;
  for(let y = 0; y < state.length; y++) {
    for(let x = 0; x < state[y].length; x++) {
      if(state[y][x] == '#') count++;
    }
  }
  console.log(`${count} chairs occupied.`);
}

solve2 = input => {
  let state = [...(input.slice(0, -1))].map(row => {
    return row.split('');
  });

  let newState;

  let testState = ['.##.##.'.split(''),
                   '#.#.#.#'.split(''),
                   '##...##'.split(''),
                   '...L...'.split(''),
                   '##...##'.split(''),
                   '#.#.#.#'.split(''),
                   '.##.##.'.split('')];
  //console.log(testState);

  //console.log(getAdjCount2(0, 0, testState));

  while(1) {
    newState = getNewState([...state], 2);
    if(areEqual(state, newState)) break;
    state = newState;
  };

  let count = 0;
  for(let y = 0; y < state.length; y++) {
    for(let x = 0; x < state[y].length; x++) {
      if(state[y][x] == '#') count++;
    }
  }
  console.log(`${count} chairs occupied.`);

}

getNewState = (state, adjType) => {
  let newState = deepCopy(state);

  for(let y = 0; y < state.length; y++) {
    for(let x = 0; x < state[y].length; x++) {
      newState[y][x] = getSeatState(x, y, state, adjType);
    }
    //if(adjType == 2) console.log(newState[y].join());
  }
  return newState;
}

getSeatState = (x, y, state, adjType) => {
  let mych = state[y][x];
  let getAdjCount = getAdjCount1;
  let tolerance = 4;
  if(adjType == 2) {
    getAdjCount = getAdjCount2;
    tolerance = 5;
  }
  switch(mych) {
    case 'L':
      let c = getAdjCount(x, y, state);
      if(c == 0) {
        return '#';
      } else {
        return 'L';
      }
      break;
    case '#':
      if(getAdjCount(x, y, state) >= tolerance) {
        return 'L';
      } else {
        return '#';
      }
      break;
  }
  return mych;
}


getAdjCount1 = (x, y, state) => {
  let mych = state[y][x];
  let count = 0;
  let a, b;
  a = y-1, b = x-1;
  count += countChair(a, b, state);
  a = y-1, b = x;
  count += countChair(a, b, state);
  a = y-1, b = x+1;
  count += countChair(a, b, state);
  a = y, b = x-1;
  count += countChair(a, b, state);
  a = y, b = x+1;
  count += countChair(a, b, state);
  a = y+1, b = x-1;
  count += countChair(a, b, state);
  a = y+1, b = x;
  count += countChair(a, b, state);
  a = y+1, b = x+1;
  count += countChair(a, b, state);
  return count;
}

getAdjCount2 = (x, y, state) => {
  let mych = state[y][x];
  let count = 0;
  let a, b;
  let o = {x: x, y: y};
  let dir = {x: 0, y: 0};
  dir.y = -1, dir.x = -1;
  count += countChair2(o, dir, state);
  //console.log(`top - left  : ${count}`);
  dir.y = -1, dir.x = 0;
  count += countChair2(o, dir, state);
  //console.log(`top - mid   : ${count}`);
  dir.y = -1, dir.x = 1;
  count += countChair2(o, dir, state);
  //console.log(`top - right : ${count}`);
  dir.y = 0, dir.x = -1;
  count += countChair2(o, dir, state);
  //console.log(`mid - left  : ${count}`);
  dir.y = 0, dir.x = 1;
  count += countChair2(o, dir, state);
  //console.log(`mid - right : ${count}`);
  dir.y = 1, dir.x = -1;
  count += countChair2(o, dir, state);
  //console.log(`bot - left  : ${count}`);
  dir.y = 1, dir.x = 0;
  count += countChair2(o, dir, state);
  //console.log(`bot - mid   : ${count}`);
  dir.y = 1, dir.x = 1;
  count += countChair2(o, dir, state);
  //console.log(`bot - right : ${count}`);
  return count;
}

function countChair(a, b, state) {
  let y = a;
  let x = b;
  if(x < 0 || y < 0 || x >= state[0].length || y >= state.length) return 0;
  if(state[a][b] == '#') {
    return 1;
  };
  return 0;
}

function countChair2(origin, dir, state) {
  let x = origin.x;
  let y = origin.y;
  x += dir.x;
  y += dir.y;
  while(x >= 0 && x < state[0].length && y >= 0 && y < state.length) {
    //console.log(state[y][x]);
    if(state[y][x] == '#') {
      return 1;
    } else if(state[y][x] == 'L') {
      return 0;
    }
    x += dir.x;
    y += dir.y;
  }
  return 0;
}

function deepCopy(arr) {
  let newArr = [];
  for(let row = 0; row < arr.length; row++) {
    newArr.push([...arr[row]]);
  }
  return newArr;
}

function areEqual(arr1, arr2) {
  if(arr1.length != arr2.length) return false;

  for(let y = 0; y < arr1.length; y++) {
    for(let x = 0; x < arr1.length; x++) {
      if(arr1[y][x] != arr2[y][x]) {
        // console.log(y, x, 'false');
        // console.log(`${arr1[y][x]}, ${arr2[y][x]}`)
        return false;
      }
    }
  }

  return true;
}
