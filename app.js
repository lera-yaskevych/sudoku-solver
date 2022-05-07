const inquirer = require('inquirer');
const { convertOutput, getOptions } = require('./utils');
const { easy, medium, hard } = require('./challenges');

let result;
const levels = {
  'easy': easy,
  'medium': medium,
  'hard': hard,
};

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

inquirer
  .prompt([{
    name: 'level',
    message: 'Select difficulty level',
    choices: ['easy', 'medium', 'hard'],
    type: 'list',
  }])
  .then((answers) => {
    result = [...levels[answers.level]];
    console.time('Execution time');

    const resolvedSudoku = solve(result);

    console.timeEnd('Execution time');
    console.log('Unsolved sudoku:\n', convertOutput(levels[answers.level]));
    console.log('Solved sudoku:\n', resolvedSudoku);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error(error);
    } else {
      console.error(error);
    }
  });
