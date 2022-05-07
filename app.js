const { convertOutput, getOptions } = require('./utils');
const { easy, medium, hard } = require('./challenges');

const result = [...hard];

const solve = (sudoku) => {
  for (let i = 0; i < sudoku.length; i++) {
    if (sudoku[i] === '.') {
      const options = getOptions(sudoku, i);

      for (const option of options) {
        sudoku[i] = option;
        
        if(solve(sudoku)) {
          return convertOutput(sudoku);
        }
      }

      sudoku[i] = '.';
      return false;
    }
  }

  return convertOutput(sudoku);
};

const resolvedSudoku = solve(result);

console.log('unresolved sudoku:\n', convertOutput(hard));
console.log('resolved sudoku:\n', resolvedSudoku);
