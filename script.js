function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

// create a 2D array

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let a = 0; a < columns; a++) {
            board[i].push(Cell());
        }
    }

    const displayBoard = () => board;

// checking if a cell is free, and play token in that cell

    const cellAvailable = (row, col) => board[row][col].getCellValue() === 0 ? true : false;

    const playToken = (row, column, token) =>
        cellAvailable(row, column) == true ? board[row][column].setCellValue(token) : console.log('taken');

// print board to console

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getCellValue()));
        console.log(boardWithValues);
    }

    return {
        displayBoard,
        playToken,
        printBoard
    }

}

function Cell() {
    let cellValue = 0;
    return {
        getCellValue: () => cellValue,
        setCellValue: (newValue) => cellValue = newValue
    }
}

const game = Gameboard()