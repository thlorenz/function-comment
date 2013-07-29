'use strict';

var parse = require('esprima').parse;

function indexCommentsByStartLine (comments) {
  return comments.reduce(function (acc, c) {
    acc[c.loc.start.line] = c;
    return acc;
  }, {})
}

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

  var indexedComments = indexCommentsByStartLine(ast.comments);

  var comment = indexedComments[endline];

  return comment
    ? lines
      .slice(comment.loc.start.line - 1, comment.loc.end.line)
      .join('\n')
    : '';
};

// Test
if (!module.parent) {

  var fs = require('fs');
  var src = fs.readFileSync(__dirname + '/test/fixtures/one-line-comment-single.js', 'utf8');
  var lineno = 7;

  var ast      =  parse(src, { comment: true, range: true, loc: true });
  var lines    =  src.split('\n');
  var endline  =  commentEndLine(lines, lineno);

  var indexedComments = indexCommentsByStartLine(ast.comments);

  var comment = indexedComments[endline];

}
