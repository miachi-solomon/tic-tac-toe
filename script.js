const output = document.querySelector('.output');
const playerTurnDiv = document.querySelector('.turn');

function Gameboard () {
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

    const getBoard = () => board;

// checking if a cell is free, and play token in that cell

    const cellAvailable = (row, col) => board[row][col].getCellValue() === '' ? true : false;

    const playToken = (row, column, token) => { 
        if (cellAvailable(row, column)) {
            board[row][column].setCellValue(token);
            output.textContent = '';
        } else {
            output.textContent = 'Taken';
        }
    }

// print board to console

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getCellValue()));
        console.log(boardWithValues);
    }

    return {
        getBoard,
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

function GameController (player1, player2) {
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

    let playerWon = false;

    let matchTie = false;

    const getMatchTie = () => matchTie;

    const getPlayerWon = () => playerWon;

    const playRound = (row, column) => {
        board.playToken(row, column, currentPlayer.token);
        checkWin();

        if (playerWon) {
            return;
        } else {
            switchCurrentPlayer();
        }

        printBoardOut();

        if (board.getBoard().every((row) => row.every((column) => column.getCellValue() != ''))) {
            matchTie = true;
        }
    }

    const checkWin = () => {
        let row1firstColumn = board.getBoard()[0][0].getCellValue();
        let row1secondColumn = board.getBoard()[0][1].getCellValue();
        let row1thirdColumn = board.getBoard()[0][2].getCellValue();

        let row2firstColumn = board.getBoard()[1][0].getCellValue();
        let row2secondColumn = board.getBoard()[1][1].getCellValue();
        let row2thirdColumn = board.getBoard()[1][2].getCellValue();

        let row3firstColumn = board.getBoard()[2][0].getCellValue();
        let row3secondColumn = board.getBoard()[2][1].getCellValue();
        let row3thirdColumn = board.getBoard()[2][2].getCellValue();

        const firstColumns = [row1firstColumn, row2firstColumn, row3firstColumn];
        const secondColumns = [row1secondColumn, row2secondColumn, row3secondColumn];
        const thirdColumns = [row1thirdColumn, row2thirdColumn, row3thirdColumn];
        const allColumns = [firstColumns, secondColumns, thirdColumns];

        const horizontalWin = () => {
            board.getBoard().map((row) => {
                if (row.every((column) => column.getCellValue() == currentPlayer.token)) {
                    console.log(`${currentPlayer.name} wins`);
                    playerWon = true;
                }
            });
        }

        const verticalWin = (colArray) => {
            colArray.map((columns) => {
                if (columns.every((column) => column ==  currentPlayer.token)) {
                    console.log(`${currentPlayer.name} wins`);
                    playerWon = true;
                }
            });
        }

        const diagonalWin = () => {
            const diag1 = [row1firstColumn, row2secondColumn, row3thirdColumn];
            const diag2 = [row1thirdColumn, row3firstColumn, row2secondColumn];
            if ((diag1.every((column) => column == currentPlayer.token) || 
            (diag2.every((column) => column == currentPlayer.token)))) {
                console.log(`${currentPlayer.name} wins`);
                playerWon = true;
            }
        }

        // user wins when three of their token are horizontal or on the same row
        horizontalWin();

        // user wins when three of their token are vertical or on the same column
        verticalWin(allColumns);

        // user wins when three of their token are diagonal
        diagonalWin();
    }

    const switchCurrentPlayer = () => currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

    const printBoardOut = () => {
        board.printBoard();
        console.log(`Player ${currentPlayer.name}'s turn.`);
    }

    printBoardOut();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        getPlayerWon,
        getMatchTie,
    }
}

function ScreenController () {
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const game = GameController('Player X', 'Player O');
    const restart = document.querySelector('.restart-btn');

    const updateScreen = () => {
        boardDiv.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn.`;

        if (game.getPlayerWon()) {
            playerTurnDiv.textContent = `Congrats! ${activePlayer.name} wins`;
            boardDiv.removeEventListener('click', boardDivClick);
        }

        if (game.getMatchTie()) playerTurnDiv.textContent = "It's a tie, restart the game";

        board.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const colButton = document.createElement('button');
                colButton.classList.add('cell');
                colButton.dataset.row = rowIndex;
                colButton.dataset.column = columnIndex
                colButton.textContent = column.getCellValue();
                boardDiv.appendChild(colButton);
            });
        });
    }

    const boardDivClick = (e) => {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedRow && !selectedColumn) return;
        game.playRound(selectedRow, selectedColumn);

        updateScreen();
    }

    boardDiv.addEventListener('click', boardDivClick);

    restart.addEventListener('click', () => {
        ScreenController();
    });

    updateScreen();
}

ScreenController(); 