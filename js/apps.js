console.log('apps working');

// dealer section
var dealerHand = document.getElementById('dealer-hand');
var dealerValue = document.getElementById('dealer-value');
var dealerStatus = document.getElementById('d-status');

// betting section
var dealerBank = document.getElementById('dealer-bank');
var playerBank = document.getElementById('player-bank');
var pot = document.getElementById('current-pot-value');
var playerBet = document.getElementById('player-bet');
var dealerBet = document.getElementById('dealer-bet');

// player section
var playerHand = document.getElementById('player-hand');
var playerValue = document.getElementById('player-value');
var playerStatus = document.getElementById('p-status');

//buttons
var $start = $('#start');
var $bet1 = $('#bet-1');
var $bet5 = $('#bet-5');
var $bet25 = $('#bet-25');
var $bet100 = $('#bet-100');
var $betConfirm = $('#bet-confirm');
// var $shuffle = $('#shuffle');
var $deal = $('#deal');
var $hit = $('#hit');
var $stand = $('#stand');

// more fun variables
var dealer = 'Dealer';
var player = 'Player';
var dealVal = 0;
var playVal = 0;
var dealStat = '';
var playStat = '';
var dealAces = 0;
var playAces = 0;
var dealPlay = true;
var dealBack = true;
var playBet = 0;
var dealBet = 0;
var popo = 0;
var playBank = 100;
var dealBank = 100;

///////////////////////////////////
/////   FUNCTIONS   ///////////////
///////////////////////////////////

// clears hand divs and values
function clear(persHand, persValue, persStat) {
  while (persHand.firstChild) {
    persHand.removeChild(persHand.firstChild)
  }
  persValue.innerHTML = 0;
  dealVal = 0;
  playVal = 0;
  playerStatus.innerHTML = '';
  dealerStatus.innerHTML = '';
  console.log(playerStatus.innerHTML, dealerStatus.innerHTML);
  playStat = '';
  dealStat = '';
  dealAces = 0;
  playAces = 0;
  dealBack = true;
};

function deal() {
  //$shuffle.css("visibility", "visible");
  //$start.css("visibility", "hidden");
  // clear(playerHand, playerValue, playStat);
  // clear(dealerHand, dealerValue, dealStat);
  // shuffledDeck = [];
  // dealPlay = true;

  // shuffle
  var shuffle = function(a) {
    for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
    return a;
  };
  shuffledDeck = deckOfCards.slice(0);
  shuffle(shuffledDeck);
  //$deal.css("visibility", "visible");
  //$shuffle.css("visibility", "hidden");

  // deal
  hit(playerHand, playVal, playerValue);
  hit(playerHand, playVal, playerValue);
  // adding back img to dealer hand
  var newCard = document.createElement('div');
  newCard.setAttribute('class', 'cards');
  newCard.setAttribute('id', 'back');
  dealerHand.appendChild(newCard);
  newCard.innerHTML = cardBack.img;
  hit(dealerHand, dealVal, dealerValue);
  // $hit.css("visibility", "visible");
  // $stand.css("visibility", "visible");
  // $deal.css("visibility", "hidden");
  checkStatus(player, playVal, playerValue, playAces, playerStatus, playStat, playerBank);
  $hit.css("visibility", "visible");
  $stand.css("visibility", "visible");
  $deal.css("visibility", "hidden");
}
// function start() {
//   // hide start button, show shuffle button
//   $shuffle.css("visibility", "visible");
//   $start.css("visibility", "hidden");
//   $hit.css("visibility", "hidden");
//   $stand.css("visibility", "hidden");
//   $deal.css("visibility", "hidden");
//   clear(playerHand, playerValue, playStat);
//   clear(dealerHand, dealerValue, dealStat);
//   shuffledDeck = [];
//   //console.log('shuffled deck length = ' + shuffledDeck.length);
//   dealPlay = true;
// };
// start();

//calculates pot
// function potCalc () {
//   console.log("adding up pot!");
//   console.log('dealer bet ' + dealerBet);
//   console.log('player bet ' + playerBet);
//   pot = playerBet.innter + dealerBet;
//   console.log('pot is ' + pot);
// };

// takes input, removes amout from bank and into pot
function bet(num) {
  console.log('betting!');
  playBet = playBet + num;
  dealBet = playBet;
  playBank = playBank - playBet;
  dealBank = dealBank - dealBet;
  playerBank.innerHTML = 'Player Bank: ' + playBank;
  dealerBank.innerHTML = 'Dealer Bank: ' + dealBank;
  playerBet.innerHTML = playBet;
  dealerBet.innerHTML = dealBet;
};

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

