
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	
  	/*--- Hide gameOver modal box ---*/
  	$("a.closeGameOver").click(function(){
  		$(".gameOver").fadeOut(1000);
  	});

	// Returns a random integer between min (included) and max (included)
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomIntInclusive(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function validUserInput (num) {
		if (isNaN(num) || (num % 1 != 0) || (num <=0)) {
			return false;		// Not a Number, or not an int, or not positive
		}
		else {
		   return true; 	
		};
	};


	function provideFeedback(guess,target) {
		var feedback = "";
		var gameOver = false;

		var diff = Math.abs(target-guess);

		if (diff ==0) {feedback = 'You Win!!!  Start a New Game to Play Again'; gameOver = true;}
		else if (diff <5) {feedback = "Burning Up!"}
		else if (diff <=10) { feedback = 'Very Hot!'}
		else if (diff <=20) {feedback = "Hot!"}
		else if (diff <= 30) {feedback = "Warm!"}
		else if (diff <= 50) {feedback = "Cold..." }
		else {feedback = 'Very Cold..Brrr!'};

		// output feedback
		$('h2#feedback').text(feedback);

		// increment and output count of guesses
		guessCount++;
		$('span#count').text(guessCount);

		// add guess to list of guesses
		$('ul#guessList').append("<li>"+guess+"</li>")

		return gameOver;
	};

	var numToGuess = 0;
	var guessCount = 0;
	var currentGuess = 0;
	var userWon = false;


	function newGame() {
		numToGuess = getRandomIntInclusive(1,100);
		console.log('Target = ' + numToGuess);
		guessCount = 0;
		currentGuess = 0;
		userWon = false;

		$('h2#feedback').text('Make your Guess!');
		$('span#count').text(guessCount);
		$('ul#guessList li').remove();
	
	};

  	$(".new").click(function(){
  		event.preventDefault();
		newGame();
  	});
	

  	newGame();
	$('form').submit (function (event) {
			event.preventDefault();

			if (validUserInput($('input').val())) {
				currentGuess = +$('input').val();
				userWon = provideFeedback (currentGuess, numToGuess);
				if (userWon) {
					$(".gameOver").fadeIn(1000);
				};

			}
			else {
				$('h2#feedback').text('Invalid Guess- Try Again!');
			};
			$(this)[0].reset();
	});

});

