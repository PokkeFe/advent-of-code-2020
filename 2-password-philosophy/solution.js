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
  validCountS = 0;
  validCountT = 0;

  for(const entry of input) {
    if(isValidSled(entry)) validCountS++;
    if(isValidToboggan(entry)) validCountT++;
  }

  console.log("Valid by Sled co.", validCountS);

  console.log("Valid by Toboggan co.", validCountT);
}

parseEntry = entry => {
  let item = {};
  arr = entry.split(':');
  item.pwd = arr[1].trim();
  arr = arr[0].split(' ');
  item.char = arr[1];
  arr = arr[0].split('-');
  item.num1 = parseInt(arr[0]);
  item.num2 = parseInt(arr[1]);
  return item;
}

isValidSled = entry => {
  if(entry == '') return false;
  let item = parseEntry(entry);
  count = 0;
  //pwd, char, min, max
  for(let i = 0; i < item.pwd.length; i++) {
    if(item.pwd.charAt(i) == item.char) count++;
  }

  if(count >= item.num1 && count <= item.num2) return true;
  return false;
}

isValidToboggan = entry => {
    if(entry == '') return false;
    let item = parseEntry(entry);
    count = 0;
    pwdLen = item.pwd.length;
    if(item.num1 - 1 < pwdLen) {
      if(item.pwd.charAt(item.num1 - 1) == item.char) count++;
    }
    if(item.num2 - 1 < pwdLen) {
      if(item.pwd.charAt(item.num2 - 1) == item.char) count++;
    }

    if(count == 1) return true;
    return false;
}
