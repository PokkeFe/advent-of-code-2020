const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.resolve(__dirname, 'input'));

chunks = [];
stream.on('data', chunk => {
  chunks.push(chunk);
})

stream.on('end', _ => {
  input = Buffer.concat(chunks).toString('utf8').split('\n\n');
  solve(input);
})


solve = input => {
  let validCount = 0;
  for(let i = 0; i < input.length; i++) {
    if(isValid(input[i])) validCount++;
  }

  console.log(validCount);
}

const newlineRegex = new RegExp('\\n','g');

isValid = entry => {
  // fail empty
  entry = entry || '';
  if(entry == '') return false;

  entry = entry.replace(newlineRegex, ' ');
  // normalize data
  const passport = entry.trim().split(' ');
  let ppd = 0;

  for(let str of passport) {
    switch(str.substr(0, 3)){
      case 'byr':
        year = parseInt(str.split(':')[1]);
        if(year >= 1920 && year <= 2002) ppd = ppd | (1 << 0);
        break;
      case 'iyr':
        year = parseInt(str.split(':')[1]);
        if(year >= 2010 && year <= 2020) ppd = ppd | (1 << 1);
        break;
      case 'eyr':
        year = parseInt(str.split(':')[1]);
        if(year >= 2020 && year <= 2030) ppd = ppd | (1 << 2);
        break;
      case 'hgt':
        valid = false;
        format = str.slice(-2);
        num = str.slice(4, -2);
        if(format == 'in') {
          if(num >= 59 && num <= 76) valid = true;
        }
        if(format == 'cm') {
          if(num >= 150 && num <= 193) valid = true;
        }
        if(valid) ppd = ppd | (1 << 3);
        break;
      case 'hcl':
        valid = false;
        haircolor = str.split(':')[1];
        if(haircolor.length != 7) break;
        if(haircolor.charAt(0) == '#') {
          validChars = 0;
          for(i = 1; i <= haircolor.length; i++) {
            code = haircolor.charCodeAt(i);
            if((code >= 48 && code <= 57) || (code >= 97 && code <= 102)) validChars++;
          }
          if(validChars == 6) valid = true;
        }
        if(valid) ppd = ppd | (1 << 4);
        break;
      case 'ecl':
        valid = false;
        col = str.split(':')[1];
        if(col == 'amb' || col == 'blu' || col == 'brn' || col == 'gry' || col == 'grn' || col == 'hzl' || col == 'oth') valid = true;
        if(valid) ppd = ppd | (1 << 5);
        break;
      case 'pid':
        valid = false;
        num = str.split(':')[1];
        if(num.length != 9) break;
        validChars = 0;
        for(i = 0; i < num.length; i++) {
          code = num.charCodeAt(i);
          if(code >= 48 && code <= 57) validChars++;
        }
        if(validChars == 9) valid = true;
        if(valid) ppd = ppd | (1 << 6);
        break;
      case 'cid':
        ppd = ppd | (1 << 7);
        break;
    }
  }

  if((ppd & 127) == 127) {
    return true;
  }
  // if(byr && iyr && eyr && hgt && hcl && ecl && pid) return true;
  return false;

}
