let boardBoxes = document.querySelectorAll(".game-board-box");
let crossIcon = `<i class="fa-solid fa-xmark cross-icon-placed"></i>`;
let circleIcon = `<i class="fa-regular fa-circle circle-icon-placed"></i>`;
let mode, crossPlayer, circlePlayer, currentTurn;
let boardStatus = new Array(9);
let cssVariables = document.documentElement.style;

// WIN PANEL ELEMENTS

let winPanelCrossSign = `<i class="fa-solid fa-xmark win-panel-cross"></i><div>TAKES THE ROUND</div>`;
let winPanelCircleSign = `<i class="fa-regular fa-circle win-panel-circle"></i></i><div>TAKES THE ROUND</div>`;
let winPanelPerson = document.querySelector(".win-person");
let winPanelInfo = document.querySelector(".next-round-info");

let winPlayerIcon, winPlayerNo;

// NAV ICON TURN ELEMENTS

let navIconTurnScreen = document.querySelector(".icon-turn");
let navCrossIconTurn = `<i class="fa-solid fa-xmark"></i> TURN`;
let navCircleIconTurn = `<i class="fa-regular fa-circle"></i> TURN`;

// SCORE BOARD ELEMENTS

let player1ScoreBoardText = document.querySelector(".player-1-text");
let player2ScoreBoardText = document.querySelector(".player-2-text");
let scoreBoardCross = `<i class="fa-solid fa-xmark"></i>`;
let scoreBoardCircle = `<i class="fa-regular fa-circle"></i>`;

let player1ScorePanel = document.querySelector(".player-1-score");
let player2ScorePanel = document.querySelector(".player-2-score");
let tiesScorePanel = document.querySelector(".ties-score");

let player1Score = 0,
  player2Score = 0,
  tiesScore = 0;

// _____GENERAL PART_____

let initPlayersAndTurn = (cross, circle, turn) => {
  crossPlayer = cross;
  circlePlayer = circle;
  currentTurn = turn;
};

//  Initiating players and turns
initPlayersAndTurn(1, 2, 1);

let btnSelectionCrossIcon = document.querySelector(".btn-selection-cross");
let btnSelectionCircleIcon = document.querySelector(".btn-selection-circle");

btnSelectionCircleIcon.addEventListener("click", () => {
  btnSelectionCircleIcon.classList.add("selected-icon");
  btnSelectionCrossIcon.classList.remove("selected-icon");

  //  Setting both players' icons
  initPlayersAndTurn(2, 1, 2);
});
btnSelectionCrossIcon.addEventListener("click", () => {
  btnSelectionCrossIcon.classList.add("selected-icon");
  btnSelectionCircleIcon.classList.remove("selected-icon");

  //  Setting both players' icons
  initPlayersAndTurn(1, 2, 1);
});

// PLAYER VS PLAYER

let playerVsCpuBtn = document.querySelector(".player-vs-cpu-btn");
let playerVsPlayerBtn = document.querySelector(".player-vs-player-btn");

playerVsPlayerBtn.addEventListener("click", () => {
  cssVariables.setProperty("--main-menu-display", "none");
  cssVariables.setProperty("--main-panel-display", "block");

  mode = "pvp";

  // Setting players score boards based on player 1's icon selection

  if (crossPlayer === 1) {
    cssVariables.setProperty("--player-1-score-bg-color", "rgb(0, 208, 255)");
    player1ScoreBoardText.innerHTML =
      scoreBoardCross + player1ScoreBoardText.innerHTML;

    cssVariables.setProperty("--player-2-score-bg-color", "rgb(255, 174, 0)");
    player2ScoreBoardText.innerHTML =
      scoreBoardCircle + player2ScoreBoardText.innerHTML;
  } else if (crossPlayer === 2) {
    cssVariables.setProperty("--player-1-score-bg-color", "rgb(255, 174, 0)");
    player1ScoreBoardText.innerHTML =
      scoreBoardCircle + player1ScoreBoardText.innerHTML;

    cssVariables.setProperty("--player-2-score-bg-color", "rgb(0, 208, 255)");
    player2ScoreBoardText.innerHTML =
      scoreBoardCross + player2ScoreBoardText.innerHTML;
  }

  navIconTurnScreen.innerHTML = navCrossIconTurn;

  console.log("CROSS: PLAYER#", crossPlayer);
  console.log("CIRCLE: PLAYER#", circlePlayer);
  console.log("TURN: ", currentTurn);
  console.log(boardStatus);
});

