
document.addEventListener('DOMContentLoaded', () => { //Links to html JOSE
    
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector("#score")
    const startBtn = document.querySelector("#start-button")
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]


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
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    //undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    //make the tetromino move down every second
    // timerId = setInterval(moveDown, 1000)

    //assign function to keyCodes (for arrowkeys/movement)
    function control(e) {
        if(e.keyCode == 37) { //there are codes for arrow keys, so in this case 37 == left arrow key
            moveLeft()
        } else if(e.keyCode === 38) {
            rotate()
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
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
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

    function moveRight()
    {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width == width -1)

        if (!isAtRightEdge) currentPosition +=1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken')))
        {
            currentPosition -=1;
        }
        draw();
    }

    // rotates the tetris block
    function rotate()
    {
        undraw()
        currentRotation ++
        // if current rotation is 4 go to 0 
        if (currentRotation === current.length)
        {
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    // show next termino in mini-grid 

    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    // the tetronomes without rotations 
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino (make sure to add ',' after each [])
        [0, displayWidth, displayWidth+1, displayWidth +2], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // iTetromino
    ]

    // display function with the shape in the mini grid display something broke around here, it is not displaying the SHAPE 
    // The upNext Tetromino was not displaying because the commas ',' were not present after each [] - jorge

    function displayShape()
    {
        displaySquares.forEach(square =>
        {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })

        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
           
        
        })
    }
    
    

// we only want the tetromino to move down when we press the "Start" button, having the line of code in Line 74 makes it where the tetrimino moves down as soon as the webpage is open - Jorge (Start/Pause button is functional now)

//adding functionality to the button
startBtn.addEventListener('click', () =>{
    if (timerId){//When the pause button is clicked and the timer ID has a value, we change the timerId value to null (when I click the pause button the game pauses) - Jorge
        clearInterval(timerId)
        timerId = null
    } else{//when I click on the play button, it starts moving the tetrimino down every second and displays the next shape - Jorge
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        displayShape()
    }
})
 

//add score
function addScore() {
    for (let i = 0; i < 199; i +=width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if(row.every(index => squares[index].classList.contains('taken'))) {
            score +=10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

//game over
function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'Game Over'
        clearInterval(timerId)
    }
}






    //Started at 27:45 mins -Kyle
    //ended 1:00:00 mins - Kyle

    // started 1:00:00 - jose
    // ended 1:15:00

    //started 1:15:00 - Jorge
    //ended 1:31:00 - Jorge

    //Basically I worked on majority of the javascript, creating the different functions needed
    //I would say look through them bc it can get confusing some logic I dont understand so I will go back to them
    //But I just made the tetrominoes, made them into an array, draw them on the grid, draw/undraw
     // the timing of them falling, left movement, freeze function so it stops at the bottom

     /** SOOO KDRDR3AMZ (JOSE) broke this somehow, jk, but the yellow square which shows the next tetris block does not actually show the next one
      * IDK why it does not work; but its not a HUGE deal, incase jorge wants to fix it 
      */

      /*
      Features Implemented by Jorge: 
        - upNext now displays correctly
        - Start/Pause button is now funcional
        - Bottom line now dissapears
        - Added the score counter (every line that is made is 10 points)
      */
})  


