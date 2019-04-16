$(document).ready( startup );


function startup(){
  gameStartUp();
  addEventListeners();
  addShuffledCards(frontCardClassesArray);
}


function gameStartUp(){
  $('#startButton').on('click',hideStartGameScreen)
}

function hideStartGameScreen (){
  $('.startPage').hide();
}


function addEventListeners(){
  $(".card").on('click', handleCardClick );
  $("#reset-button").on('click', resetGame );
  $(".newGame-button").on('click', newGame );
  $('.games_played .value').text(gamesPlayed);
  $('.attempts .value').text(attemptsCounter);
  $('.accuracy .value').text(matchAccuracy,"%");
  $("#settingsButton").on('click', showGameSettingsLoad);
  $('#gameSettingsShadowDiv').on('click', hideGameSettingsLoad);
}

var theFirstCard = null;
var theSecondCard = null;
var totalPossibleMatches = 12;
var matchCardCounter = 0;
var prevGameMatchedCardCounter = 0;
var totalMatchCardCounter = 0;
var attemptsCounter = 0;
var prevGameAttemptsCounter = 0;
var matchAccuracy = 0+"%";
var prevGameAccuracy=0;
var gamesPlayed = 0;
var clickableCards = true;

var frontCardClassesArray = ['ar33_assualt_rifle'
,'dd44_dostovei'
,'golden_gun'
,'kf7_soviet'
,'klobb'
,'moonraker_laser'
,'phantom'
,'rc_p90'
,'shotgun'
,'silenced_pp7'
,'sniper_rifle'
,'grenade_launcher',
'ar33_assualt_rifle'
,'dd44_dostovei'
,'golden_gun'
,'kf7_soviet'
,'klobb'
,'moonraker_laser'
,'phantom'
,'rc_p90'
,'shotgun'
,'silenced_pp7'
,'sniper_rifle'
,'grenade_launcher'];

function shuffleCards(frontCards){
  var currentIndex = frontCards.length, temporaryValue, randomIndex

  while(currentIndex){

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = frontCards[currentIndex];
    frontCards[currentIndex] = frontCards[randomIndex];
    frontCards[randomIndex] = temporaryValue;
  }

  return frontCards;
}

function addShuffledCards(frontCards){
  var frontCards = shuffleCards(frontCards);
  var allFrontCards = $('.front');
  for(var i =0; i<allFrontCards.length; i++){
    var randomFrontCard = frontCards[i];
    $(allFrontCards[i]).addClass(randomFrontCard)
    // $(allFrontCards[i]).attr('cardVisual', randomFrontCard);
    console.log($(allFrontCards[i]));
  }
}

function removeFrontCardVariables(frontCards){
  var allFrontCards = $('.front');
  for(var i =0; i<allFrontCards.length; i++){
    var randomFrontCard = frontCards[i];
      for(var p = 0; p<frontCards.length; p++){
        $(allFrontCards[p]).removeClass(randomFrontCard)
        console.log(allFrontCards);
    }
  }
  addShuffledCards(frontCards);
}


function realTimeAccuracyCalculation(counter, attempts) {
  if(counter===0){
    return 0;
  }
  var calcAccuracy = Math.round((counter/attempts)*100);
  return calcAccuracy;
}

function accuracyUpdates() {
  var accuracyToDisplay = realTimeAccuracyCalculation(totalMatchCardCounter, attemptsCounter);
  var accuracyCounterDivElement = $('.accuracy .value');
  accuracyCounterDivElement.text(accuracyToDisplay+"%");
}

function attemptsUpdates() {
  var attemptsCounterDivElement = $('.attempts .value');
  attemptsCounterDivElement.text(attemptsCounter);
}

function displayGamesPlayed(){
  var gamesPlayedDivElement = $('.games_played .value');
  gamesPlayedDivElement.text(gamesPlayed);
}


function handleCardClick(){
  if($(this).hasClass('hideTheBack') || !clickableCards){
    return;
  }
  $(this).addClass('hideTheBack');

  //$(this).addClass('tempLockCard');
    if(theFirstCard === null){
      theFirstCard = this;
    } else {
      theSecondCard = this;
      var firstImg = $(theFirstCard).find('.front').css('background-image');
      var secondImg = $(theSecondCard).find('.front').css('background-image');
      console.log(firstImg, secondImg);
      clickableCards =false;
        if(firstImg === secondImg){
            console.log('MATCH!')
            matchCardCounter += 1;
            totalMatchCardCounter += 1;
            attemptsCounter += 1;
            matchedCardRevert();
            if(matchCardCounter === totalPossibleMatches){
                console.log('YOU WON!')
                gamesPlayed += 1;
                displayGamesPlayed();
            }
      } else {
        //lockAllCards();
        setTimeout( revertCards, 1500);
        attemptsCounter += 1;
      }
      attemptsUpdates();
      accuracyUpdates ();
    }
}

function revertCards(){
  $(theFirstCard).removeClass('hideTheBack');
  $(theSecondCard).removeClass('hideTheBack');
  //$(theFirstCard).removeClass('tempLockCard');
 // $(theSecondCard).removeClass('tempLockCard');
  clickableCards=true;
 //$('.card').removeClass('tempLockCard');
  theFirstCard = null;
  theSecondCard = null;
}
/*
function lockAllCards() {
  var selectAllBackCards = $('.card');
  selectAllBackCards.addClass('tempLockCard');
}
*/
function matchedCardRevert(){
    //$(theFirstCard).addClass('lockCard');
   // $(theSecondCard).addClass('lockCard');
    //$('.card').removeClass('tempLockCard');
    clickableCards=true;
    theFirstCard = null;
    theSecondCard = null;
}

function resetGame(){
  fullGameReset();
  console.log('Reset button');
}

function revertAllCardsToBack(){
  var selectAllCards = $('.card');
  clickableCards=true;
  selectAllCards.removeClass('hideTheBack');
  //selectAllCards.removeClass('tempLockCard lockCard');
}

function fullGameReset(){
  theFirstCard = null;
  theSecondCard = null;
  totalPossibleMatches = 12;
  matchCardCounter = 0;
  totalMatchCardCounter =0;
  attemptsCounter = 0;
  gamesPlayed = 0;
  displayGamesPlayed();
  accuracyUpdates();
  attemptsUpdates();
  revertAllCardsToBack();
  removeFrontCardVariables(frontCardClassesArray);
}


function newGameResetVariables() {
  theFirstCard = null;
  theSecondCard = null;
  totalPossibleMatches = 12;
  matchCardCounter = 0;
  gamesPlayed += 1;
  displayGamesPlayed();
  revertAllCardsToBack();
  removeFrontCardVariables(frontCardClassesArray);
}

function newGame(){
  newGameResetVariables();
  console.log("New Game Setup Complete");
}

function showGameSettingsLoad(){
  var gameSettingsWindow = $('#gameSettingsWindowContainer');
  $('#gameSettingsShadowDiv').show();
  gameSettingsWindow.show();

  console.log('settings showed');
}

function hideGameSettingsLoad(){
  var gameSettingsWindow = $('#gameSettingsWindowContainer');
  $('#gameSettingsShadowDiv').hide();
  gameSettingsWindow.hide();
  console.log('settings hidden');
}
