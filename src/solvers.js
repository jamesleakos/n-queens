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
  var testBoard = new Board({n: n});
  var solutions = advanced(0, n, testBoard, testBoard.hasAnyRookConflictsOn.bind(testBoard), pusher, []);
  return solutions[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var testBoard = new Board({n: n});
  // var solutions = returnAllSolutions(0, n, testBoard, testBoard.hasAnyRookConflictsOn.bind(testBoard));
  var solution = advanced(0, n, testBoard, testBoard.hasAnyRookConflictsOn.bind(testBoard), counter, [0]);
  return solution[0];
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) { return []; }
  var testBoard = new Board({n: n});
  var solutions = advanced(0, n, testBoard, testBoard.hasAnyQueenConflictsOn.bind(testBoard), pusher, []);
  if (solutions.length === 0) { return new Board({n: n}).rows(); }
  return solutions[0];
};

// second for testing
window.countNQueensSolutions = function(n) {
  if (n === 0) { return 1; }
  var testBoard = new Board({n: n});
  // var solutions = returnAllSolutions(0, n, testBoard, testBoard.hasAnyQueenConflictsOn.bind(testBoard));
  var solution = advanced(0, n, testBoard, testBoard.hasAnyQueenConflictsOn.bind(testBoard), counter, [0]);
  return solution[0];
};

var returnAllSolutions = function (rowIndex, n, board, spaceChecker, sols = []) {
  for (var i = 0; i < n; i++) {
    board.togglePiece(rowIndex, i);
    if (!spaceChecker(rowIndex, i)) {
      if (rowIndex === n - 1) {
        sols.push(board.rows().map(function(arr) {
          return arr.slice();
        }));
      } else {
        returnAllSolutions(rowIndex + 1, n, board, spaceChecker, sols);
      }
    }
    board.togglePiece(rowIndex, i);
  }
  return sols;
};

// give a another callback function to see if I can affect what happens when a solution is found
var advanced = function (rowIndex, n1, board, spaceChecker, findCB, acc) {
  for (var i = 0; i < n1; i++) {
    board.togglePiece(rowIndex, i);
    if (!spaceChecker(rowIndex, i)) {
      if (rowIndex === n1 - 1) {
        let r = findCB(board, acc);
        // if (r) {
        //   return r;
        // }
      } else {
        // let r = advanced(rowIndex + 1, n1, board, spaceChecker, findCB, acc);
        // if (r !== undefined) {
        //   return r;
        // }
        advanced(rowIndex + 1, n1, board, spaceChecker, findCB, acc);
      }
    }
    board.togglePiece(rowIndex, i);
  }
  return acc;
};

// var returnPusher = function (board, acc) {
//   acc.push(board.rows().map(function(arr) {
//     return arr.slice();
//   }));
//   return acc;
// };

var pusher = function (board, acc) {
  acc.push(board.rows().map(function(arr) {
    return arr.slice();
  }));
};

var counter = function (board, acc) {
  acc[0]++;
};