// calculates hand. checks if 21, or over 21
function checkStatus(person, persVal, persValue, persAces, persStatus, persStat, persBank) {
  console.log('checking status');
  console.log('person: '+person+'. persVal: '+persVal+'. persAces: '+persAces+'. persStat: '+persStat);
  console.log('dealPlay is ' + dealPlay);
  if (persVal === 21) {
    if (dealPlay === true) {
      persStatus.innerHTML = ' got Blackjack!';
      console.log("blackjack!");
      // I notice setting variables through parameters doesn't always work.
      //'blackjack' below isn'g getting set into dealStat or playStat when those are put into the persStat parameter
      // so I have to set each one explicitly - not very efficient code...
      // persStat = 'blackjack';
      // console.log(person + ' got ' + persStat);
      // console.log('playStat is: ' + playStat);
      // console.log('dealStat is: ' + dealStat);
      if (person === 'Player') {
        playStat = 'blackjack';
      } else {
        dealStat = 'blackjack';
      }
      dealPlay = false;
      compare();
    } // end check for blackjack
  } else if (persVal > 21) {  // check if they have Aces
    if (playVal > 21 && playAces > 0) {
      console.log(person + ' aces left: ' + persAces);
      playVal = playVal - 10;
      playAces = playAces - 1;
      playerValue.innerHTML = playVal;
      console.log(person +' used an ace. val is now '+playVal);
      checkStatus(player, playVal, playerValue, playAces, playerStatus, playStat, playerBank);
    } else if (dealVal > 21 && dealAces > 0){
      console.log(person + ' aces left: ' + persAces);
      dealVal = dealVal - 10;
      dealAces = dealAces - 1;
      dealerValue.innerHTML = dealVal;
      console.log(person +' used an ace. val is now '+dealVal);
      checkStatus(dealer, dealVal, dealerValue, dealAces, dealerStatus, dealStat, dealerBank);

   // end check for aces
    } else if (person === 'Player') { // if no aces then bust
      console.log('player busts');
      playerStatus.innerHTML = ' Busts!';
      playStat = 'bust';
      console.log('playStat: '+ playStat);
      $hit.css("visibility", "hidden");
      $stand.css("visibility", "hidden");
      //dealerAI();
      compare();
    } else {
      console.log('dealer busts');
      dealerStatus.innerHTML = ' Busts!';
      dealStat = 'bust';
      console.log('dealStat: '+ dealStat);
      compare();
    } // end who busts
  } // end of 21 flow
}; // end checkStatus

// dealer AI hits unti 17 then stands
function dealerAI() {
  console.log('dealer AI starting');
  if (dealBack === true) {
    var back = document.getElementById('back');
    var tempCard = shuffledDeck.pop();
    back.innerHTML = tempCard.img;
    dealVal = dealVal + tempCard.val;
    dealerValue.innerHTML = dealVal;
    if (tempCard.val === 11) {
      dealAces = dealAces + 1;
      console.log('dealer Aces = ' + dealAces);
    }
    dealBack = false;
  }
  if ( dealVal > 17 ) {
    console.log('dealer checking for Blackjack');
    checkStatus(dealer, dealVal, dealerValue, dealAces, dealerStatus, dealStat, dealerBank);
    if ((dealStat !== 'blackjack') && (dealStat !== 'bust')) {
      console.log('dealer stands');
      dealerStatus.innerHTML = ' Stands';
      dealStat = 'dealer stands with val '+ dealVal;
      compare();
    }
  } else {
      console.log('dealer hits');
      hit(dealerHand, dealVal, dealerValue);
      dealPlay = false;
      console.log('dealer hand value ' + dealVal);
      dealerAI();
  }
}; // end dealer AI

// compares dealer and player hands determines win
function compare() {
 console.log("comparing: "+'dealStat '+dealStat+ ' dealVal '+dealVal+'. playStat '+playStat+' playVal '+playVal);
 // if it's blackjack
 if (playStat === 'blackjack') {
   console.log('compare - player wins, blackjack');
   dealerStatus.innerHTML = ' Loses!';
   dealStat = 'lose';
   payout(player, playBank, playerBank, playStat);
 } else if (dealStat === 'blackjack') {
   console.log('compare - dealer wins, blackjack');
   playerStatus.innerHTML = ' Loses!';
   playStat = 'lose';
   payout(dealer, dealBank, dealerBank, dealStat);

 // if there's a bust
 } else if (dealStat === 'bust') {
   console.log('compare - player wins, dealer bust');
   playerStatus.innerHTML = ' Wins!';
   dealerStatus.innerHTML = ' Busts!';
   playStat = 'win';
   dealStat = 'bust';
   payout(player, playBank, playerBank, playStat);
 } else if ( playStat === 'bust') {
   console.log('compare - dealer wins stand/bust');
   playerStatus.innerHTML = ' Busts!';
   dealerStatus.innerHTML = ' Wins!';
   playStat = 'bust';
   dealStat = 'win';
   payout(dealer, dealBank, dealerBank, dealStat);

   // if both are George Zimmerman
 } else if ( playVal > dealVal ) {
   console.log('compare - player wins > dealer');
   playerStatus.innerHTML = ' Wins!';
   dealerStatus.innerHTML = ' Loses!';
   playStat = 'win';
   dealStat = 'lose';
   payout(player, playBank, playerBank, playStat);
 } else if ( dealVal > playVal ) {
   console.log('compare - dealer wins > player');
   playerStatus.innerHTML = ' Loses!';
   dealerStatus.innerHTML = ' Wins!';
   playStat = 'lose';
   dealStat = 'win';
   payout(dealer, dealBank, dealerBank, dealStat);

   // push
 } else {
   console.log('compare - push');
   dealerStatus.innerHTML = ' Push';
   playerStatus.innerHTML = ' Push';
   playStat = 'push';
   dealStat = 'push';
   payout(player, playBank, playerBank, 'push');
 }
}; // end compare

