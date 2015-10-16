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
var winner = '';

// clears hand divs and values
function clear(persHand, persValue, persVal, persStatus, persStat, perAces) {
  while(persHand.firstChild) {
    persHand.removeChild(persHand.firstChild)
  }
  persValue.innerHTML = 0;
  persVal = 0;
  persStatus.innerHTML = '';
  persStat = '';
  perAces = 0;
};

function start() {
  // hide start button, show shuffle button
  $shuffle.css("visibility", "visible");
  $start.css("visibility", "hidden");
  $hit.css("visibility", "hidden");
  $stand.css("visibility", "hidden");
  $deal.css("visibility", "hidden");
  clear(playerHand, playerValue, playVal, playerStatus, playStat, playAces);
  clear(dealerHand, dealerValue, dealVal, dealerStatus, dealStat, dealAces);
  shuffledDeck = [];
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
    if (tempCard.nam === 'Ace') {
      playAces + 1;
      console.log('player Aces = ' + playAces);
    }
  } else {
    dealVal = dealVal + tempCard.val;
    dealerValue.innerHTML = dealVal;
    if (tempCard.nam === 'Ace') {
      dealAces + 1;
      console.log('dealer Aces = ' + dealAces);
    }
  }
  console.log('players aces' + playAces, 'dealers aces' + dealAces);
};

// initial deal button
$deal.click(function (event){
  hit(playerHand, playVal, playerValue);
  hit(playerHand, playVal, playerValue);
  hit(dealerHand, dealVal, dealerValue);
  hit(dealerHand, dealVal, dealerValue);
  // hide deal button show hit and stand button
  $hit.css("visibility", "visible");
  $stand.css("visibility", "visible");
  $deal.css("visibility", "hidden");
  status(playVal, playAces, playerStatus, playStat);
  if (playStat === 'win') {
    //not working try setting a dealcheck variable with an if/then in the status
    playerStatus.innerHTML === 'Blackjack!';
  }
});

// calculates hand. checks if 21, or over 21
function status(persVal, persAces, persStatus, persStat) {
  if (persVal === 21) {
      persStatus.innerHTML = ' Wins!';
      persStat = 'win';
      $start.css("visibility", "visible");
      $hit.css("visibility", "hidden");
      $stand.css("visibility", "hidden");
  } else if (persVal > 21) {
    if (persAces > 0) {
      console.log(persAces);
      persVal = persVal -10;
      console.log(persVal);
      persAces - 1;
      console.log(persAces + ' - 1');
    } else {
      persStatus.innerHTML = ' Busts!';
      persStat = 'bust';
      $start.css("visibility", "visible");
      $hit.css("visibility", "hidden");
      $stand.css("visibility", "hidden");
    }
  } else if (persVal === dealVal && persVal >= 17) {
      persStat === 'stand';
      persStatus.innerHTML = ' Stands';
  }
};

// if over 21 subtracts 10 from calcHand, or changes ace value to 1
// function softAce(aces, persVal) {
//  if (aces > 0) {
//    persVal = persVal -10;
//    return true;
//  }
// };

$hit.click(function (event){
  hit(playerHand, playVal, playerValue);
  status(player, playVal, playAces, playerStatus, playStat);
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
 status(person, persVal, persAces, persStatus, persStat)
 // if status clear
};

// compares dealer and player hands determines win
function compare() {

};

// distributes from pot according to win, asks for restart
function payout() {

};
