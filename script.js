const gameContainer = document.getElementById("game");
let cardsFlipped = 0;
let cardOne = null;
let cardTwo = null;
let stopClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(stopClick) return;
  let cardClicked = event.target;
  cardClicked.style.backgroundColor = cardClicked.classList[0];
  //Need a way to assign value to card one & card two
  if(!cardOne || !cardTwo) {
    cardClicked.classList.add("flipped");
    cardOne = cardOne || cardClicked;
    if(cardOne === cardClicked) {
      cardTwo = null;
    }
    else {
      cardTwo = cardClicked;
    }
  }

  if(cardOne && cardTwo) {
    stopClick = true;
    let classOne = cardOne.className;
    let classTwo = cardTwo.className;

    if(classOne === classTwo)
    {
      cardsFlipped += 2;
      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);
      cardOne = null;
      cardTwo = null;
      console.log("MATCH");
      stopClick = false;
    }
    else{
      setTimeout(function(){
        cardOne.style.backgroundColor = "";
        cardTwo.style.backgroundColor = "";
        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");
        cardOne = null;
        cardTwo = null;
        stopClick = false;
      }, 1000);
    }
  }
  console.log("you just clicked", event.target);
  if(cardsFlipped === COLORS.length) {
    alert ("GAME OVER!");
  }
  
}

// when the DOM loads
createDivsForColors(shuffledColors);















