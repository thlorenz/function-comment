'use strict';
/*jshint asi: true */

var fs = require('fs');
var test = require('tape')
var fncomment = require('../')

function check(t, fixture, src, lineno, comment) {
  if (Array.isArray(comment)) comment = comment.join('\n');

  var res = fncomment(src, lineno);
  t.equal(res.comment, comment, fixture)
}

test('\nline comment(s) right above function', function (t) {

  var src = fs.readFileSync(__dirname + '/fixtures/line-comment-single.js', 'utf8');
  check(t, 'line-comment-single', src , 7, '// this is the comment to find');

  check(
      t
    , 'line-comment-multi'
    ,  fs.readFileSync(__dirname + '/fixtures/line-comment-multi.js', 'utf8')
    , 8
    , [ '// this is the comment to find',
        '// needs to find this line as well',
        '// and this one' ]
  );
  t.end()
})

test('\nline comment(s) above function with empty lines in between', function (t) {

  var src = fs.readFileSync(__dirname + '/fixtures/line-comment-empty-lines-single.js', 'utf8');
  check(t, 'line-comment-empty-lines-single', src, 9, '// this is the comment to find');

  check(
      t
    , 'line-comment-empty-lines-multi'
    , fs.readFileSync(__dirname + '/fixtures/line-comment-empty-lines-multi.js', 'utf8')
    , 9
    , [ '// this is the comment to find',
        '// needs to find this line as well',
        '// and this one' ]
  );

  check(
      t
    , 'line-comment-scattered'
    , fs.readFileSync(__dirname + '/fixtures/line-comment-scattered.js', 'utf8')
    , 12
    , [ '// this is the comment to find',
        '',
        '// needs to find this line as well',
        '//',
        '// and this one' ]
  );
  t.end()
})

test('\nblock comment(s) right above function', function (t) {

  var src = fs.readFileSync(__dirname + '/fixtures/block-comment-single.js', 'utf8');
  check(t, 'block-comment-single', src , 7, '/* this is the comment to find */');

  check(
      t
    , 'block-comment-multi'
    , fs.readFileSync(__dirname + '/fixtures/block-comment-multi.js', 'utf8')
    , 13
    , [ '/* this is the comment to find */',
        '/* and this */',
        '/**',
        ' * And this jsdoc',
        ' * @name withcomment',
        ' * @function',
        ' */' ]  
  );

  t.end()
  
})

test('\nblock comment(s) above function with empty lines in between', function (t) {

  check(
      t
    , 'block-comment-empty-lines-single'
    , fs.readFileSync(__dirname + '/fixtures/block-comment-empty-lines-single.js', 'utf8')
    , 14
    , [ '/**',
      ' * jdoc for this function with a few empty lines in between',
      ' * @name withcomment',
      ' * @function',
      ' */' ]  
  );

  check(
      t
    , 'block-comment-scattered'
    , fs.readFileSync(__dirname + '/fixtures/block-comment-scattered.js', 'utf8')
    , 12
    , [ '/* this is the comment to find */',
        '',
        '/* needs to find this line as well */',
        '/*',
        ' * and this one */' ]
  );
  t.end()
})

test('\nmixed and scattered comments', function (t) {
  
  check(
      t
    , 'mixed-comments-scattered'
    , fs.readFileSync(__dirname + '/fixtures/mixed-comments-scattered.js', 'utf8')
    , 20 
    , [ '// this is the comment to find',
        '',
        '// needs to find this line as well',
        '//',
        '// and this one',
        '',
        '/**',
        ' * And this jsdoc',
        ' * ',
        ' * @name withcomment',
        ' * @function',
        ' */' ]
  );
  t.end()
})

test('\nfix parse error on script level return', function (t) {
  check(
      t
    , 'fix-parse-error-script-level-return'
    , fs.readFileSync(__dirname + '/fixtures/fix-parse-error-script-level-return.js', 'utf8')
    , 3
    , [ '// comment to find' ]
  );
  t.end();
})