// _____EACH BOX BUTTON LISTENER IN PLAYER VS PLAYER_____

// WIN BOXES SETTING

let winBoxesHighlight = (button1, button2, button3, cssClassName) => {
  button1.classList.add(cssClassName);
  button2.classList.add(cssClassName);
  button3.classList.add(cssClassName);
};

// SETTING WIN PANEL FIELDS AFTER SOMEONE WINS OR MATCH TIES

let winPanelSetting = (winIcon, winNo) => {
  // Next round's first turn player number
  // currentTurn = winNo;

  winPlayerIcon = winIcon;
  winPlayerNo = winNo;

  // Updating win panel info for person who has won
  winPanelPerson.innerText = "PLAYER#" + winNo + " WON!";
  if (winIcon === "cross") {
    winPanelInfo.innerHTML = winPanelCrossSign;
    cssVariables.setProperty("--win-text-font-color", "rgb(0, 208, 255)");
  }
  // winPlayerSign === "circle"
  else {
    winPanelInfo.innerHTML = winPanelCircleSign;
    cssVariables.setProperty("--win-text-font-color", "rgb(255, 174, 0)");
  }
};

let processingWin = (i, j, k) => {
  if (
    boardStatus[i] === boardStatus[j] &&
    boardStatus[i] === boardStatus[k] &&
    boardStatus[i] !== undefined
  ) {
    // Change font color of winning boxes in tic tac toe board

    winBoxesHighlight(
      boardBoxes[i].querySelector("i"),
      boardBoxes[j].querySelector("i"),
      boardBoxes[k].querySelector("i"),
      "cross-placed-font-color"
    );

    if (boardStatus[i] === crossPlayer) {
      if (crossPlayer === 1) {
        console.log("CROSS PLAYER#1");

        winPanelSetting("cross", 1);
        // To increment score, if player 1 wins the round
        ++player1Score;
        player1ScorePanel.innerText = player1Score;
      } else {
        // crossPlayer === 2
        console.log("CROSS PLAYER#2");

        winPanelSetting("cross", 2);
        // To increment score, if player 2 wins the round
        ++player2Score;
        player2ScorePanel.innerText = player2Score;
      }

      winBoxesHighlight(
        boardBoxes[i],
        boardBoxes[j],
        boardBoxes[k],
        "cross-placed-win-bg-color"
      );
    }
    // boardStatus[i] === circlePlayer
    else {
      if (circlePlayer === 1) {
        console.log("CIRCLE PLAYER#1");

        // To display win panel when round ends
        winPanelSetting("circle", 1);
        // To increment score, if player 1 wins the round
        ++player1Score;
        player1ScorePanel.innerText = player1Score;
      } else {
        // circlePlayer === 2
        console.log("CIRCLE PLAYER#2");

        winPanelSetting("circle", 2);
        // To increment score, if player 2 wins the round
        ++player2Score;
        player2ScorePanel.innerText = player2Score;
      }

      winBoxesHighlight(
        boardBoxes[i],
        boardBoxes[j],
        boardBoxes[k],
        "circle-placed-win-bg-color"
      );
    }

    // Display win panel
    cssVariables.setProperty("--win-panel-display", "flex");

    return true;
  }
  return false;
};

let verifyWin = () => {
  if (processingWin(0, 1, 2)) return;
  if (processingWin(3, 4, 5)) return;
  if (processingWin(6, 7, 8)) return;
  if (processingWin(0, 3, 6)) return;
  if (processingWin(1, 4, 7)) return;
  if (processingWin(2, 5, 8)) return;
  if (processingWin(0, 4, 8)) return;
  if (processingWin(2, 4, 6)) return;

  // Checking if all boxes are filled already and no one won the round

  let n = 0;
  for (let i = 0; i < boardStatus.length; i++) {
    if (boardStatus[i] === undefined) {
      ++n;
    }
  }
  if (n === 0) {
    winPanelPerson.innerText = "TIE!";
    winPanelInfo.innerHTML = winPanelCrossSign;
    cssVariables.setProperty("--win-text-font-color", "rgb(0, 208, 255)");
    cssVariables.setProperty("--win-panel-display", "flex");

    // To increment score, if no one wins the round.
    ++tiesScore;
    tiesScorePanel.innerText = tiesScore;
    // Setting next round's first turn
    currentTurn = crossPlayer;
    // Since match tied, next round will be of cross player
    winPlayerIcon = "cross";
    winPlayerNo = crossPlayer;
  }
};

