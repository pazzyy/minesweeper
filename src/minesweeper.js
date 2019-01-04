class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);

        // if there is a bomb at the flip location, tell players they lost
        if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
            console.log(`Soz you lost! here's the final board`);
            this._board.print()
        }
        // if there is not a bomb at the location and game is not over, tell player the current board

        else if(this._board.hasSafeTiles()){
            console.log('Current Board: ')
            this._board.print();
        } else {
            console.log(`Congratz m8! Check out your winning board: `) // if there not a bomb and game is over, tell player they've won
            this._board.print();
        }
    }
};



class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard(){
        return this._playerBoard;
    }

    hasSafeTiles(){
        return this._numberOfBombs !== this._numberOfTiles;
    }

    //Function that will tell the user how many bombs are around the tile he chose.
    getNumberOfNeighborBombs(rowIndex, columnIndex){
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
            
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        
        let numberOfBombs = 0; //this will increase based on the tile flipped later down and the number of bombs around that tile
        
        //check each of the offset arrays above
        neighborOffsets.forEach(offset =>{
            let neighborRowIndex = rowIndex + offset[0];
            let neighborColumnIndex = columnIndex + offset[1];
            //make sure that the tile checked isnt outside the board by making sure the row/column selected is within the number of rows/columns of the generated board
            if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
                //if there is a bomb on that row/column, then add it to the number of bomb to inform the user
                if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }

    //Function that acts as the player choice and call the other functions to tell the user if he clicked on a bomb or tell him the number of bomb surrounding his choice
    flipTile (flipRow, flipColumn) {
        if(this._playerBoard[flipRow][flipColumn] !== ' '){
            console.log(`This tile has already been flipped!`);
            return;
        } 
        this._numberOfTiles--;
        if(this._bombBoard[flipRow][flipColumn] === 'B'){
            this._playerBoard[flipRow][flipColumn] = 'B'
        } else {
            this._playerBoard[flipRow][flipColumn] = this.getNumberOfNeighborBombs(flipRow, flipColumn);
        }
    }
    
    print(){
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n')); //function that make sure the rows are joined and separated with a | and the columns have a linebreak
    }

    //Generate an empty player board with rows and columns. 
    static generatePlayerBoard(numberOfRows, numberOfColumns) {
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
    }

//generate bomb board. same mechanism as playerboard
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
        let row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
            row.push(null)
        }
        board.push(row);
    }

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
    }
};



