/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Global This - its the default this. the whole forest of javascript
* 2. Implicit This - This inside the tree, the tree is thinking about itself, it doesnt say it but it knows its talking about itself
* 3. Explicit This - calling applying or binding a function explicitly to an object. do it to this!
* 4. New - this is a new object
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
//console.log(this);

// Principle 2

// code example for Implicit Binding
const someObject = {
    prop1: "value1",
    prop2: "value2",
    meth1: function(){
        console.log(`${this.prop1}`);
    }
};

// Principle 3

// code example for New Binding

const someArray = new Array();

// Principle 4

// code example for Explicit Binding
Array.sort.call(someArray);