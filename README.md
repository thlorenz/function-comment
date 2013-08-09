# function-comment [![build status](https://secure.travis-ci.org/thlorenz/function-comment.png)](http://travis-ci.org/thlorenz/function-comment)

[![testling badge](https://ci.testling.com/thlorenz/function-comment.png)](https://ci.testling.com/thlorenz/function-comment)

Given some JavaScript and the line on which a function is defined it returns comments and jsdocs found right above that function.

```js
var functionComment = require('function-comment');
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
```

**Output:**
```
/**
 * Adds c to d and then multiplies the result with d.
 *
 * @name doingStuff
 * @function
 * @param c {Number}
 * @param d {Number}
 * @return {Number} overall result
 */
start:  5
end:    13
```
## Installation

    npm install function-comment

## API

### *functionComment (src, lineno)*

```
/**
 * Finds any concecutive comment above the given line of code in the source.
 *
 * @name exports
 * @function
 * @param src {String} the JavaScript source
 * @param lineno {Number} the number where the function is located (1 based)
 * @return {Object} { 
 *    comment   :  comment string or empty if none was found
 *    startline :  line on which the comment starts or 0 if no comment was found
 *    endline   :  line on which the comment ends or 0 if no comment was found
 *  }
 */
 ```

## License

MIT
