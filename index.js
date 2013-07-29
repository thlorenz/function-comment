'use strict';

var parse = require('esprima').parse;

function indexCommentsByStartLine (comments) {
  return comments.reduce(function (acc, c) {
    acc[c.loc.start.line] = c;
    return acc;
  }, {})
}

function indexCommentsByEndLine (comments) {
  return comments.reduce(function (acc, c) {
    acc[c.loc.end.line] = c;
    return acc;
  }, {})
}

function grabEntireComment (comment, lines, startlineIndexedComments) {
  // only called for single line comments
  var endline = comment.loc.end.line;
  var startline = endline;

  if (comment.type === 'Line') {
    for (; startline > 0; startline--) {
      // accept other single line comments
      if (startlineIndexedComments[startline] && startlineIndexedComments[startline].type === 'Line') continue;
      // or empty lines
      if (!lines[startline].trim().length) continue;

      // if we see anything else, we are done
      break;
    }
  }

  return lines
    .slice(startline, endline)
    .join('\n')
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

  var startlineIndexedComments = indexCommentsByStartLine(ast.comments);
  var endlineIndexedComments = indexCommentsByEndLine(ast.comments);

  var comment = endlineIndexedComments[endline];

  return comment ? grabEntireComment(comment, lines, startlineIndexedComments) : '';
};

// Test
if (!module.parent) {

  var fs = require('fs');
  var src = fs.readFileSync(__dirname + '/test/fixtures/one-line-comment-multi.js', 'utf8');
  var lineno = 8;

  go(src, lineno)

}
