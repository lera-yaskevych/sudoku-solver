const convertOutput = (input) => {
  const output = [];

  for (let i = 0; i < input.length; i += 9) {
    const row = input.slice(i, i + 9).join(' ');
    output.push(row);
  }

  return output.join('\n ');
};

const indexToRC = (index) => {
  return { row: Math.floor(index / 9), column: index % 9 };
};

const RCtoIndex = (row, column) => {
  return row * 9 + column;
};

const isValid = (sudoku, index, value) => {
  const { row, column } = indexToRC(index);

  for (let r = 0; r < 9; r++) {
    if (sudoku[RCtoIndex(r, column)] === value) return false;
  }

  for (let c = 0; c < 9; c++) {
    if (sudoku[RCtoIndex(row, c)] === value) return false;
  }
  
  const gridRow = Math.floor(row / 3) * 3;
  const gridColumn = Math.floor(column / 3) * 3;

  for (let r = gridRow; r < gridRow + 3; r++) {
    for (let c = gridColumn; c < gridColumn + 3; c++) {
      if (sudoku[RCtoIndex(r, c)] === value) return false;
    }
  }

  return true;
};

const getOptions = (sudoku, index) => {
  const options = [];

  for (let value = 1; value <= 9; value++) {
    if (isValid(sudoku, index, value)) {
      options.push(value);
    }
  }

  return options;
};

module.exports = {
  convertOutput,
  isValid,
  getOptions,
};
