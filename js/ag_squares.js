"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Review Assignment

   Author: 
   Date:   
   
   Filename: ag_squares.js

*/

window.addEventListener("load", playPokerSquares);

function playPokerSquares() {
  var newCard = document.getElementById("newCard");
  var startButton = document.getElementById("startButton");
  var rowSumCells = document.querySelectorAll("table#grid th.rowsum");
  var colSumCells = document.querySelectorAll("table#grid th.colsum");
  var cardImages = document.querySelectorAll("table#grid tr td img");
  var gameScore = document.getElementById("gameScore");
  var gameResult = document.getElementById("gameResult");

  startButton.addEventListener("click", function () {
    console.log("click");
    squareGame.gameTotal = 0;
    gameScore.value = "";
    gameResult.value = "";

    for (var i = 0; i < rowSumCells.length; i++) {
      rowSumCells[i].textContent = "";
    }

    for (var i = 0; i < colSumCells.length; i++) {
      colSumCells[i].textContent = "";
    }

    for (var i = 0; i < cardImages.length; i++) {
      cardImages[i].src = "./image/ag_trans.gif";
    }

    var myDeck = new pokerDeck();
    myDeck.shuffle();

    var myStarterCard = myDeck.cards.shift();
    console.log(myDeck);
    newCard.src = myStarterCard.cardImage();

    var rowNum;
    var colNum;

    for (var i = 0; i < cardImages.length; i++) {
      cardImages[i].onclick = function (e) {
        e.target.src = myStarterCard.cardImage();

        rowNum = e.target.id.charAt(1);
        colNum = e.target.id.charAt(2);

        squareGame.cardGrid[rowNum].insertCard(myStarterCard, colNum);

        e.target.onclick = null;

        if (myDeck.cards.length > 27) {
          myStarterCard = myDeck.cards.shift();
          newCard.src = myStarterCard.cardImage();
        } else {
          newCard.src = "./image/ag_cardback3.png";

          for (var j = 0; j < 5; j++) {
            var rowTotal = squareGame.calcRowPoints(j);

            squareGame.gameTotal += rowTotal;

            rowSumCells[j].textContent = rowTotal;
          }
          for (var j = 0; j < 5; j++) {
            var colTotal = squareGame.calcColumnPoints(j);

            squareGame.gameTotal += colTotal;

            colSumCells[j].textContent = colTotal;
          }

          console.log(squareGame.gameResult);

          gameScore.value = squareGame.gameTotal;
          gameResult.textContent = squareGame.gameResult();
        }
      };
    }
  });
}                     

