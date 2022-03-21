let fields = [];
let currentShape = 'cross';
let drawCounter = 0;
let gameOver = false;
let winner = '';


function loadGame() {
    document.getElementById('table-container').innerHTML = templateTable();
}


function fillShape(id) {
    if (fieldNotSelected(id) && !gameOver) {
        if (currentShape == 'cross') {
            changeToCircle();
        } 
        else {
            changeToCross()
        }
        fields[id] = currentShape;
        draw();
        checkForWin();
        drawCounter++;
    }
}


function fieldNotSelected(id) {
    return !fields[id];
}


function changeToCircle() {
    currentShape = 'circle';
    document.getElementById('player-2').classList.remove('player-inactive');
    document.getElementById('player-1').classList.add('player-inactive');
}


function changeToCross() {
    currentShape = 'cross';
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-2').classList.add('player-inactive');
}


function restart() {
    gameOver = false;
    drawCounter = 0;
    fields = [];
    currentShape = 'cross';
    winner = '';
    document.getElementById('dialog-bg').classList.add('d-none');
    document.getElementById('player-2').classList.add('player-inactive');
    document.getElementById('player-1').classList.remove('player-inactive');
    loadGame();
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
    }
}


function checkForWin() {
    checkAllPossibilities();
    if (winnerExists()) {
        showWinnerDialog();
    }
    else if (gameIsDraw()) {
        showDrawDialog();
    }
}


function showWinnerDialog() {
    gameOver = true;
    if (winner == 'circle') {
        document.getElementById('game-over-text').innerHTML = templateWinner('img/circle.png', 1);
    }
    if (winner == 'cross') {
        document.getElementById('game-over-text').innerHTML = templateWinner('img/cross.png', 2);
    }
    showRestartDialog();
}


function showDrawDialog() {
    gameOver = true;
    document.getElementById('game-over-text').innerHTML = `<div>draw</div>`;
    showRestartDialog();
}


function showRestartDialog() {
    setTimeout(function () {
        document.getElementById('dialog-bg').classList.remove('d-none');
    }, 600);
}


function winnerExists() {
    return winner == 'circle' || winner == 'cross';
}


function gameIsDraw() {
    return drawCounter == 8;
}


function checkAllPossibilities() {
    checkFirstRow();
    checkSecondRow();
    checkThirdRow();
    checkFirstColumn();
    checkSecondColumn();
    checkThirdColumn();
    checkDiagonalGradient();
    checkDiagonalPitch();
}


function checkFirstRow() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-1').style.transform = 'scaleX(1)';
    }
}


function checkSecondRow() {
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-2').style.transform = 'scaleX(1)';
    }
}


function checkThirdRow() {
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-3').style.transform = 'scaleX(1)';
    }
}


function checkFirstColumn() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1)';
    }
}


function checkSecondColumn() {
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1)';
    }
}


function checkThirdColumn() {
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-6').style.transform = 'rotate(90deg) scaleX(1)';
    }
}


function checkDiagonalGradient() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-7').style.transform = 'rotate(45deg) scaleX(1)';
    }
}


function checkDiagonalPitch() {
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-8').style.transform = 'rotate(-45deg) scaleX(1)';
    }
}


function templateTable() {
    return `
        <div id="line-1" class="horizontal-line"></div>
        <div id="line-2" class="horizontal-line"></div>
        <div id="line-3" class="horizontal-line"></div>
        <div id="line-4" class="horizontal-line make-vertical"></div>
        <div id="line-5" class="horizontal-line make-vertical"></div>
        <div id="line-6" class="horizontal-line make-vertical"></div>
        <div id="line-7" class="horizontal-line"
            style="transform: rotate(45deg) scaleX(0.0)">
        </div>
        <div id="line-8" class="horizontal-line"
            style="transform: rotate(-45deg) scaleX(0.0)">
        </div>
        <table>
            <tr>
                <td onclick="fillShape(0)">
                    <div class="td-box">
                        <img class="shape d-none" src="img/circle.png" id="circle-0">
                        <img class="shape d-none" src="img/cross.png" id="cross-0">
                    </div>
                </td>
                <td onclick="fillShape(1)">
                    <div class="td-box">
                        <img class="shape d-none" src="img/circle.png" id="circle-1">
                        <img class="shape d-none" src="img/cross.png" id="cross-1">
                    </div>
                </td>
                <td onclick="fillShape(2)">
                    <div class="td-box">
                        <img class="shape d-none" src="img/circle.png" id="circle-2">
                        <img class="shape d-none" src="img/cross.png" id="cross-2">
                    </div>
                </td>
            </tr>
            <tr>
                <td onclick="fillShape(3)">
                    <div class="td-box">
                        <img class="shape d-none" src="img/circle.png" id="circle-3">
                        <img class="shape d-none" src="img/cross.png" id="cross-3">
                    </div>
                </td>
                <td onclick="fillShape(4)">
                    <div class="td-box">
                        <img class="shape d-none" src="img/circle.png" id="circle-4">
                        <img class="shape d-none" src="img/cross.png" id="cross-4">
                    </div>
                </td>
                <td onclick="fillShape(5)">
                    <div class="td-box">
                        <img class="shape d-none" src="img/circle.png" id="circle-5">
                        <img class="shape d-none" src="img/cross.png" id="cross-5">
                    </div>
                </td>
            </tr>
            <tr>
                <td onclick="fillShape(6)">
                    <div class="td-box">
                        <img class="shape d-none" src="img/circle.png" id="circle-6">
                        <img class="shape d-none" src="img/cross.png" id="cross-6">
                    </div>
                </td>
                <td onclick="fillShape(7)">
                    <div class="td-box">
                        <img class="shape d-none" src="img/circle.png" id="circle-7">
                        <img class="shape d-none" src="img/cross.png" id="cross-7">
                    </div>
                </td>
                <td onclick="fillShape(8)">
                    <div class="td-box">
                        <img class="shape d-none" src="img/circle.png" id="circle-8">
                        <img class="shape d-none" src="img/cross.png" id="cross-8">
                    </div>
                </td>
            </tr>
        </table>
        `;
}


function templateWinner(imgSrc, player) {
    return `
    <div><img class="game-over-winner" src="${imgSrc}" id="game-over">Player ${player}</div>
    <div>win's</div>
    `;
}