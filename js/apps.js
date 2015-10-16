console.log('apps working');

// dealer section
var dealerHand = document.getElementById('dealer-hand');
var dealerValue = document.getElementById('dealer-value');
var dealerStatus = document.getElementById('d-status');

// betting section
var dealerBank = document.getElementById('dealer-bank');
var playerBank = document.getElementById('player-bank');
var pot = document.getElementById('pot');
var playerBet = document.getElementById('player-bet');
var dealerBet = document.getElementById('dealer-bet');

// player section
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
  //console.log(dealVal, playVal);
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
  //console.log('shuffled deck length = ' + shuffledDeck.length);
  dealPlay = true;
};
start();

//click start to reset board and deck, clear bet and pot
$start.click(function (event){
  start();
});

//calculates pot
function potCalc () {
  console.log("adding up pot!");
  console.log('dealer bet ' + dealerBet);
  console.log('player bet ' + playerBet);
  pot = playerBet.innter + dealerBet;
  console.log('pot is ' + pot);
};

// takes input, removes amout from bank and into pot
function bet() {
  console.log('betting!');
  playerBet.innerHTML = 10;
  dealerBet.innerHTML = 10;
  potCalc();
};

// click shuffle to randomize the deckOfCards
$shuffle.click(function (event){
  var shuffle = function(a) {
    for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
    return a;
  };
  //shuffledDeck = deckOfCards.slice(0);
  shuffledDeck = deckOfCards.slice(0);
  shuffle(shuffledDeck);
  //onsole.log('shuffled deck length = ' + shuffledDeck.length);
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
}; //end hit

// initial deal button
$deal.click(function (event){
  hit(playerHand, playVal, playerValue);
  hit(playerHand, playVal, playerValue);
  hit(dealerHand, dealVal, dealerValue);
  hit(dealerHand, dealVal, dealerValue);
  $hit.css("visibility", "visible");
  $stand.css("visibility", "visible");
  $deal.css("visibility", "hidden");
  checkStatus(playVal, playerValue, playAces, playerStatus, playStat, playerBank);
});

// calculates hand. checks if 21, or over 21
function checkStatus(persVal, persValue, persAces, persStatus, persStat, persBank) {
  console.log('checking status');
  if (persVal === 21) {
    if (dealPlay === true) {
      persStatus.innerHTML = ' got Blackjack!';
      console.log("blackjack!");
      persStat = 'blackjack';
      dealPlay = false;
      payout(persBank, persStat);
    // } else {
    //   persStat = 'win';
    }
  } else if (persVal > 21) {
    // soft Aces
    if (persAces > 0) {
      console.log(persAces);
      persVal = persVal -10;
      persValue.innerHTML = persVal;
      console.log(persVal);
      console.log('play aces before ' + persAces);
      persAces = persAces - 1;
      console.log('play aces after - 1 ' + persAces);
      checkStatus(persVal, persValue, persAces, persStatus, persStat, persBank);
    } else {
      if (persStat === playStat) {
        persStatus.innerHTML = ' Busts!';
        persStat = 'bust';
        $hit.css("visibility", "hidden");
        $stand.css("visibility", "hidden");
        //dealerAI();
        payout(dealerBank, dealStat);
      } else {
        persStatus.innerHTML = ' Busts!';
        persStat = 'bust';
        payout(playerBank, playStat);
      }
    }
  }
}; // end checkStatus

// hit button for the player
$hit.click(function (event){
  dealPlay = false;
  hit(playerHand, playVal, playerValue);
  checkStatus(playVal, playerValue, playAces, playerStatus, playStat, playerBank);
  $deal.css("visibility", "hidden");
});

// dealer AI hits unti 17 then stands
function dealerAI() {
  if ( dealVal > 17 ) {
    console.log('dealer checking for Blackjack');
    checkStatus(dealVal, dealerValue, dealAces, dealerStatus, dealStat, dealerBank);
    if ((dealStat != 'blackjack') && (dealStat != 'bust')) {
      dealerStatus.innerHTML = ' Stands.'
      dealStat = 'stand';
      compare();
    }
  } else {
      console.log('dealer hits');
      hit(dealerHand, dealVal, dealerValue);
      dealerAI();
  }
}; // end dealer AI

// stand
$stand.click(function (event){
  playerStatus.innerHTML = ' Stands.';
  $hit.css("visibility", "hidden");
  $stand.css("visibility", "hidden");
  dealPlay = true;
  dealerAI();
}); // end stand

// compares dealer and player hands determines win
function compare() {
 console.log("comparing!");
 if (dealVal === playVal) {
   dealerStatus = ' Push';
   playerStatus = ' Push';
   payout(playerBank, 'push');
 } else if ( playVal > dealVal ) {
   playerStatus.innerHTML = ' Wins!';
   playerStatus = 'wins';
   dealerStatus = 'bust';
   payout(playerBank, playStat);
 } else {
   dealerStatus.innerHTML = ' Wins!';
   playerStatus = 'bust';
   dealerStatus = 'win';
   payout(dealerBank, dealStat);
 }
}; // end compare

// distributes from pot according to win, asks for restart
function payout(persBank, persStat) {
  console.log('paying out finally');
  if (persStat === ' Push') {
    dealerBank = dealerBank + dealerBet;
    playerBank = playerBank + playerBet;
    dealerBet = 0;
    playerBet = 0;
    potCalc();
  } else {
    persBank = persBank + pot;
    dealerBet = 0;
    playerBet = 0;
    potCalc();
  }
  $start.css("visibility", "visible");
  $hit.css("visibility", "hidden");
  $stand.css("visibility", "hidden");
}; // end of payout
