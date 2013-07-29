'use strict';

var parse = require('esprima').parse;

function commentEndLine (lines, lineno) {
  return lineno - 1;
}

/**
 * Finds any concecutive comment above the given line of code in the source.
 *
 * @name exports
 * @function
 * @param src {String} the JavaScript source
 * @param lineno {Number} the number where the function is located (1 based)
 */
var go = module.exports = function (src, lineno) {

  var ast      =  parse(src, { comment: true, range: true, loc: true });
  var lines    =  src.split('\n');
  var endline  =  commentEndLine(lines, lineno);

  var commentLines;
  var hasComment = ast.comments.some(function (c) {
      var el = c.loc.end.line;
      if (el === endline) {
        var sl = c.loc.start.line;
        commentLines = { start: sl, end: el };
        return true;
      }
    })

  return hasComment
    ? lines
      .slice(commentLines.start - 1, commentLines.end)
      .join('\n')
    : '';
};

var fs = require('fs');
var src = fs.readFileSync(__dirname + '/test/fixtures/one-line-comment.js', 'utf8');
var lineno = 7;

go(src, lineno)
