const squares = document.querySelectorAll('.grid div')
const result = document.querySelector('.result')
const displayCurrent = document.querySelector('#current-player')
const width = 7

let currentPlayer = 1
let won = 0
let hoverArray = []
let case1 = null
let case2 = null
let case3 = null
let case4 = null
// Case 0 - Check all cases
// Case 1 - Diagonal top to bot
// Case 2 - Left to right
// Case 3 - Diagonal bot to top
// Case 4 - Bot to top

function checkBoard(i) {
    // get class name
    if (currentPlayer == 1) {
        // inverse since it switches current player before calling function
        currentStr = 'player-two'
    }
    else if (currentPlayer == 2) {
        currentStr = 'player-one'
    }

    tmpIndex = i

    leftMost(i)
    winOne(case1,0)
    winTwo(case2,0)
    winThree(case3,0)
    winFour(case4,0)
  
    function winOne(c1,count) {
        if ((c1+1 % 7 != 0) && (c1 <= 34)){
            if (squares[c1+width+1].classList.contains(currentStr)) {
                winOne(c1+width+1,count+1)}
        }
        if (count == 3){won = 1}
    }
    function winTwo(c2,count) {
        if (c2+1 % 7 != 0){
            if (squares[c2+1].classList.contains(currentStr)) {
                winTwo(c2+1,count+1)}
        }
        if (count == 3){won = 1}
    }
    function winThree(c3,count) {
        if (c3+1 % 7 != 0){
            if (squares[c3-width+1].classList.contains(currentStr)) {
                winThree(c3-width+1,count+1)}
        }
        if (count == 3){won = 1}
    }
    function winFour(c4,count) {
        if (c4 >= 7){
            if (squares[c4-width].classList.contains(currentStr)) {
                winFour(c4-width,count+1)}
        }
        if (count == 3){won = 1}
    }

    setTimeout( function() {checkWin()}, 50)

    function checkWin() {
        if (won == 1){
            if (currentPlayer == 1) {
                alert('Player Blue has won!')
                result.innerHTML = "Player Blue wins"
            }
            else if (currentPlayer == 2) {
                alert('Player Red has won!')
                result.innerHTML = "Player Red wins"
            }
        }
    }
}

function leftMost(tmpIndex) {
    caseOne(tmpIndex)
    caseTwo(tmpIndex)
    caseThree(tmpIndex)
    caseFour(tmpIndex)

    function caseOne(tmpIndex) {
        if (tmpIndex % 7 ==0){
            case1 = tmpIndex
        }
        // regular case 1
        else if (squares[tmpIndex-width-1].classList.contains(currentStr)) {
            caseOne(tmpIndex-width-1)
        }
        else {case1 = tmpIndex}
    }

    function caseTwo(tmpIndex) {
        if (tmpIndex % 7 ==0){
            case2 = tmpIndex
        }
        // regular case 1
        else if (squares[tmpIndex-1].classList.contains(currentStr)) {
            caseTwo(tmpIndex-1)
        }
        else {case2 = tmpIndex}
    }

    function caseThree(tmpIndex) {
        if ((tmpIndex % 7 ==0) && (tmpIndex>34)){
            case3 = tmpIndex
        }
        // regular case 1
        else if (squares[tmpIndex+width-1].classList.contains(currentStr)) {
            caseThree(tmpIndex+width-1)
        }
        else {case3 = tmpIndex}
    }

    function caseFour(tmpIndex) {
        if (tmpIndex>34){
            case4 = tmpIndex
        }
        // regular case 1
        else if (squares[tmpIndex+width].classList.contains(currentStr)) {
            caseFour(tmpIndex+width)
        }
        else {case4 = tmpIndex}
    }
}

function removeHover() {
    while (hoverArray.length > 0) {
        if (currentPlayer == 1 ){ squares[hoverArray[0]].classList.remove('hover-one') }
        else { squares[hoverArray[0]].classList.remove('hover-two') }
        hoverArray.shift()
    }
}

for (let i = 0; i < squares.length-7; i++) {
    // hovering over a column
    squares[i].onmouseenter = () => {
        if (won == 0) {
            // does not change if already hovering similar column
            if (!squares[i].classList.contains('hover-one') || !squares[i].classList.contains('hover-two')) {
                let j = i

                // start from top
                while (j >=7) {
                    j -= 7
                }

                // add hover effect
                while (!squares[j].classList.contains('taken')) {
                    if (currentPlayer == 1) {
                        squares[j].classList.add('hover-one')}
                    else {squares[j].classList.add('hover-two')}
                    hoverArray.push(j)
                    j += 7
                }
            }
        }
    }

    // leaving the column
    squares[i].onmouseleave = () => {
        removeHover()
    }

    // putting down the chip
    squares[i].onclick = () => {
        removeHover()

        if (won == 0){
            // if the square below is taken, you can go on top of it 
            if (!squares[i].classList.contains('taken')) {
                let j = i
                while (!squares[j+7].classList.contains('taken')) {
                    j += 7
                }

                if (currentPlayer == 1) {
                    squares[j].classList.add('player-one', 'taken')
                    currentPlayer = 2
                    displayCurrent.innerHTML = currentPlayer
                }
                else {
                    squares[j].classList.add('player-two', 'taken')
                    currentPlayer = 1
                    displayCurrent.innerHTML = currentPlayer
                }
            }
            checkBoard(i)
        }
    }
}
