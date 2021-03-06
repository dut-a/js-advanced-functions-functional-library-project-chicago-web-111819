const fi = (() => {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0';
    },

    each: function(collection, callbackFn) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);
      for (let i = 0; i < newCollection.length; i++) {
        callbackFn(newCollection[i]);
      }
      return collection;
    },

    map: function(collection, callbackFn) {
      const outputArray = [];
      if (!(collection instanceof Array)) {
        collection = Object.values(collection);
      }
      for (let i = 0; i < collection.length; i++) {
        outputArray.push(callbackFn(collection[i]));
      }
      return outputArray;
    },

		reduce: function(c = [], callback = () => {}, accumulator) {
			let collection = c.slice(0);
			if (!accumulator) {
				accumulator = collection[0];
				collection = collection.slice(1);
			}
			// let len = collection.length;
			for (let i = 0; i < collection.length; i++) {
				accumulator = callback(accumulator, collection[i], collection);
      }
			return accumulator;
		},

    find: function(collection, predicate) {
      if (!(collection instanceof Array)) {
        collection = Object.values(collection);
      }
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) return collection[i];
      }
      return undefined;
    },

    filter: function(collection, predicate) {
      const resultingArray = [];
      if (!(collection instanceof Array)) {
        collection = Object.values(collection);
      }
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          resultingArray.push(collection[i]);
        }
      }
      return resultingArray;
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length;
    },

    first: function(collection, stop = false) {
      return (stop) ? collection.slice(0, stop) : collection[0];
    },

    last: function(collection, start = false) {
      return (start) ? collection.slice(collection.length - start, collection.length) : collection[collection.length - 1];
    },

    compact: function(collection) {
      const unwanted = new Set([false, null, 0, "", undefined, NaN]);
      return collection.filter(element => !unwanted.has(element));
    },

    sortBy: function(collection, callback) {
      const resultingArray = [...collection];
      return resultingArray.sort((a, b) => {
        return callback(a) - callback(b);
      });
    },

    unpack: function(receiver, givenArray) {
      for (let item of givenArray) {
        receiver.push(item);
      }
    },

    flatten: function(collection, shallow, resultingArray = []) {
      if (!Array.isArray(collection)) {
        return resultingArray.push(collection);
      }
      if (shallow) {
        for (let value of collection) {
          Array.isArray(value) ? this.unpack(resultingArray, value) : resultingArray.push(value);
        }
      } else {
        for (let value of collection) {
          this.flatten(value, false, resultingArray);
        }
      }
      return resultingArray;
    },

    uniqSorted: function(collection, callbackFn) {
      const sorted = [collection[0]];
      for (let i = 1; i < collection.length; i++) {
        if (sorted[i - 1] !== collection[i]) {
          sorted.push(collection[i]);
        }
      }
      return sorted;
    },

    uniq: function(collection, sorted = false, callbackFn = false) {
      if (sorted) {
        return fi.uniqSorted(collection, callbackFn);
      } else if (!callbackFn) {
        return Array.from(new Set(collection));
      } else {
        const modifiedvalues = new Set();
        const uniqvalues = new Set();
        for (let value of collection) {
          const moddedvalue = callbackFn(value);
          if (!modifiedvalues.has(moddedvalue)) {
            modifiedvalues.add(moddedvalue);
            uniqvalues.add(value);
          }
        }
        return Array.from(uniqvalues);
      }
    },

    keys: function(obj) {
      const keys = [];
      for (let key in obj) {
        keys.push(key);
      }
      return keys;
    },

    values: function(obj) {
      const values = [];
      for (let key in obj) {
        values.push(obj[key]);
      }
      return values;
    },

    functions: function(obj) {
      const functionNames = [];
      for (let key in obj) {
        if (typeof obj[key] === "function") {
          functionNames.push(key);
        }
      }
      return functionNames.sort();
    }
  }
})();


// Mic check, one, two...
console.log("Functions in here: ", fi.functions(fi).join(", "));


// some browser noise...
document.addEventListener("DOMContentLoaded", () => {
  let txt = fi.libraryMethod().split(" ");
  let regular = txt.slice(0, 3).join(" ");
  let lnk = txt.slice(-1);
  let d = document.querySelector('#content');
  d.innerHTML = `<p>${regular} <a href="${lnk}" target="_blank">${lnk}</a></p>`;
});


