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
  var solutions = [];

  iterateRow(0, n, testBoard, solutions, testBoard.hasAnyRookConflictsOn.bind(testBoard));
  return solutions[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var count = 0;
  var testBoard = new Board({n: n});
  var solutions = [];

  iterateRow(0, n, testBoard, solutions, testBoard.hasAnyRookConflictsOn.bind(testBoard));
  return solutions.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) { return []; }
  var solutions = [];
  var testBoard = new Board({n: n});

  iterateRow(0, n, testBoard, solutions, testBoard.hasAnyQueenConflictsOn.bind(testBoard));
  if (solutions.length === 0) { return new Board({n: n}).rows(); }
  return solutions[0];
};

// second for testing
window.countNQueensSolutions = function(n) {
  if (n === 0) { return 1; }
  var testBoard = new Board({n: n});
  var solutions = [];

  iterateRow(0, n, testBoard, solutions, testBoard.hasAnyQueenConflictsOn.bind(testBoard));
  return solutions.length;
};

var iterateRow = function (rowIndex, n1, board, sols, callback) {
  for (var i = 0; i < n1; i++) {
    board.togglePiece(rowIndex, i);
    if (!callback(rowIndex, i)) {
      if (rowIndex === n1 - 1) {
        sols.push(board.rows().map(function(arr) {
          return arr.slice();
        }));
      } else {
        iterateRow(rowIndex + 1, n1, board, sols, callback);
      }
    }
    board.togglePiece(rowIndex, i);
  }
};


