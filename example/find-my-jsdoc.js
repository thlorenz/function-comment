var functionComment = require('../');
var fs = require('fs');

/**
 * Adds c to d and then multiplies the result with d.
 * 
 * @name doingStuff
 * @function
 * @param c {Number}
 * @param d {Number}
 * @return {Number} overall result
 */
function doingStuff (c, d) {
  return (c + d) * d
}

// the function whose comment we are trying to find is on line 13
var lineno = 13; 

fs.readFile(__filename, 'utf8', function (err, src) {
  if (err) return console.error(err);
  
  var res = functionComment(src, lineno);
  console.log(res.comment);
  console.log('start: ', res.startline);
  console.log('end:   ', res.endline);
});
