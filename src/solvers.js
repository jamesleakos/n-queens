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
  var solutions = []; //fixme
  var testBoard = new Board({n: n});

  var iterateRow = function (rowIndex, hasConflictCB) {
    for (var i = 0; i < n; i++) {
      testBoard.togglePiece(rowIndex, i);
      if (!hasConflictCB(rowIndex, i)) {
        if (rowIndex === n - 1) {
          solutions.push(testBoard.rows().map(function(arr) {
            return arr.slice();
          }));
        } else {
          iterateRow(rowIndex + 1, hasConflictCB);
        }
      }
      testBoard.togglePiece(rowIndex, i);
    }
  };
  iterateRow(0, testBoard.hasAnyRookConflictsOn.bind(testBoard));

  for (let i = 0; i < solutions.length; i++) {
    console.log(solutions[i]);
  }
  return solutions;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