// distributes from pot according to win, asks for restart
function payout(person, persBank, personBank, persStat) {
  console.log('paying out');
  if (persStat === ' Push') {
    dealBank = dealBank + dealBet;
    playBank = playBank + playBet;
    dealerBank.innerHTML = 'Dealer Bank: ' + dealBank;
    playerBank.innerHTML = 'Player Bank: ' + playBank;
    pot.innerHTML = 0;
    popo = 0;
    dealerBet.innerHTML = 0;
    playerBet.innerHTML = 0;
    playBet = 0;
    dealBet = 0;
    //potCalc();
  } else {
    persBank = persBank + popo;
    personBank.innerHTML = person + ' Bank: ' + persBank;
    pot.innerHTML = 0;
    popo = 0;
    dealerBet.innerHTML = 0;
    playerBet.innerHTML = 0;
    playBet = 0;
    dealBet = 0;
    //potCalc();
  }
  $start.css("visibility", "visible");
  // $bet5.css("visibility", "visible");
  // $bet25.css("visibility", "visible");
  // $bet100.css("visibility", "visible");
  // $betConfirm.css("visibility", "visible");
  $hit.css("visibility", "hidden");
  $stand.css("visibility", "hidden");
}; // end of payout

///////////////////////////////////
/////   EVENTS   //////////////////
///////////////////////////////////

// click start to reset board and deck, clear bet and pot
$start.click(function (event){
  $start.css("visibility", "hidden");
  $bet1.css("visibility", "visible");
  $bet5.css("visibility", "visible");
  $bet25.css("visibility", "visible");
  $bet100.css("visibility", "visible");
  $betConfirm.css("visibility", "visible");
  clear(playerHand, playerValue, playStat);
  clear(dealerHand, dealerValue, dealStat);
  shuffledDeck = [];
  //console.log('shuffled deck length = ' + shuffledDeck.length);
  dealPlay = true;
});

$bet1.click(function (event){
  bet(1);
});

$bet5.click(function (event){
  bet(5);
});

$bet25.click(function (event){
  bet(25);
});

$bet100.click(function (event){
  bet(100);
});

$betConfirm.click(function (event){
  console.log('confirming');
  popo = popo + playBet + dealBet;
  pot.innerHTML = popo;
  $deal.css("visibility", "visible");
  $bet1.css("visibility", "hidden");
  $bet5.css("visibility", "hidden");
  $bet25.css("visibility", "hidden");
  $bet100.css("visibility", "hidden");
  $betConfirm.css("visibility", "hidden");
});

// click shuffle to randomize the deckOfCards
// $shuffle.click(function (event){
//   var shuffle = function(a) {
//     for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
//     return a;
//   };
//   shuffledDeck = deckOfCards.slice(0);
//   shuffle(shuffledDeck);
//   $deal.css("visibility", "visible");
//   $shuffle.css("visibility", "hidden");
// });

// initial deal button
$deal.click(function (event){
  deal();
}); // end deal button


// hit button for the player
$hit.click(function (event){
  console.log('player hits');
  dealPlay = false;
  hit(playerHand, playVal, playerValue);
  checkStatus(player, playVal, playerValue, playAces, playerStatus, playStat, playerBank);
  //$deal.css("visibility", "hidden");
});


// stand
$stand.click(function (event){
  console.log('player stands');
  playStat = 'player standing with val '+playVal;
  playerStatus.innerHTML = ' Stands';
  $hit.css("visibility", "hidden");
  $stand.css("visibility", "hidden");
  dealPlay = true;
  dealerAI();
}); // end stand

$start.css("visibility", "hidden");
$deal.css("visibility", "hidden");
$hit.css("visibility", "hidden");
$stand.css("visibility", "hidden");
