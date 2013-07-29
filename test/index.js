'use strict';
/*jshint asi: true */

var fs = require('fs');
var test = require('tape')
var fncomment = require('../')

function check(t, fixture, lineno, comment) {
  var src = fs.readFileSync(__dirname + '/fixtures/' + fixture + '.js', 'utf8');
  var res = fncomment(src, lineno);
  t.equal(res, comment, fixture)
}

test('\nnone line comment(s) right above function', function (t) {
  check(t, 'one-line-comment-single', 7, '// this is the comment to find');
  t.end()
})
