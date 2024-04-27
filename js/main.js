
document.addEventListener('DOMContentLoaded', () => { //Links to html 
    
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector("#score")
    const StartBtn = document.querySelector("#start-button")
    const width = 10

    //The Tetrominoes, which are the actually shapes in tetris

    const lTetromino = [ 
        [1, width+1, width*2+1, 2], //each of these arrays are the rotation, which are 4 possible rotations
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    //start drawing them on the grid

    let currentPosition = 4
    let currentRotation = 0
    //randomly select a Tetromino and its first rotation using Math.random(), .length. and Math.floor() methods
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation] //randomly chooses a array aka tetromino
    
    //draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    //undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //make the tetromino move down every second
    timerId = setInterval(moveDown, 1000)

    //assign function to keyCodes (for arrowkeys/movement)
    function control(e) {
        if(e.keyCode == 37) { //there are codes for arrow keys, so in this case 37 == left arrow key
            moveLeft()
        } else if(e.keyCode === 38) {
            //rotate
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    //move down function
    function moveDown() {
        undraw()
        currentPosition += width 
        draw()
        freeze()
    }

   //freeze function w/ If statements
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling
            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    //move the tetromino left, unless is a the edge
    function moveLeft() {
        undraw() //removes it from any current location
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }
        draw()
    }

    //move the tetromino right, unless is at the edge or there is a blockage
    //Start here kdrdreams

 
    //Started at 27:45 mins -Kyle
    //ended 1:00:00 mins - Kyle

    //Basically I worked on majority of the javascript, creating the different functions needed
    //I would say look through them bc it can get confusing some logic I dont understand so I will go back to them
    //But I just made the tetrominoes, made them into an array, draw them on the grid, draw/undraw
     // the timing of them falling, left movement, freeze function so it stops at the bottom

})  


