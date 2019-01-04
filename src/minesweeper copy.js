//Generate an empty player board with rows and columns. 
let generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];

    //first for loop generates the rows
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
        let row = [];
        //nested for lop generate the columns inside each row
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
            //add an empty space in each column that will be replaced by either a bomb or the number of bomb around the tile
            row.push(' ')
        }
        board.push(row);
    };
    return board;
};

//generate bomb board. same mechanism as playerboard
let generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) =>{
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
        let row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
            row.push(null)
        }
        board.push(row);
    };


    let numberOfBombsPlaced = 0;
    //check number of bomb already placed to make sure we don't exceed the number of bomb that will be specified when the bomboard is generated.
        while (numberOfBombsPlaced < numberOfBombs){
            let randomRowIndex = Math.floor(Math.random() * numberOfRows); //choose a row at random based on number of row in the bomb board
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns); //same but for columns
            //if the tile that match the row/column doesn't have a B, add a Bomb and increase the number of bomb placed.
            if (board[randomRowIndex][randomColumnIndex] !== 'B'){
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            };
        };
    
    return board;
};

//Function that will tell the user how many bombs are around the tile he chose.
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) =>{
    //start by creating nested array to define the offsets of each tile based on the center tile. Works only with a 3x3 board.
    const neighborOffsets = [
        [-1,-1],
        [-1,0],
        [-1,1],
        [0,-1],
        [0,1],
        [1,-1],
        [1,0],
        [1,1]
    ];

    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    
    let numberOfBombs = 0; //this will increase based on the tile flipped later down and the number of bombs around that tile
    
    //check each of the offset arrays above
    neighborOffsets.forEach(offset =>{
        let neighborRowIndex = rowIndex + offset[0];
        let neighborColumnIndex = columnIndex + offset[1];
        //make sure that the tile checked isnt outside the board by making sure the row/column selected is within the number of rows/columns of the generated board
        if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
            //if there is a bomb on that row/column, then add it to the number of bomb to inform the user
            if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
                numberOfBombs++;
            }
        }
    });
    return numberOfBombs;
};

//Function that acts as the player choice and call the other functions to tell the user if he clicked on a bomb or tell him the number of bomb surrounding his choice
let flipTile = (playerBoard, bombBoard, flipRow, flipColumn) =>{
    if(playerBoard[flipRow][flipColumn] !== ' '){
        console.log(`This tile has already been flipped!`);
        return;
    } else if(bombBoard[flipRow][flipColumn] === 'B'){
        playerBoard[flipRow][flipColumn] = 'B'
    } else {
        playerBoard[flipRow][flipColumn] = getNumberOfNeighborBombs(bombBoard, flipRow, flipColumn);
    }
};

let printBoard = board => console.log(board.map(row => row.join(' | ')).join('\n')); //function that make sure the rows are joined and separated with a | and the columns have a linebreak
let playerBoard = generatePlayerBoard (3, 3); //generate the playerboard with the numberofRow and numberOfColumn
let bombBoard = generateBombBoard(3, 3, 4); //same but for the bomboard with the max number of bomb on top of that
console.log('Player Board: ');
printBoard(playerBoard); //print the playerboard
console.log('Bomb Board: ');
printBoard(bombBoard); //print the bomboard so we can compare with the flipped board result
flipTile(playerBoard,bombBoard, 0, 1); //flip the tile (here the middle tile of the top row will be flipped). This will check if there's a bomb or give the number of neighbor bombs
console.log('Updated Player Board:');
printBoard(playerBoard); //generate the player board again with the result
