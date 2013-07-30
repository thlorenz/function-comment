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

// NOTE: linenos are 1 based since that is how esprima returns line locations as well
test('\nline comment(s) right above function', function (t) {
  check(t, 'line-comment-single', 7, '// this is the comment to find');

  check(
      t
    , 'line-comment-multi'
    , 8
    , [ '// this is the comment to find',
        '// needs to find this line as well',
        '// and this one' ]
  );
  t.end()
})

test('\nline comment(s) above function with empty lines in between', function (t) {
  check(t, 'line-comment-empty-lines-single', 9, '// this is the comment to find');

  check(
      t
    , 'line-comment-empty-lines-multi'
    , 9
    , [ '// this is the comment to find',
        '// needs to find this line as well',
        '// and this one' ]
  );

  check(
      t
    , 'line-comment-scattered'
    , 12
    , [ '// this is the comment to find',
        '',
        '// needs to find this line as well',
        '//',
        '// and this one' ]
  );
  t.end()
})
