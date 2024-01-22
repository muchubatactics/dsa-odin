/*
*
*
* LINKED LIST WITH KEY VALUE PAIR
*
*
*/

function Node(key = null, val = null) {
  return {
    key: key,
    value: val,
    nextNode: null,
  };    
}

function LinkedList() {
  let headRef = null;
  let tailRef = null;

  function append(key, value) {
    if (!headRef) {
      headRef = Node(key, value);
      tailRef = headRef;
    } else {
      tailRef.nextNode = Node(key, value);
      tailRef = tailRef.nextNode;
    }
  }

  function prepend(key, value) {
    if (!headRef) {
      headRef = Node(key, value);
      tailRef = headRef;
    } else {
      let temp = Node(key, value);
      temp.nextNode = headRef;
      headRef = temp;
    }
  }

  function head() {
    return headRef;
  }

  function tail() {
    return tailRef;
  }

  function size() {
    let num = 0, ref = headRef;
    while (ref) {
      num++;
      ref = ref.nextNode;
    }
    return num;
  }

  function at(index) {
    if (index < 0) return null;
    let num = 0, ref = headRef;
    while (ref) {
      if (num == index) return ref;
      num++;
      ref = ref.nextNode;
    }
    return null;
  }

  function pop() {
    if (!headRef) return;
    if (headRef === tailRef) {
      headRef = null;
      tailRef = null;
      return;
    }
    let ref = headRef, refB = ref, i = 0;
    while (ref) {
      if (i > 1) refB = refB.nextNode;
      ref = ref.nextNode;
      i++;
    }
    refB.nextNode = null;
    tailRef = refB;
  }

  function contains(key) {
    let ref = headRef;
    while (ref) {
      if (ref.key === key) return true;
      ref = ref.nextNode;
    }
    return false;
  }

  function find(key) {
    let ref = headRef, i = 0;
    while (ref) {
      if (ref.key === key) return i;
      i++;
      ref = ref.nextNode;
    }
    return null;
  }

  function toString() {
    let str = '';
    let node = headRef;
    while (true) {
      if (!node) {
        str += 'null';
        break;
      }
      str += `(${ node.key}: ${ node.value }) -> `;
      node = node.nextNode;
    }
    return str;
  }

  function insertAt(key, value, index) {
    // not getting after from before for cases where index = 0
    let before = at(index - 1);
    let after = at(index);
    
    if (!before && after) {
      prepend(key, value);
      return;
    }
    if (!after && before) {
      append(key, value);
      return;
    }
    if (after && before) {
      let temp = Node(key, value);
      before.nextNode = temp;
      temp.nextNode = after;
    }
    
  }

  function removeAt(index) {
    // not getting after from before for cases where index = 0
    let x = at(index);
    if (!x) return;
    let before = at(index - 1);
    let after = x.nextNode;
    
    if (!before) {
      headRef = x.nextNode;
      x = null;
      return;
    }
    if (!after) {
      pop();
      return;
    }

    before.nextNode = after;
    x = null;
  }

  return {
    append, prepend, head, tail,
    size, at, pop, contains, find,
    toString, insertAt, removeAt,
  };
}

module.exports = {Node, LinkedList};