/*
* 
*   LINKED LIST 
* 
*/

const {Node, LinkedList} = require('../linked-list/newscript');

/*
*
*    HASH MAP
*
*/

function HashMap() {
  const loadFactor = 0.75;
  let capacity = 0, arraySize = 16;
  let array = [];

  function grow() {
    if (capacity > arraySize * loadFactor) arraySize *= 2;
  }

  // simple hash function from TOP 
  function hash(str) {
    let hashCode = 0;
    
    const primeNumber = 31;
    for (let i = 0; i < str.length; i++) {
      hashCode = primeNumber * hashCode + str.charCodeAt(i);
    }

    return hashCode % arraySize ;
  }

  function set(key, value) {
    let index = hash(key);
    let ll = array[index];
    if (ll) {
      let temp = ll.find(key);
      if (temp !== null) {
        temp = ll.at(temp);
        temp.value = value;
      } else {
        ll.append(key, value);
        capacity++;
      }
    } else {
      ll = LinkedList();
      ll.append(key, value);
      capacity++;
      array[index] = ll;
    }
    grow();
  }

  function get(key) {
    let index = hash(key);
    let ll = array[index];
    if (ll) {
      let temp = ll.find(key);
      if (temp !== null) return ll.at(temp).value;
    }
    return null;
  }

  function has(key) {
    let index = hash(key);
    let ll = array[index];
    if (ll) {
      let temp = ll.find(key);
      if (temp !== null) return true;
    }
    return false;
  }

  function remove(key) {
    if (!has(key)) return false;
    let index = hash(key);
    array[index].removeAt(
      array[index].find(key)
    );
    if (!array[index].size()) array[index] = null;
    capacity--;
    return true;
  }

  function length() {
    return capacity;
  }

  function clear() {
    array.length = 0;
    arraySize = 16;
    capacity = 0;
    console.log(array);
  }

  function keys() {
    let arr = [];
    array.forEach(function(ll) {
      if (ll) {
        let temp = ll.head();
        while (temp) {
          arr.push(temp.key);
          temp = temp.nextNode;
        }
      }
    });
    return arr;
  }

  function values() {
    let arr = [];
    array.forEach(function(ll) {
      if (ll) {
        let temp = ll.head();
        while (temp) {
          arr.push(temp.value);
          temp = temp.nextNode;
        }
      }
    });
    return arr;
  }

  function entries() {
    let arr = [];
    array.forEach(function(ll) {
      if (ll) {
        let temp = ll.head();
        while (temp) {
          arr.push([temp.key, temp.value]);
          temp = temp.nextNode;
        }
      }
    });
    return arr;
  }

  function toString() {
    let str = `HashMap, length = ${capacity}, ArrSize = ${arraySize}\n`;
    array.forEach((ll) => {
      if (ll) str = str.concat(ll.toString()).concat('\n');
    });
    return str;
  }


  return {
    hash, set, get, has, remove,
    length, clear, keys, values,
    entries, toString,
  };
}