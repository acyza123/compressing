'use strict';
const _dircompare = require('dir-compare');
const fs = require('fs');
module.exports.compareSync = function() {
  const result = _dircompare.compareSync.apply(undefined, arguments);
  result.dir1 = fs.readdirSync(arguments[0]);
  result.dir2 = fs.readdirSync(arguments[1]);
  if (result.equal === 4) return result;
  console.log('-----------------------------------');
  console.log(result);
  console.log('dir 1:%s \n dir 2:%s', fs.readdirSync(arguments[0]), fs.readdirSync(arguments[1]));
  console.log('-----------------------------------');
  return result;
};

