console.log('apps working');

// dealer section
//var $dealerHand = $('.dealer-hand');
var dealerHand = document.getElementById('dealer-hand');
var dealerValue = document.getElementById('dealer-value');
var dealerStatus = document.getElementById('d-status');

// betting section
var $dealerBank = $('#dealer-bank');
var $playerBank = $('#player-bank');
var $pot = $('#pot');
var $playerBet = $('#player-bet');
var $dealerBet = $('#dealer-bet');

// player section
//var $playerHand = $('.player-hand');
var playerHand = document.getElementById('player-hand');
var playerValue = document.getElementById('player-value');
var playerStatus = document.getElementById('p-status');

//buttons
var $start = $('#start');
var $betInput = $('#bet-input');
var $betButton = $('#bet-button');
var $shuffle = $('#shuffle');
var $deal = $('#deal');
var $hit = $('#hit');
var $stand = $('#stand');

var dealer = 'Dealer';
var player = 'Player';
var dealVal = 0;
var playVal = 0;
var dealStat = '';
var playStat = '';
var dealAces = 0;
var playAces = 0;
var dealPlay = true;

// clears hand divs and values
function clear(persHand, persValue, persStatus, persStat) {
  while (persHand.firstChild) {
    persHand.removeChild(persHand.firstChild)
  }
  persValue.innerHTML = 0;
  dealVal = 0;
  playVal = 0;
  console.log(dealVal, playVal);
  persStatus.innerHTML = '';
  persStat = '';
  dealAces = 0;
  playAces = 0;
};

function start() {
  // hide start button, show shuffle button
  $shuffle.css("visibility", "visible");
  $start.css("visibility", "hidden");
  $hit.css("visibility", "hidden");
  $stand.css("visibility", "hidden");
  $deal.css("visibility", "hidden");
  clear(playerHand, playerValue, playerStatus, playStat);
  clear(dealerHand, dealerValue, dealerStatus, dealStat);
  shuffledDeck = [];
  console.log('shuffled deck length = ' + shuffledDeck.length);
  dealPlay = true;
};
start();

//click start to reset board and deck, clear bet and pot
$start.click(function (event){
  start();
});

// takes input, removes amout from bank and into pot
function bet() {

};

// click shuffle to randomize the deckOfCards
$shuffle.click(function (event){
  var shuffle = function(a) {
    for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
    return a;
  };
  shuffledDeck = shuffle(deckOfCards);
  // hide shuffle button show deal button
  $deal.css("visibility", "visible");
  $shuffle.css("visibility", "hidden");
});

// deals a card and adds the value to the person's hand total

function hit(personHand, persVal, personValue) {
  var newCard = document.createElement('div');
  newCard.setAttribute('class', 'cards');
  personHand.appendChild(newCard);
  var tempCard = shuffledDeck.pop();
  newCard.innerHTML = tempCard.img;
  if (personHand === playerHand) {
    playVal = playVal + tempCard.val;
    playerValue.innerHTML = playVal;
    if (tempCard.val === 11) {
      playAces = playAces + 1;
      console.log('player Aces = ' + playAces);
    }
  } else {
    dealVal = dealVal + tempCard.val;
    dealerValue.innerHTML = dealVal;
    if (tempCard.val === 11) {
      dealAces = dealAces + 1;
      console.log('dealer Aces = ' + dealAces);
    }
  }
};

// initial deal button
$deal.click(function (event){
  hit(playerHand, playVal, playerValue);
  hit(playerHand, playVal, playerValue);
  hit(dealerHand, dealVal, dealerValue);
  hit(dealerHand, dealVal, dealerValue);
  $hit.css("visibility", "visible");
  $stand.css("visibility", "visible");
  $deal.css("visibility", "hidden");
  checkStatus(playVal, playerValue, playAces, playerStatus, playStat);
});

// calculates hand. checks if 21, or over 21
function checkStatus(persVal, persValue, persAces, persStatus, persStat) {
  if (persVal === 21) {
    if (dealPlay === true) {
      persStatus.innerHTML = 'Blackjack!';
      console.log("blackjack!");
      persStat = 'win';
      $start.css("visibility", "visible");
      $hit.css("visibility", "hidden");
      $stand.css("visibility", "hidden");
      dealPlay = false;
    } else {
      persStatus.innerHTML = ' Wins!';
      persStat = 'win';
      $start.css("visibility", "visible");
      $hit.css("visibility", "hidden");
      $stand.css("visibility", "hidden");
    }
  } else if (persVal > 21) {
    if (persAces > 0) {
      console.log(persAces);
      persVal = persVal -10;
      persValue.innerHTML = persVal;
      console.log(persVal);
      console.log('play aces before ' + persAces);
      persAces = persAces - 1;
      console.log('play aces after - 1 ' + persAces);
      checkStatus(persVal, persValue, persAces, persStatus, persStat);
    } else {
      persStatus.innerHTML = ' Busts!';
      persStat = 'bust';
      $start.css("visibility", "visible");
      $hit.css("visibility", "hidden");
      $stand.css("visibility", "hidden");
    }
  } else if (persVal === dealVal && persVal >= 17) {
      persStat = 'stand';
      persStatus.innerHTML = ' Stands';
  }
};

$hit.click(function (event){
  dealPlay = false;
  hit(playerHand, playVal, playerValue);
  checkStatus(playVal, playerValue, playAces, playerStatus, playStat);
  // hide deal button, show hit and stand button
  //$hit.css("visibility", "visible");
  //$stand.css("visibility", "visible");
  $deal.css("visibility", "hidden");
});

// onclick moves onto compare()
function stand(person) {
  $hit.css("visibility", "hidden");
  //if dealer();
};

$stand.click(function (event){

});

// dealer AI hits unti 17 then stands
function dealer() {
  // check status
 checkStatus(persVal, persAces, persStatus, persStat)
 // if status clear
};

// compares dealer and player hands determines win
function compare() {

};

// distributes from pot according to win, asks for restart
function payout() {

};
