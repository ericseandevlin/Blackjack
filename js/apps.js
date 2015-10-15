console.log('apps working');

// dealer section
//var $dealerHand = $('.dealer-hand');
var dealerHand = document.getElementById('dealer-hand');
var $dealerValue = $('#dealer-value');

// betting section
var $dealerBank = $('#dealer-bank');
var $playerBank = $('#player-bank');
var $pot = $('#pot');
var $playerBet = $('#player-bet');
var $dealerBet = $('#dealer-bet');

// player section
//var $playerHand = $('.player-hand');
var playerHand = document.getElementById('player-hand');
var $playerValue = $('#player-value');

//buttons
var $start = $('#start');
var $betInput = $('#bet-input');
var $betButton = $('#bet-button');
var $shuffle = $('#shuffle');
var $deal = $('#deal');
var $hit = $('#hit');
var $stand = $('#stand');

var winner = '';

// click start to reset board and deck, clear bet and pot
// $start.click(function (event)){
//
// }

// takes input, removes amout from bank and into pot
function bet() {

};

// click shuffle to randomize the deckOfCards
$shuffle.click(function (event){
  var shuffle = function(a) {
      for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
      return a;
};
shuffle(deckOfCards);
// for (var i=0; i<deckOfCards.length; i++) {
//   console.log(deckOfCards[i].name + ' of ' + deckOfCards[i].suit);
// }
});

// deals cards to each player and dealer
function deal(personHand) {
  var newCard = document.createElement('div');
  newCard.setAttribute('class', 'cards');
  personHand.appendChild(newCard);
  var tempCard = testCards.pop();
  newCard.innerHTML = tempCard.img;
};
deal(playerHand);
deal(playerHand);
deal(dealerHand);
deal(dealerHand);

console.log(playerHand);
console.log(dealerHand);

// calculates value of hand
function calcHand() {

};

// if over 21 subtracts 10 from calcHand, or changes ace value to 1
function softAce() {

};

// shows hit and stand buttons
function hitOrStand() {

}

// draws a card from the deck and adds to hand
function hit() {

};

// onclick moves onto compare()
function stand() {

};

// dealer AI hits unti 17 then stands
function dealer() {

};

// compares dealer and player hands determines win
function compare() {

};

// distributes from pot according to win, asks for restart
function payout() {

};
