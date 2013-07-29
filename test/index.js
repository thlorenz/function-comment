'use strict';
/*jshint asi: true */

var fs = require('fs');
var test = require('tape')
var fncomment = require('../')

function check(t, fixture, lineno, comment) {
  if (Array.isArray(comment)) comment = comment.join('\n');

  var src = fs.readFileSync(__dirname + '/fixtures/' + fixture + '.js', 'utf8');
  var res = fncomment(src, lineno);
//  console.error(res.split('\n'));
  t.equal(res, comment, fixture)
}

test('\nnone line comment(s) right above function', function (t) {
  check(t, 'one-line-comment-single', 7, '// this is the comment to find');

  check(
      t
    , 'one-line-comment-multi'
    , 8
    , [ '// this is the comment to find',
        '// needs to find this line as well',
        '// and this one' ]
  );
  t.end()
})
