/*
*
*
*
*/
// x, y are coordinates as in mathematics
// value goes from 0 - 63
function Nodex(value) {
  return {
    value: value,
    predecessor: null,
  }
}

function coordinatesToVal([x,y]) {
  return (8 * y) + x;
}

function valToCoordinates(value) {
  return [
    value % 8,
    Math.floor(value / 8),
  ];
}

function buildGraph() {
  let graph = [], x, y, val;
  for (let i = 0; i < 64; i++) {
    let arr = [];
    [x, y] =  valToCoordinates(i);
    if ((x - 1) >= 0 && (y - 2) >= 0) arr.push(coordinatesToVal([(x - 1), [y - 2]]));
    if ((x + 1) <= 7 && (y - 2) >= 0) arr.push(coordinatesToVal([(x + 1), [y - 2]]));
    if ((x - 2) >= 0 && (y - 1) >= 0) arr.push(coordinatesToVal([(x - 2), [y - 1]]));
    if ((x + 2) <= 7 && (y - 1) >= 0) arr.push(coordinatesToVal([(x + 2), [y - 1]]));
    if ((x - 2) >= 0 && (y + 1) <= 7) arr.push(coordinatesToVal([(x - 2), [y + 1]]));
    if ((x + 2) <= 7 && (y + 1) <= 7) arr.push(coordinatesToVal([(x + 2), [y + 1]]));
    if ((x - 1) >= 0 && (y + 2) <= 7) arr.push(coordinatesToVal([(x - 1), [y + 2]]));
    if ((x + 1) <= 7 && (y + 2) <= 7) arr.push(coordinatesToVal([(x + 1), [y + 2]]));
    graph[i] = arr;
  }
  return graph;
}

let graph = buildGraph();

function knightMoves(from, to) {
  let begin = coordinatesToVal(from);
  let end = coordinatesToVal(to);
  let arr = [];


  //bfs uses nodes
  let queue = [];
  function bfs(from, to) {
    if (from.value == to.value) {
      fillArrBFS(from);
      return;
    } 
    for (let i = 0; i < graph[from.value].length; i++) {
      let node = Nodex(graph[from.value][i]);
      node.predecessor = from;
      queue.push(node);
    }

    bfs(queue.shift(), to);
  }

  function fillArrBFS(end) {
    let ref = end;
    while(ref) {
      arr.unshift(valToCoordinates(ref.value));
      ref = ref.predecessor;
    }
  }

  //bfs end


  //dfs uses values

  /**
   * on second thought, dfs could result into an infinite loop
   * because the graph is undirected
   * (there are ways around that but, come on)
   * so No, I am not going to implement the DFS version
  */

  function logResult() {
    console.log(`=> You made it in ${arr.length - 1} moves! Here's your path`);
    arr.forEach((x) => {
      console.log(x);
    });
  }

  bfs(Nodex(begin), Nodex(end));
  logResult();
}

knightMoves([3,3], [4,3]);