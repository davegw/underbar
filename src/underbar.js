/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.slice(Math.max.call(null, array.length-n, 0));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (collection.length) {
      for (var i=0; i<collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    else {
      for (var i in collection) {
        iterator(collection[i], i, collection)
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filteredArray = [];
    _.each(collection, function(item) {
      test(item) && filteredArray.push(item);
    });
    return filteredArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var filteredArray = _.filter(collection, test);
    var rejectArray = [];
    _.each(collection, function(item) {
      item === filteredArray[0] ? filteredArray.shift() : rejectArray.push(item);
    });
    return rejectArray;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqArr = []
    _.each(array, function(item, index) {
      if (_.indexOf(array, item) === index) {
        uniqArr.push(item);
      }
    });
    return uniqArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapArray = []
    _.each(collection, function(item, index) {
      mapArray.push(iterator(item, index));
    });
    return mapArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {  
    return _.map(collection, function(item) {
      return (typeof functionOrKey === "function" ? functionOrKey : item[functionOrKey]).apply(item, args)
    })
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    accumulator = accumulator || 0;
    _.each(collection, function(item) {
      // Set accumulator to the current value of iterator.
      // Iterator will run again using the new value of accumulator and the next item.
      accumulator = iterator(accumulator, item);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // Handle empty iterator edge case.
    if (!iterator) {
      return true;
    }
    return _.reduce(collection, function(allFound, item) {
      // If previous item was not found, continue returning false for remainder of reduce function.
      if (!allFound) {
        return false;
      }
      // Otherwise test the next item in iterator function.
      return !(iterator(item) == null || iterator(item) == false) ;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // Handle empty array edge case.
    if (collection.length === 0) {
      return false;
    }
    return _.reduce(collection, function(foundOne, item) {
      // If previous item was found, continue returning true for remainder of reduce function.
      if (foundOne) {
        return true;
      }
      // Otherwise use every function to test next item in iterator function.
      return _.every([item], iterator);
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // Get all arguments passed beside the obj argument.
    var argArray = Array.prototype.slice.call(arguments, 1)
    // For each argument, get each item in the argument.
    _.each(argArray, function(argItem) {
      // For each item in argument, add or replace the property and value to obj.
      _.each(argItem, function(value, property) {
        obj[property] = value;
      })
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var argArray = Array.prototype.slice.call(arguments, 1);
    // For each argument, get each item in the argument.
    _.each(argArray, function(argItem) {
      // For each item in argument, check if item is in obj and add to obj if it does not already exist.
      _.each(argItem, function(value, property) {
        (property in obj) || (obj[property] = value);
      })
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var argObj = {};
    return function() {
      var arg = arguments[0];
      // Check if func has been run using the argument before.
      if (!(arg in argObj)) {
        // Run the function and store the argument and value.
        argObj[arg] = func.apply(this, arguments)
      }
      // Return the stored value for the argument.
      return argObj[arg];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // Store the arguments from the original function.
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      // Apply the stored arguments to func.
      func.apply(this, args);
    },
    wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var randomArray = array;
    var shuffleArray = array;
    // Create an array of objects containing random values and the original array values.
    randomArray = _.map(randomArray, function(item) {
      return {randomIndex : Math.random(), value : item};
    });

    // Sort the randomArray by randomIndex value.
    randomArray.sort(function(a,b) {
      if (a.randomIndex - b.randomIndex < 0) {
        return -1;
      }
      if (a.randomIndex - b.randomIndex > 0) {
        return 1;
      };
      return 0;
    });

    // Map the sorted random values in randomArray onto shuffleArray.
    return _.map(shuffleArray, function(item, index) {
      return randomArray[index]["value"];
    });
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === "function") {
      var mapArray = [];
      var sortArray = collection;

      // Create array of only values to sort.
      mapArray = _.map(collection, iterator);

      // Combine collection values with values to sort as objects.
      sortArray = _.map(sortArray, function(item, index) {
        return {orig : item, mapped : mapArray[index]};
      });

      // Sort the combined array using the values to sort.
      sortArray.sort(function(a,b) {
        if (a.mapped == b.mapped) {
          return 0;
        }
        // Null and undefined arguments always get sorted to end of array.
        if (a.mapped == null) {
          return 1;
        };
        if (b.mapped == null) {
          return -1;
        };
        return (a.mapped > b.mapped ? 1 : -1);
      });

      // Remove the values to sort and return only the collection values, now properly sorted.
      return _.map(sortArray, function(item) {
        return item["orig"];
      });
    }

    // Sort if iterator is a string.
    return collection.sort(function(a,b) {
      if (a == b) {return 0;};
      // Null and undefined arguments always get sorted to end of array.
      if (a == null) {return 1;};
      if (b == null) {return -1;};
      return a[iterator] > b[iterator] ? 1 : -1;
    })
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var argsArray = Array.prototype.slice.call(arguments, 0);
    var array = [];

    // Set the array length equal to the longest argument's length.
    array.length = _.reduce(argsArray, function(largest, item) {
      if (item.length > largest) {
        largest = item.length;
      }
      return largest;
    }, 0);

    return _.map(array, function(item, index) {
      var tempArr = [];
      // For each argument array, add element value to array. 
      _.each(argsArray, function(argArray, argIndex) {
        if (index < argArray.length) {
          tempArr.push(argArray[index]);
        }
        // If there are no more elements in the argument array add undefined to array.
        else {
          tempArr.push(undefined);
        }
      });
      return tempArr;
    });
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    // Set result to empty array if it has not been defined.
    result = result || [];
    _.each(nestedArray, function(item, index) {
      // If item is an array item, run flatten on the item again otherwise add item to result.
      if (Array.isArray(item)) {
        return _.flatten(item, result);
      }
      else {
        return result.push(item);        
      }
    });
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments, 0);

    // Handle edge cases when there are no or one argument.
    if (args.length < 2) {
      return (args.length === 1 ? args[0] : []);
    }

    var intersectedArray = args[0];
    var compareArrays = args.slice(1);

    _.each(compareArrays, function(array, arrIndex) {
      // Add item to intersectedArray if item is in intersectedArray.
      intersectedArray = _.filter(array, function(item) {
        if (_.indexOf(intersectedArray, item) !== -1) {
          return item;
        }
      });
    });
    return intersectedArray;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments, 1);

    // Handle edge case where no comparison arrays are provided.
    if (args.length < 1) {
      return array;
    }

    var differenceArray = array;
    _.each(args, function(argArray, argIndex) {
      // If differenceArray item is not in argArray, add to differenceArray.
      differenceArray = _.filter(differenceArray, function(item, index) {
        if(_.indexOf(argArray, item) === -1) {
          return item;
        }
      });
    });
    return differenceArray;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var result, lastCalled = 0, timeout;
    var ready = true;
    // Runs the function and resets variables.
    var runFunc = function() {
      ready = false;
      lastCalled = Date.now();
      timeout = null;
      result = func.apply(this, arguments);
    }
    
    return function() {
      var remaining = wait - (Date.now() - lastCalled);
      // Run the function if it's first function call or wait has expired.
      if (ready || remaining < 0) {
        runFunc();
      }
      // Don't schedule another function call if timeout has already been set.
      else if (timeout) {}
      // Schedule function to run after timeout expires.
      else {
        timeout = remaining;
        setTimeout(function() {
          runFunc();
        }, timeout);
      }
      return result;
    }
  };

}).call(this);
