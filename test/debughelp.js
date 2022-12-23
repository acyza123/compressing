'use strict';
const _dircompare = require('dir-compare');
const fs = require('fs');
module.export.compareSync = function() {
  const result = _dircompare.compareSync.apply(undefined, arguments);
  console.log('-----------------------------------');
  console.log(result);
  if (result.equal === 4) {
    console.log('dir 1:%s \n %s', fs.readdirSync(arguments[0]), fs.readdirSync(arguments[1]));
  }
  console.log('-----------------------------------');
  return result;
};

