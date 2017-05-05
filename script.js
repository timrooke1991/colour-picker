var numSquares = 8;
var colors = [];
var pickedColor;
var count = 0;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {

	setupModeButtons()
	setupSquares()
	reset();
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		
		modeButtons[i].addEventListener("click", function() {  
		
		// style the selected buttons
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		modeButtons[2].classList.remove("selected");
		modeButtons[3].classList.remove("selected");
	    this.classList.add("selected");

	    removeExtreme();

	    if (this.textContent === "Easy") {
	    	numSquares = 4;
	    } else if(this.textContent === "Medium") {
	    	numSquares = 8;
	    } else if (this.textContent === "Extreme") {
            numSquares = 48;
            extremeSetup();
	    } else {
			numSquares = 12;
	    }
	    
	    reset();

		});
	}
}

function setupSquares() {

	for (var i = 0; i < squares.length; i++) {

	// add click listeners to squares
		squares[i].addEventListener("click", function() {
            
            count++
			clickedColor = this.style.background;

			if (clickedColor === pickedColor) {
				count === 1 ? messageDisplay.textContent = "Wow! First time!" : messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
	            h1.style.background = clickedColor;
			} else {
				this.style.background = "#232323";
				
				if (count === (colors.length - 1)) {
				  messageDisplay.textContent = "You can't go wrong now";
				} else {  
				  messageDisplay.textContent = "Try Again";
				}
			}
		});
	}
}

function extremeSetup() {
    for (var i = 0; i < squares.length; i++) {
	    squares[i].classList.toggle("extreme")
    }
}

function removeExtreme() {
    for (var i = 0; i < squares.length; i++) {
	    squares[i].classList.remove("extreme")
    }
}

function reset() {
	// generate new colors
	colors = generateRandomColors(numSquares);

	// pick a new random color from array
	pickedColor = pickColor();
	count = 0;

	// change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;

	messageDisplay.textContent = "";
	resetButton.textContent = "New Colours";

	// reset h1 background to black
	h1.style.background = "steelBlue";

	// add new colours to squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
	      squares[i].style.display = "block";
          squares[i].style.background = colors[i];
    	} else {
    	  squares[i].style.display = "none";
    	}
	}

}

resetButton.addEventListener("click", function() {
	reset();
})

// coloring all squares the correct color
function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// build an array of colors
function generateRandomColors(num) {
	var arr = []
    
    // build array of colors
	for (var i = 0 ; i < num; i++) {
		// runs the randomColor function num times and pushes the color into an array
		arr.push(randomColor());
	};

    return arr
}

// generate a random color
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}





