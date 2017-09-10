/* script.js:
  Fullstack Javascript Techdegree, project 1
  "Random Quote Generator" by Ole Petter Baugerød Stokke
  www.olepetterstokke.no/treehouse/project1 */

// event listener to respond to "Show another quote" button clicks
document.getElementById("loadQuote").addEventListener("click", printQuote, false);

var quotesLog = []; //array for storing whats been shown allready
var timer = setInterval(printQuote, 20000); //getting a quote every 20th second

window.onload = function (){ //start with a random quote
  printQuote();
}

/* getRandomQuote(): Get random quote object.
  Picked randomly from the "qoutes" array in "quotes.js".
  We log every random number being used to actually show quote, in the quotesLog array.
  Each random number is checked, to see if the random number has allready been used.
  When all numbers have been used (all quotes shown), the array is reset. */

function getRandomQuote (){
  var randomNumber = getRandomNumber();
  console.log("*** Getting quote | randomNumber = " + randomNumber + " ***");
  console.log("-> quotes shown: " + quotesLog.length + " [" + quotesLog.join(",") + "]");

  if (quotesLog.length < quotes.length){            //if unused quotes left at all
    for (i = 0; i <= quotesLog.length; i++){
        if (quotesLog.indexOf(randomNumber) > -1){  //if random quote index in log
          randomNumber = getRandomNumber();         //try again, reset loop
          console.log("Quote shown, trying again with " + randomNumber);
          i = -1;
        } else {                                    //if not in log, go ahead
            console.log("Quote NOT shown, returning: " + quotes[randomNumber].quote);
            quotesLog.push(randomNumber);
            return quotes[randomNumber];
          }
        }

    } else {                                        //if no quotes left, empty log and return quote
        console.log("Quoteslog full, resetting log and returning: " + quotes[randomNumber].quote);
        quotesLog = [];
        quotesLog.push(randomNumber);
        return quotes[randomNumber];
    }
}

/*printQuote(): Outputting the random quote as HTML.
  First we change the colors and reset the timer.
  Then we output available data from the quote-object to HTML.*/

function printQuote(){
  changeBackground();
  resetTimer();
  var randomQuote = getRandomQuote();
  var textToPrint;

  textToPrint = "<p class='quote'>" + randomQuote.quote + "</p>" +
    "<p class='source'>" + randomQuote.source;
  if (randomQuote.citation){
    textToPrint += "<span class='citation'>" + randomQuote.citation + "</span>"
  }
  if (randomQuote.year){
    textToPrint += "<span class='year'>" + randomQuote.year + "</span>";
  }
  if (randomQuote.link){ //outputs as an eye-link
    textToPrint += "<span class='link'><a target='_blank' href='" +
    randomQuote.link + "'> &#128065</a></span>";
  }
  textToPrint += "</p>"; //ending the "source" paragraph

  document.getElementById("quote-box").innerHTML = textToPrint;
}

/*changeBackground(): Randomly change the background and button color.
  A hex color consists of a # sign followed by 6 numbers/letters.
  Each are randomly selected from the 16 in "letters" string.*/

function changeBackground(){
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters.charAt(Math.floor(Math.random() * 16));
  }
  document.body.style.backgroundColor = color;
  document.getElementById("loadQuote").style.backgroundColor = color;
}

/*resetTimer(): Reset the timer.
  Done thru turning it off and on again.
  This is done to prevent the quote from changing earlier than 20 sec. after click.*/

function resetTimer(){
  console.log("Setting timer for 20 seconds.");
  clearInterval(timer);
  timer = setInterval(printQuote, 20000);
}

/*getRandomNumber(): Getting a random number from 0 to quotes.length.
  Made as we need a random number two times in the getRandomQuote(),
  to don't repeat ourself.*/

function getRandomNumber(){
  return Math.floor(Math.random() * quotes.length);
}
