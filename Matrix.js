// YES, this code is kind of jank and I felt the need to do a lot of documentation but as a great man would put it:
// “It’s not a tumor! It’s not a tumor, at all.”
// - Arnold Schwarzenegger, Kindergarten Cop

// CODE RUNDOWN
// 1st: isBorder is called and it checks for 1s found in each border, if there's an adjacent it calls
// 2nd: checkAdjacent which checks/move through each adjacent found in matrix
// 3rd: moveRow is called and it calls testAdjacent in the possible directions, after it is done, it is gonna proceed with the current move function 
// 4th: testAdjacent will check for adjacents in the direction passed to it and it will call the necessary move function 
// 5th: the move/check process is repeated until all adjacent are found and pushed to the adjacent object
// 6th: a for loop goes through the array and converts every 1 that's not in adjacent to a 0

// Refer to the diagram for more clearity

const removeIslands = (matrix) => {
  // Object to hold all adjacent 1s positions
  // prefix: { col: [row] }
  let adjacent = {};

  let colLength = matrix.length;
  let rowLength = matrix[0].length;

  // Add every column to adjacent //
  for (let col = 0; col < colLength; col++) {
    adjacent[col] = [];
  }

  // Starting from each 1 found in a border
  // Check/move through the array looking for adjacents 1s to that border
  const checkAdjacent = (col, row, matrix, direction) => {  
    
    // Check for adjacents and call the necessary move function
    const testAdjacent = (col, row, matrix, direction) => {
      if (direction === "right") {
        if (
          matrix[col][row + 1] === 1 &&
          adjacent[col].indexOf(row + 1) in adjacent[col] === false
        ) {
          adjacent[col].push(row + 1);
          moveRow(col, row + 1, matrix, "right");
        }
      }

      if (direction === "left") {
        if (
          matrix[col][row - 1] === 1 &&
          adjacent[col].indexOf(row - 1) in adjacent[col] === false
        ) {
          adjacent[col].push(row - 1);
          moveRow(col, row - 1, matrix, "left");
        }
      }

      if (direction === "top") {
        if (
          adjacent[col - 1] !== undefined &&
          matrix[col - 1][row] === 1 &&
          adjacent[col - 1].indexOf(row) in adjacent[col] === false
        ) {
          adjacent[col - 1].push(row);
          moveTopBot(col - 1, row, matrix, "top");
        }
      }

      if (direction === "bottom") {
        if (
          adjacent[col + 1] !== undefined &&
          matrix[col + 1][row] === 1 &&
          adjacent[col + 1].indexOf(row) in adjacent[col] === false
        ) {
          adjacent[col + 1].push(row);
          moveTopBot(col + 1, row, matrix, "bottom");
        }
      }
    };

    // Call testAdjacent to check for adjacent 1s in other directions 
    // move through the matrix in the necessary direction
    // until you've reached the end of the column/row or
    // there's no more adjacent 1s
    const moveTopBot = (col, row, matrix, direction) => {
      if (direction === "top") {
        for (col; colLength > col; col--) {
          testAdjacent(col, row, matrix, "left");
          testAdjacent(col, row, matrix, "right");

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
          testAdjacent(col, row, matrix, "left");
          testAdjacent(col, row, matrix, "right");

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

    const moveRow = (col, row, matrix, direction) => {
      if (direction === "right") {
        for (row; row < rowLength - 2; row++) {
          testAdjacent(col, row, matrix, "top");
          testAdjacent(col, row, matrix, "bottom");

          if (
            matrix[col][row + 1] === 1 &&
            adjacent[col].indexOf(row + 1) in adjacent[col] === false
          ) {
            adjacent[col].push(row + 1);
          } else break;
        }
      } else if (direction === "left") {
        for (row; row > 1; row--) {
          testAdjacent(col, row, matrix, "top");
          testAdjacent(col, row, matrix, "bottom");

          if (
            matrix[col][row - 1] === 1 &&
            adjacent[col].indexOf(row - 1) in adjacent[col] === false
          ) {
            adjacent[col].push(row - 1);
          } else break;
        }
      }
    };

    // Start the search
    const initialize = () => moveRow(col, row, matrix, direction);
    initialize();
  };

  // Check every border      //
  const isBorder = (matrix) => {
    for (let col = 0; col < colLength; col++) {
      // Check for leftBorder
      if (matrix[col][0] === 1) {
        // Check if there's a 1 to it's right
        if (
          matrix[col][1] === 1 &&
          adjacent[col].indexOf(1) in adjacent[col] === false
        ) {
          adjacent[col].push(1);
          checkAdjacent(col, 1, matrix, "right");
        }
      }

      // Check for rightBorder
      if (matrix[col][rowLength - 1] === 1) {
        // Check if there's a 1 to it's left
        if (
          matrix[col][rowLength - 2] === 1 &&
          adjacent[col].indexOf(rowLength - 2) in adjacent[col] === false
        ) {
          adjacent[col].push(rowLength - 2);
          checkAdjacent(col, rowLength - 2, matrix, "left");
        }
      }
    }
  };

  // Start search from each border
  const initializeSearch = () => isBorder(matrix);
  initializeSearch();

  // Check for each [1] that's not in adjacent
  // and convert it to [0]
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
//   [0, 1, 1, 1, 1],
//   [1, 1, 0, 0, 0],
//   [0, 1, 0, 1, 0],
//   [0, 0, 0, 1, 0],
//   [1, 0, 0, 1, 0],
// ];

// let matrix = [
// [0, 1, 0, 1, 0, 0]
// ]

// let matrix = [
//   [0, 1, 0]
// ]

// 7x7
let matrix = [
  [1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 0],
  [1, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 0, 0],
];

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

// Original Matrix
console.log(matrix);
// New Matrix
console.log(removeIslands(matrix));