for (let i = 0; i < boardBoxes.length; i++) {
  boardBoxes[i].addEventListener("click", () => {
    if (mode === "pvp") {
      if (boardStatus[i] === undefined) {
        if (crossPlayer === currentTurn) {
          // Add icon
          boardBoxes[i].innerHTML = crossIcon;
          // Putting entry in board status array
          boardStatus[i] = crossPlayer;
          // Verifying win
          verifyWin();
          // Update nav icon turn
          navIconTurnScreen.innerHTML = navCircleIconTurn;
          // Next turn's player number
          currentTurn = circlePlayer;
        } else if (circlePlayer === currentTurn) {
          boardBoxes[i].innerHTML = circleIcon;
          boardStatus[i] = circlePlayer;
          verifyWin();
          navIconTurnScreen.innerHTML = navCrossIconTurn;
          currentTurn = crossPlayer;
        }
      } else {
        console.log("Already filled (PLAYER VS PLAYER)");
      }
    } else {
      if (boardStatus[i] === undefined) {
        if (crossPlayer === currentTurn) {
        } else if (circlePlayer === currentTurn) {
        }
      } else {
        console.log("Already filled (PLAYER VS CPU)");
      }
    }
  });

  boardBoxes[i].addEventListener("mouseenter", () => {
    console.log("ENTERED");
  });

  boardBoxes[i].addEventListener("mouseleave", () => {
    console.log("LEFT");
  });
}

// _____TO MOVE TO NEXT ROUND_____

let clearGameBoard = () => {
  // Resetting everything on tic tac toe board to move to next round

  for (let i = 0; i < boardBoxes.length; i++) {
    if (boardBoxes[i].firstElementChild !== null) {
      // Removing all icon insertions to board boxes and board status for each box
      boardBoxes[i].firstElementChild.remove(); // Removing cross/circle from board boxes
    }
    boardStatus[i] = undefined;
    // unhighlighting the winning boxes
    boardBoxes[i].classList.remove("circle-placed-win-bg-color");
    boardBoxes[i].classList.remove("cross-placed-win-bg-color");
  }
};

let resetTurnAndPanel = () => {
  // Setting next round's first turn based on who won last round
  currentTurn = winPlayerNo;
  // Setting current turn panel icon based on whose turn is
  if (winPlayerIcon === "cross") {
    navIconTurnScreen.innerHTML = navCrossIconTurn;
  }
  // winPlayerIcon === "circle"
  else {
    navIconTurnScreen.innerHTML = navCircleIconTurn;
  }
};

let winPanelNextRoundBtn = document.querySelector(".next-round-btn");

winPanelNextRoundBtn.addEventListener("click", () => {
  cssVariables.setProperty("--win-panel-display", "none");
  resetTurnAndPanel();
  clearGameBoard();
});

// _____QUIT GAME_____

let resetScoreBoardsAndTurns = () => {
  cssVariables.setProperty("--main-menu-display", "flex");
  cssVariables.setProperty("--main-panel-display", "none");

  currentTurn = crossPlayer;
  tiesScore = 0;
  player1Score = 0;
  player2Score = 0;
  player1ScorePanel.innerText = player1Score;
  player2ScorePanel.innerText = player2Score;
  tiesScorePanel.innerText = tiesScore;

  player1ScoreBoardText.firstElementChild.remove();
  player2ScoreBoardText.firstElementChild.remove();
};

let navRestartBtn = document.querySelector(".restart-btn");

navRestartBtn.addEventListener("click", () => {
  clearGameBoard();
  resetScoreBoardsAndTurns();
});

let winPanelQuitBtn = document.querySelector(".quit-btn");

winPanelQuitBtn.addEventListener("click", () => {
  cssVariables.setProperty("--win-panel-display", "none");
  clearGameBoard();
  resetScoreBoardsAndTurns();
});

// _____PLAYER VS CPU_____

playerVsCpuBtn.addEventListener("click", () => {
  cssVariables.setProperty("--main-menu-display", "none");
  cssVariables.setProperty("--main-panel-display", "block");
  mode = "pvc";
});

playerVsCpuBtn.addEventListener();
