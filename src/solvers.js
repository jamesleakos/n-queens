
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
  var solution = solver(0, n, testBoard, testBoard.hasAnyRookConflictsOn.bind(testBoard), function () {
    return testBoard.rows().map(function(arr) {
      return arr.slice();
    });
  });
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var testBoard = new Board({n: n});
  var count = 0;
  var solution = solver(0, n, testBoard, testBoard.hasAnyRookConflictsOn.bind(testBoard), function () {
    count++;
  });
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var testBoard = new Board({n: n});
  var solutions = [];
  solver(0, n, testBoard, testBoard.hasAnyQueenConflictsOn.bind(testBoard), function() {
    solutions.push(testBoard.rows().map(function(arr) {
      return arr.slice();
    }));
  });
  if (solutions.length === 0) { return new Board({n: n}).rows(); }
  return solutions[0];
};

// second for testing
window.countNQueensSolutions = function(n) {
  if (n === 0) { return 1; }
  var count = 0;
  var testBoard = new Board({n: n});
  solver(0, n, testBoard, testBoard.hasAnyQueenConflictsOn.bind(testBoard), function () {
    count++;
  });
  return count;
};

// give a another callback function to see if I can affect what happens when a solution is found
var solver = function (rowIndex, n1, board, spaceChecker, foundSolCallback) {
  for (var i = 0; i < n1; i++) {
    board.togglePiece(rowIndex, i);
    if (!spaceChecker(rowIndex, i)) {
      if (rowIndex === n1 - 1) {
        let r = foundSolCallback();
        if (r) { return r; }
      } else {
        let r = solver(rowIndex + 1, n1, board, spaceChecker, foundSolCallback);
        if (r) { return r; }
      }
    }
    board.togglePiece(rowIndex, i);
  }
};




