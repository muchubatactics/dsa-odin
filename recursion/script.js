/*
* Fibonacci Iterative
* Returns an array 
* of the first (n) fib numbers
*/
function fibs(n) {
  let arr = [];
  if (n < 0) return arr;
  for (let i = 0; i < n; i++) {
    if (i == 0) arr.push(0);
    else if (i == 1) arr.push(1);
    else {
      arr.push(arr[i - 1] + arr[i - 2]);
    }
  }
  return arr;
}

/*
* Fibonaci recursive
* Also returns an array 
* of first n fib numbers
*/
function fibsRec(n) {
  let arr = [];
  if (n <= 0) return arr;
  if (n == 1) {
    arr = [0];
    return arr;
  }
  if (n == 2) {
    arr = [0, 1];
    return arr;
  }
  arr = arr.concat(fibsRec(n - 1));
  arr.push(arr[arr.length - 2] + arr[arr.length - 1]);
  return arr;
}

/*
* Fibonaci recursive
* Only returns the nth fib number
*/
function fibsRec(n) {
  if (n <= 0) return [0];
  if (n == 1) return [0];
  if (n == 2) return [1];
  return [fibsRec(n - 2) + fibsRec(n - 1)];
}
