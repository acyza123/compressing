'use strict';
const _dircompare = require('dir-compare');
const fs = require('fs');

/**
 * @param { any } obj obj
 * @return { string } string
 */
function objToStr(obj) {
  let result = '{';
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      result += `${key}: ${obj[key]},`;
    } else {
      result += `${key}: ${objToStr(obj[key])}`;
    }
  }
  return result + '}';
}

/**
 * @param { Array<any> } arr array
 * @return { string } string
 */
function arrToStr(arr) {
  let result = '[';
  for (const item of arr) {
    if (Array.isArray(item)) {
      result += arrToStr(item);
    }
    result += objToStr(item);
  }
  return result + ']';
}

module.exports.compareSync = function() {
  const result = _dircompare.compareSync.apply(undefined, arguments);
  result.diff = arrToStr(result.diffSet);
  if (result.equal === 4) return result;
  console.log('-----------------------------------');
  console.log(result);
  console.log('dir 1:%s \n dir 2:%s', fs.readdirSync(arguments[0]), fs.readdirSync(arguments[1]));
  console.log('-----------------------------------');
  return result;
};

