const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.resolve(__dirname, 'input'));

chunks = [];

let rules = {};
let vals = {};

stream.on('data', chunk => {
  chunks.push(chunk);
})

stream.on('end', _ => {
  input = Buffer.concat(chunks).toString('utf8').split('\n');
  console.log("Solution to Part 1");
  solve1(input);
  console.log("Solution to Part 2");
  solve2(input);
})

solve1 = input => {
  let queue = [];
  let index = 0;
  let containCount = 0;
  queue.push('shiny gold')
  for(let entry of input) {
    let rule = parseRule(entry);
    if(rule == undefined) continue;
    rules[rule.source] = rule;
  }
  while(index < queue.length) {
    let bag = queue[index];
    index++;
    Object.keys(rules).forEach(key => {
      let rule = rules[key];
      if(rule.bags[bag] != undefined) {
        if(queue.indexOf(rule.source) == -1) {
          queue.push(rule.source);
        };
      }
    });
  }
  console.log(queue.length - 1);
}

solve2 = input => {
  for(let entry of input) {
    let rule = parseRule(entry);
    if(rule == undefined) continue;
    rules[rule.source] = rule;
  }
  console.log(getVal('shiny gold'));
}

parseRule = line => {
  if(line == '') return undefined;
  let t = line.split(" bags contain ")
  let source_bag = t[0];
  let rule = {
    source: source_bag,
    bags: {}
  }
  if(t[1] == 'no other bags.') return rule;
  let rest = t[1].replace(/bags|bag/gi, "");
  rest = rest.slice(0, -1);
  rest = rest.split(',');
  rest.forEach($t => {
    let raw = $t.trim();
    let val = parseInt(raw.slice(0, 1));
    let bag = raw.slice(1).trim();
    rule.bags[bag] = val;
  });

  return rule;
}

getVal = (bag) => {
  if(vals[bag] != undefined) {
    return vals[bag];
  } else {
    let sum = 0;
    Object.keys(rules[bag].bags).forEach(key => {
      sum += rules[bag].bags[key];
      sum += (rules[bag].bags[key] * getVal(key));
    });
    return sum;
  }
}
