/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // var solutions = []; //fixme
  var testBoard = new Board({n: n});

  var iterateRow = function (rowIndex, hasConflictCB) {
    for (var i = 0; i < n; i++) {
      testBoard.togglePiece(rowIndex, i);
      if (!hasConflictCB(rowIndex, i)) {
        if (rowIndex === n - 1) {
          return testBoard.rows();
        } else {
          return iterateRow(rowIndex + 1, hasConflictCB);
        }
      }
      testBoard.togglePiece(rowIndex, i);
    }
  };
  return iterateRow(0, testBoard.hasAnyRookConflictsOn.bind(testBoard));
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var count = 0;
  var testBoard = new Board({n: n});

  var iterateRow = function (rowIndex, hasConflictCB) {
    for (var i = 0; i < n; i++) {
      testBoard.togglePiece(rowIndex, i);
      if (!hasConflictCB(rowIndex, i)) {
        if (rowIndex === n - 1) {
          count++;
        } else {
          iterateRow(rowIndex + 1, hasConflictCB);
        }
      }
      testBoard.togglePiece(rowIndex, i);
    }
  };
  iterateRow(0, testBoard.hasAnyRookConflictsOn.bind(testBoard));
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) { return []; }
  var solutions = [];
  var testBoard = new Board({n: n});

  var iterateRow = function (rowIndex) {
    for (var i = 0; i < n; i++) {
      testBoard.togglePiece(rowIndex, i);
      if (!testBoard.hasAnyQueenConflictsOn(rowIndex, i)) {
        if (rowIndex === n - 1) {
          solutions.push(testBoard.rows().map(function(arr) {
            return arr.slice();
          }));
        } else {
          iterateRow(rowIndex + 1);
        }
      }
      testBoard.togglePiece(rowIndex, i);
    }
  };
  iterateRow(0);
  if (solutions.length === 0) { return new Board({n: n}).rows(); }
  return solutions[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) { return 1; }
  var solutions = [];
  var testBoard = new Board({n: n});

  var iterateRow = function (rowIndex) {
    for (var i = 0; i < n; i++) {
      testBoard.togglePiece(rowIndex, i);
      if (!testBoard.hasAnyQueenConflictsOn(rowIndex, i)) {
        if (rowIndex === n - 1) {
          solutions.push(testBoard.rows().map(function(arr) {
            return arr.slice();
          }));
        } else {
          iterateRow(rowIndex + 1);
        }
      }
      testBoard.togglePiece(rowIndex, i);
    }
  };
  iterateRow(0);
  return solutions.length;
};

window.findAllRookSolutions = function (n) {
  var solutions = [];
  var testBoard = new Board({n: n});

  var iterateRow = function (rowIndex) {
    for (var i = 0; i < n; i++) {
      testBoard.togglePiece(rowIndex, i);
      if (!testBoard.hasAnyRookConflictsOn(rowIndex, i)) {
        if (rowIndex === n - 1) {
          solutions.push(testBoard.rows().map(function(arr) {
            return arr.slice();
          }));
        } else {
          iterateRow(rowIndex + 1);
        }
      }
      testBoard.togglePiece(rowIndex, i);
    }
  };
  iterateRow(0);
  if (solutions.length === 0) { return new Board({n: n}).rows(); }
  return solutions;
};

window.findAllQueenSolutions = function (n) {
  var solutions = [];
  var testBoard = new Board({n: n});

  var iterateRow = function (rowIndex) {
    for (var i = 0; i < n; i++) {
      testBoard.togglePiece(rowIndex, i);
      if (!testBoard.hasAnyQueenConflictsOn(rowIndex, i)) {
        if (rowIndex === n - 1) {
          solutions.push(testBoard.rows().map(function(arr) {
            return arr.slice();
          }));
        } else {
          iterateRow(rowIndex + 1);
        }
      }
      testBoard.togglePiece(rowIndex, i);
    }
  };
  iterateRow(0);
  if (solutions.length === 0) { return new Board({n: n}).rows(); }
  return solutions;
};

window.iterateRow = function (rowIndex, n, board, solutions, callback) {
  for (var i = 0; i < n; i++) {
    board.togglePiece(rowIndex, i);
    if (!callback(rowIndex, i)) {
      if (rowIndex === n - 1) {
        solutions.push(board.rows().map(function(arr) {
          return arr.slice();
        }));
      } else {
        iterateRow(rowIndex + 1);
      }
    }
    board.togglePiece(rowIndex, i);
  }
};

// var iterateRow = function (rowIndex, hasConflictCB) {
//   for (var i = 0; i < n; i++) {
//     testBoard.togglePiece(rowIndex, i);
//     if (!hasConflictCB(rowIndex, i)) {
//       if (rowIndex === n - 1) {
//         solutions.push(testBoard.rows().map(function(arr) {
//           return arr.slice();
//         }));
//       } else {
//         iterateRow(rowIndex + 1, hasConflictCB);
//       }
//     }
//     testBoard.togglePiece(rowIndex, i);
//   }
// };
