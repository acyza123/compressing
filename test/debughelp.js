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
    if (typeof obj[key] === 'object') {
      result += `${key}: ${objToStr(obj[key])},`;
    } else if (Array.isArray(obj[key])) {
      result += `${key}: ${arrToStr(obj[key])},`;
    } else {
      result += `${key}: ${obj[key]},`;
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

function eqF(path1, path2) {
  function thr(m, s, s1) {
    throw new Error(`message:${m},path1:${path1}\npath2:${path2}\ndir1:${s}\ndir2:${s1}`);
  }
  const dir1 = fs.readdirSync(path1);
  const dir2 = fs.readdirSync(path2);
  if (dir1.length !== dir2.length) thr('length', dir1.toString(), dir2.toString());
  for (let i = 0; i < dir1.length; i++) {
    if (dir1[i] !== dir2[i]) thr('name', dir1[i], dir2[i]);
    fs.statSync(path1 + '/' + dir1[i])
    .isDirectory() && eqF(path1 + '/' + dir1[i], path2 + '/' + dir2[i]);
  }
}

module.exports.compareSync = function() {
  // eqF.apply(undefined, arguments);
  const result = _dircompare.compareSync.apply(undefined, arguments);
  // result.diff = arrToStr(result.diffSet);
  // if (result.equal === 4) return result;
  // console.log('-----------------------------------');
  // console.log(result);
  // console.log('dir 1:%s \n dir 2:%s', fs.readdirSync(arguments[0]), fs.readdirSync(arguments[1]));
  // console.log('-----------------------------------');
  return result;
};

