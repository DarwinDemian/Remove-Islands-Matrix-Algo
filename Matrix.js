const removeIslands = (matrix) => {
  let adjacent = {};
  let leftBorder = {};
  let rightBorder = {};

  let colLength = matrix.length;
  let rowLength = matrix[0].length;

  // add every col to adjacent //
  for (let col = 0; col < colLength; col++) {
    adjacent[col] = [];
  }
  //          END             //

  const checkAdjacent = (col, row, matrix, direction) => {
    const testAdjacent = (col, row, matrix, direction) => {
      if (direction === "right") {
        if (
          matrix[col][row + 1] === 1 &&
          adjacent[col].indexOf(row + 1) in adjacent[col] === false
        ) {
          adjacent[col].push(row + 1);
          checkRow(col, row + 1, matrix, "right");
        }
      }

      if (direction === "left") {
        if (
          matrix[col][row - 1] === 1 &&
          adjacent[col].indexOf(row - 1) in adjacent[col] === false
        ) {
          adjacent[col].push(row - 1);
          checkRow(col, row - 1, matrix, "left");
        }
      }

      if (direction === "top") {
        if (
          adjacent[col - 1] !== undefined &&
          matrix[col - 1][row] === 1 &&
          adjacent[col - 1].indexOf(row) in adjacent[col] === false
        ) {
          adjacent[col - 1].push(row);
          checkTopBot(col - 1, row, matrix, "top");
        }
      }

      if (direction === "bottom") {
        if (
          adjacent[col + 1] !== undefined &&
          matrix[col + 1][row] === 1 &&
          adjacent[col + 1].indexOf(row) in adjacent[col] === false
        ) {
          adjacent[col + 1].push(row);
          checkTopBot(col + 1, row, matrix, "bottom");
        }
      }
    };

    const checkTopBot = (col, row, matrix, direction) => {
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

    const checkRow = (col, row, matrix, direction) => {
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

    const initialize = () => checkRow(col, row, matrix, direction);
    initialize();
  };

  // check every border      //
  const isBorder = (matrix) => {
    for (let col = 0; col < colLength; col++) {
      // check each border and search for each adjacent //
      //      check for leftBorder    //
      if (matrix[col][0] === 1) {
        leftBorder[col] = 0;

        // check if there's a [1] to it's right
        if (matrix[col][1] === 1) {
          adjacent[col].push(1);
          checkAdjacent(col, 1, matrix, "right");
        }
      }

      //          check for rightBorder       //
      if (matrix[col][rowLength - 1] === 1) {
        rightBorder[col] = rowLength - 1;

        // check if there's a [1] to it's left
        if (matrix[col][rowLength - 2] === 1) {
          adjacent[col].push(rowLength - 2);
          checkAdjacent(col, rowLength - 2, matrix, "left");
        }
      }

      //                  END                          //
    }
  };

  const initializeSearch = () => isBorder(matrix);
  initializeSearch();

  //  check for each [1] that's not in adjacent    //
  //  skips every first and last number in matrix  //
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
  //                     END                        //
  return matrix;
};

// 5x5
// let matrix = [
// [0, 0, 1, 1, 1],
// [1, 0, 0, 0, 0],
// [0, 1, 1, 0, 0],
// [0, 1, 0, 1, 1],
// [1, 0, 0, 1, 0],
// ];

// let matrix = [
//   [0, 1, 0, 1, 0, 0]
// ]

// let matrix = [
//   [0, 1, 0]
// ]

// 7x7
let matrix = [
  [1, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
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

console.log(matrix)
console.log(removeIslands(matrix));
