/*
*
* 
*
*/

const bst = require('./script.js');

let size = 50;
let randomNumberArray = randomNumArr(size);

let tree = bst(randomNumberArray);
tree.prettyPrint();
console.log('\n\nIs the tree balanced? : ', tree.isBalanced(), '\n\n');

console.log('\nlevel order: ', tree.levelOrder());
console.log('\npre order: ', tree.preOrder());
console.log('\npost order: ', tree.postOrder());
console.log('\nin order: ', tree.inOrder(), '\n');

// To unbalance the tree
for (let i = 120; i < 150; i += 7) {
  tree.insert(i);
}

tree.prettyPrint();
console.log('\n\nIs the tree balanced? : ', tree.isBalanced(), '\n\n');

tree.rebalance();

tree.prettyPrint();
console.log('\n\nIs the tree balanced? : ', tree.isBalanced(), '\n\n');


console.log('\nlevel order: ', tree.levelOrder());
console.log('\npre order: ', tree.preOrder());
console.log('\npost order: ', tree.postOrder());
console.log('\nin order: ', tree.inOrder(), '\n');

// 

function randomNumArr(size) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random()*100));
  }
  return arr;
}