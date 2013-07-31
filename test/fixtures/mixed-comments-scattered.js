function other () {
  console.log('hello');
}

// but not this one
function foo () { }
// this is the comment to find

// needs to find this line as well
//
// and this one

/**
 * And this jsdoc
 * 
 * @name withcomment
 * @function
 */

function withcomment () {
  console.log('hi');
}
