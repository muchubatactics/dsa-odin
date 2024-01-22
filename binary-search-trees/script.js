/*
*
*
*
*
*/

import mergeSort from '../merge-sort/script.js';

function Node(val = null, left = null, right = null) {
  return {
    value: val,
    left: left,
    right: right,
  };
}

function Tree(arr) {
  function buildTree() {

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
  }

  return {removeDuplicates};
}

