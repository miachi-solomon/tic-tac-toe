const Gameboard = function () {
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

    const cellAvailable = (row, col) => board[row][col].getCellValue() === '' ? true : false;

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

};

function Cell() {
    let cellValue = '';
    return {
        getCellValue: () => cellValue,
        setCellValue: (newValue) => cellValue = newValue
    }
}

const GameController = (player1, player2) => {
    const players = [
        {
            name: player1,
            token: 'X'
        },
        {
            name: player2,
            token: 'O'
        }
    ];

    let currentPlayer = players[0];

    const getActivePlayer = () => currentPlayer;

    const board = Gameboard();

    const playRound = (row, column) => {
        board.playToken(row, column, currentPlayer.token);
        //check win

        switchCurrentPlayer()
        printBoardOut()
    }

    const checkWin = () => {}

    const switchCurrentPlayer = () => currentPlayer = currentPlayer === players[0] ? players[1] : players[0]; 

    const printBoardOut = () => {
        board.printBoard()
        console.log(`Player ${currentPlayer.name}'s turn.`);
    }

    printBoardOut()

    return {
        playRound
    }
}

const myGame = GameController('Solomon', 'Player0');