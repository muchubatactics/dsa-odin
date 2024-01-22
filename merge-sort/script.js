// merge sort

function ms(arr) {
  if (arr.length <= 1) return arr;
  else {
    let temp = Math.floor(arr.length / 2);
    let x = arr.slice(0, temp);
    let y = arr.slice(temp);
    return merge(ms(x), ms(y));
  }
  
}

function merge(arr1, arr2) {
  let arr3 = [];
  let i = 0, j = 0;
  for (;i < arr1.length && j < arr2.length;) {
    if (arr1[i] < arr2[j]) {
      arr3.push(arr1[i]);
      i++;
    } else {
      arr3.push(arr2[j]);
      j++;
    }
  }

  if (i < arr1.length) {
    arr3 = arr3.concat(arr1.slice(i));
  }
  if (j < arr2.length) {
    arr3 = arr3.concat(arr2.slice(j));
  }
  return arr3;
}

module.exports = ms;
