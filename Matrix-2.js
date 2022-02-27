const removeIslands = (matrix) => {
  let adjacent = {};

  let colLength = matrix.length;
  let rowLength = matrix[0].length;

  // add every col to adjacent //
  for (let col = 0; col < colLength; col++) {
    adjacent[col] = [];
  }
  //          END             //

  // top -> [col - 1][row]
  // bot -> [col + 1][row]
  // right -> [col][row + 1]
  // left -> [col][row - 1]
  
  let arr = [[]]

  for (let col = 0; col < colLength; col++) {
    for (let row = 0; row < rowLength; row++){
      
    }
  } 

  arr;
  return matrix;
};

// 5x5
let matrix = [
  [0, 1, 1, 1, 1],
  [1, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [1, 0, 0, 1, 0],
];

// let matrix = [
//   [0, 1, 0, 1, 0, 0]
// ]

// let matrix = [
//   [0, 1, 0]
// ]

// 7x7
// let matrix = [
  // [1, 1, 0, 0, 0, 0, 0],
  // [0, 1, 0, 0, 0, 0, 0],
  // [0, 1, 1, 1, 0, 0, 0],
  // [0, 0, 0, 1, 1, 0, 0],
  // [0, 0, 0, 0, 1, 0, 0],
  // [0, 0, 0, 0, 1, 1, 0],
  // [0, 0, 0, 0, 0, 0, 0],
// ];

// 10x10
// let matrix = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];

console.log(matrix)
console.log(removeIslands(matrix));