'use strict';

var parse = require('esprima').parse;

function isEmpty (s) {
  return (/^ *$/).test(s);
}

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
  var startline = comment.loc.start.line;

  for (var peek = startline - 1; peek > 0; peek--) {
    // accept other single line comments
    if (startlineIndexedComments[peek]) {
      startline = peek;
      continue;
    }

    // pass through empty lines
    if (isEmpty(lines[peek])) continue;

    // if we see anything else, we are done
    break;
  }

  return lines.slice(startline, endline + 1).join('\n')
}

function commentEndLine (lines, lineno) {
  var endline = lineno - 1;
  for (; endline > 0; endline--) {
    if (!isEmpty(lines[endline])) return endline;
  }
  return 0;
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
  // add empty line on on top as simple to make actual lines 1 based
  var lines    =  [ '' ].concat(src.split('\n'));
  var endline  =  commentEndLine(lines, lineno);

  // no comment related to the function found?
  if (endline < 1) return '';

  var startlineIndexedComments = indexCommentsByStartLine(ast.comments);
  var endlineIndexedComments = indexCommentsByEndLine(ast.comments);

  var comment = endlineIndexedComments[endline];

  return comment ? grabEntireComment(comment, lines, startlineIndexedComments) : '';
};

// Test
if (!module.parent) {

  var fs = require('fs');
  var src = fs.readFileSync(__dirname + '/test/fixtures/block-comment-multi.js', 'utf8');
  var lineno = 13;

  var ast  =  parse(src, { comment: true, range: true, loc: true });
  go(src, lineno)

}
