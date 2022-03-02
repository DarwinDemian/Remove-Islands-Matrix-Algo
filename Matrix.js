// YES, this code is kind of jank and I'm working on it, but as a great man would put it:
// “It’s not a tumor! It’s not a tumor, at all.”
// - Arnold Schwarzenegger, Kindergarten Cop

const removeIslands = (matrix) => {
  // Object to hold all adjacent 1s positions
  // with col as key and [row] as value
  let adjacent = {};

  let colLength = matrix.length;
  let rowLength = matrix[0].length;

  // Add every column to adjacent //
  for (let col = 0; col < colLength; col++) {
    adjacent[col] = [];
  }

  // Check every border
  const isBorder = () => {
    for (let col = 0; col < colLength; col++) {
      // Check for leftBorder
      if (
        matrix[col][0] === 1 &&
        matrix[col][1] === 1 &&
        adjacent[col].indexOf(1) in adjacent[col] === false
      ) {
        adjacent[col].push(1);
        moveRow(col, 1, "right");
      }

      // Check for rightBorder
      if (
        matrix[col][rowLength - 1] === 1 &&
        matrix[col][rowLength - 2] === 1 &&
        adjacent[col].indexOf(rowLength - 2) in adjacent[col] === false
      ) {
        adjacent[col].push(rowLength - 2);
        moveRow(col, rowLength - 2, "left");
      }
    }
  };

  // move through the matrix in the direction
  // until you've reached the end of the column/row or
  // there's no more adjacent 1s
  const moveRow = (col, row, direction) => {
    if (direction === "right") {
      for (row; row < rowLength; row++) {
        checkAdjacent(col, row, "top");
        checkAdjacent(col, row, "bottom");

        if (
          matrix[col][row + 1] === 1 &&
          adjacent[col].indexOf(row + 1) in adjacent[col] === false
        ) {
          adjacent[col].push(row + 1);
        } else break;
      }
    } else if (direction === "left") {
      for (row; row > 0; row--) {
        checkAdjacent(col, row, "top");
        checkAdjacent(col, row, "bottom");

        if (
          matrix[col][row - 1] === 1 &&
          adjacent[col].indexOf(row - 1) in adjacent[col] === false
        ) {
          adjacent[col].push(row - 1);
        } else break;
      }
    }
  };

  const moveTopBot = (col, row, direction) => {
    if (direction === "top") {
      for (col; col > -1; col--) {
        checkAdjacent(col, row, "left");
        checkAdjacent(col, row, "right");

        if (
          matrix[col - 1] !== undefined &&
          matrix[col - 1][row] === 1 &&
          adjacent[col - 1].indexOf(row) in adjacent[col] === false
        ) {
          adjacent[col - 1].push(row);
        } else break;
      }
    } else if (direction === "bottom") {
      for (col; col < colLength; col++) {
        checkAdjacent(col, row, "left");
        checkAdjacent(col, row, "right");

        if (
          matrix[col + 1] !== undefined &&
          matrix[col + 1][row] === 1 &&
          adjacent[col + 1].indexOf(row) in adjacent[col] === false
        ) {
          adjacent[col + 1].push(row);
        } else break;
      }
    }
  };

  // Check for adjacents and call the necessary move function
  const checkAdjacent = (col, row, direction) => {
    if (direction === "right") {
      if (
        matrix[col][row + 1] === 1 &&
        adjacent[col].indexOf(row + 1) in adjacent[col] === false
      ) {
        adjacent[col].push(row + 1);
        moveRow(col, row + 1, "right");
      }
    }

    if (direction === "left") {
      if (
        matrix[col][row - 1] === 1 &&
        adjacent[col].indexOf(row - 1) in adjacent[col] === false
      ) {
        adjacent[col].push(row - 1);
        moveRow(col, row - 1, "left");
      }
    }

    if (direction === "top") {
      if (
        adjacent[col - 1] !== undefined &&
        matrix[col - 1][row] === 1 &&
        adjacent[col - 1].indexOf(row) in adjacent[col] === false
      ) {
        adjacent[col - 1].push(row);
        moveTopBot(col - 1, row, "top");
      }
    }

    if (direction === "bottom") {
      if (
        adjacent[col + 1] !== undefined &&
        matrix[col + 1][row] === 1 &&
        adjacent[col + 1].indexOf(row) in adjacent[col] === false
      ) {
        adjacent[col + 1].push(row);
        moveTopBot(col + 1, row, "bottom");
      }
    }
  };

  // Start search from each border
  const initializeSearch = () => isBorder();
  initializeSearch();

  // Convert every [1] that's not in adjacent
  // Skip every first and last number in matrix
  for (let col = 0; col < colLength; col++) {
    for (let row = 1; row < rowLength - 1; row++) {
      if (
        adjacent[col].indexOf(row) in adjacent[col] === false &&
        matrix[col][row] !== 0
      ) {
        matrix[col][row] = 0;
      }
    }
  }

  return matrix;
};

// TEST CASES

// 5x5
// let matrix = [
// [0, 1, 0, 1, 1],
// [0, 1, 1, 1, 0],
// [0, 0, 0, 0, 0],
// [0, 1, 1, 1, 0],
// [1, 1, 1, 1, 0],
// ];

// 5x5
// let matrix = [
//   [0, 1, 1, 1, 0],
//   [1, 1, 0, 1, 0],
//   [0, 1, 0, 1, 0],
//   [0, 1, 1, 1, 0],
//   [0, 1, 0, 1, 0],
// ];

// let matrix = [
// [0, 1, 0, 1, 0, 0]
// ]

// let matrix = [
//   [0, 1, 0]
// ]

// 7x7
// let matrix = [
//   [1, 1, 0, 1, 0, 1, 0],
//   [0, 1, 0, 0, 1, 1, 0],
//   [0, 1, 1, 1, 0, 0, 0],
//   [1, 0, 0, 1, 1, 1, 0],
//   [0, 1, 1, 0, 1, 0, 0],
//   [0, 1, 1, 0, 1, 1, 1],
//   [1, 0, 1, 1, 0, 0, 0],
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

// 5x5
let matrix = [
  [0, 1, 1, 1, 0],
  [1, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
];

// Original Matrix
console.log(matrix);
// New Matrix
console.log(removeIslands(matrix));
