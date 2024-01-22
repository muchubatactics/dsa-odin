/*
*
*
*
*
*/

const mergeSort = require('../merge-sort/script.js');

function Node(val = null, left = null, right = null) {
  return {
    value: val,
    left: left,
    right: right,
  };
}

function Tree(arr) {
  let root = buildTree(arr);
  
  function buildTree(arr) {
    if (!arr.length) return null;
    arr = mergeSort(arr);
    arr = removeDuplicates(arr);

    function payload(start, end) {
      if (start > end) return null;
      let mid = Math.floor((start + end) / 2);
      let root = Node(arr[mid]);
      root.left = payload(start, mid - 1);
      root.right = payload(mid + 1, end);

      return root;
    }

    return payload(0, arr.length - 1);
  }

  function removeDuplicates(arr) {
    let newArr = [];
    for (let i = 0, j = -1; i < arr.length; i++, j++) {
      if (j >= 0) {
        if (arr[j] != arr[i]) {
          newArr.push(arr[i]);
        }
      } else newArr.push(arr[i]);
    }
    return newArr;
  }

  // visualizing function from T O P
  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  function insertIterative(value) {
    let ref = root;
    if (!ref) {
      root = Node(value);
      return;
    }
    while (ref) {
      if (ref.value > value) {
        if (!ref.left) {
          ref.left = Node(value); 
          return;
        }
        ref = ref.left;
      } else {
        if (!ref.right) {
          ref.right = Node(value);
          return;
        }
        ref = ref.right;
      }
    }

  }

  function insert(value) {
    function actualInsert(value, root) {
      if (!root) {
        root = Node(value);
        return root;
      }

      if (root.value < value) root.right = actualInsert(value, root.right);
      else root.left = actualInsert(value, root.left);
      return root;
    }
    root = actualInsert(value, root);
  }

  function remove(value) {
    function findLeftmost(root) {
      if (!root.left) return root.value;
      return findLeftmost(root.left);
    }

    function actualRemove(value, root) {
      if (!root) return root;
      if (value == root.value) {
        if (!root.left && !root.right) {
          return null;
        } else if (!root.left || !root.right) {
          return root.right ? root.right : root.left;
        } else {
          let nextBigValue = findLeftmost(root.right);
          root = actualRemove(nextBigValue, root);
          root.value = nextBigValue;
          return root;
        }
      }
      if (value > root.value) {
        root.right = actualRemove(value, root.right);
        return root;
      } 
      else {
        root.left = actualRemove(value, root.left);
        return root;
      }
    }
    root = actualRemove(value, root);
  }

  function find(value) {
    function actualFind(value, root) {
      if (!root) return null;
      if (root.value == value) return root;
      if (root.value < value) return actualFind(value, root.right);
      else return actualFind(value, root.left);
    }
    return actualFind(value, root);
  }

  function levelOrder(cb = null) {
    if (!root) return;

    let queue = [], valuesArray = [], temp;
    queue.push(root);

    function helper(queue) {
      if (!queue.length) return;
      temp = queue.shift();
    
      if (cb) cb(temp)
      else valuesArray.push(temp.value);

      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      helper(queue);
    }

    helper(queue);
    if (!cb) return valuesArray;
  }

  function levelOrderIterative(cb = null) {
    if (!root) return;

    let queue = [], arrayValues = [], temp;
    queue.push(root);
    while(queue.length) {
      temp = queue.shift();
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      if (cb) cb(temp);
      else arrayValues.push(temp.value);
    }
    if (!cb) return arrayValues; 
  }

  function preOrder(cb = null) {
    let arr = [];
    function helper(root) {
      if (!root) return;

      if (cb) cb(root);
      else arr.push(root.value);

      helper(root.left);
      helper(root.right);
    }
    helper(root);
    if (!cb) return arr;
  }

  function inOrder(cb = null) {
    let arr = [];
    function helper(root) {
      if (!root) return;

      helper(root.left);

      if (cb) cb(root);
      else arr.push(root.value);

      helper(root.right);
    }
    helper(root);
    if (!cb) return arr;
  }

  function postOrder(cb = null) {
    let arr = [];
    function helper(root) {
      if (!root) return;

      helper(root.left);
      helper(root.right);
      
      if (cb) cb(root);
      else arr.push(root.value);
    }
    helper(root);
    if (!cb) return arr;
  }

  function height(node = root) {
    function helper(node, num) {
      if (!node) return num - 1;
      let x = helper(node.left, num + 1);
      let y = helper(node.right, num + 1);
      return x > y ? x : y;
    }
    
    return helper(node, 0);
  }

  function depth(node) {
    function helper(root, num) {
      if (root === node) return num;
      if (!root) return null;
      let x = helper(root.left, num + 1);
      let y = helper(root.right, num + 1);
      return x ? x : y;
    }

    return helper(root, 0);
  }

  function isBalanced(node = root) {
    if (!node) return true;
    let x = height(node.left);
    let y = height(node.right);
    if ((x > y ? x - y : y - x) > 1) return false;
    return isBalanced(node.left) && isBalanced(node.right);
    
  }

  function rebalance() {
    root = buildTree(inOrder());
  }


  return {
    prettyPrint, insert, remove,
    find, insertIterative, levelOrder,
    levelOrderIterative, preOrder,
    postOrder, inOrder, height, depth,
    isBalanced, rebalance,
  };
}

module.exports = Tree;