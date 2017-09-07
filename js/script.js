// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var quotesLog = []; //array for storing whats been shown allready
var timer = setInterval(printQuote, 20000); //getting a quote every 20th second

window.onload = function (){
  printQuote(); //start with a random quote
}

//get a random quote from the quotes array in quotes.js
//and make sure it hasn't allready been shown
function getRandomQuote (){
  var randomNumber = getRandomNumber();
  console.log("*** Getting quote | randomNumber = " + randomNumber + " ***");
  console.log("-> quotes shown: " + quotesLog.length + " [" + quotesLog.join(",") + "]");

  if (quotesLog.length < quotes.length){ //if unused quotes left, lets try

    for (i = 0; i <= quotesLog.length; i++){ //is this quote allready shown?

        if (quotesLog.indexOf(randomNumber) > -1){ //yes: try again with new number
          randomNumber = getRandomNumber();
          console.log("Quote shown, trying again with " + randomNumber);
          i = -1; //resetting the loop

        } else { //no: return the quote, push number to log
            console.log("Quote NOT shown, returning: " + quotes[randomNumber].quote);
            quotesLog.push(randomNumber);
            return quotes[randomNumber];
          }
        }

    } else { //no quotes left, returning quote and starting over
        console.log("Quoteslog full, resetting and returning: " + quotes[randomNumber].quote);
        quotesLog = []; //empty log
        quotesLog.push(randomNumber);
        return quotes[randomNumber];
    }
}

function getRandomNumber(){
  return Math.floor(Math.random() * quotes.length);
}

//gathering and outputting the quote and any additional data
function printQuote(){
  changeBackground();
  setTimer(); //reset timer, avoiding new quote earlier then 20 sec after click
  var randomQuote = getRandomQuote(); //get random quote as object
  var textToPrint;  //declaring the string to send to the HTML

  //this prints every time (quote and source, required fields)
  textToPrint = '<p class="quote">' + randomQuote.quote + '</p>' +
    '<p class="source">' + randomQuote.source;

  if (randomQuote.citation){ //do we have a citation? if so; print it
    textToPrint += '<span class="citation">' + randomQuote.citation + '</span>'
  }
  if (randomQuote.year){ //do we have a year?
    textToPrint += '<span class="year">' + randomQuote.year + '</span>';
  }
  if (randomQuote.link){ //do we have a link?
    textToPrint += '<span class="link"><a target="_blank" href="' +
    randomQuote.link + '"> &#128065</a></span>'; //unicode for an eye
  }

  textToPrint += '</p>'; //ending the paragraph "source"
  document.getElementById('quote-box').innerHTML = textToPrint; //print it
}

//changing the background per quote
function changeBackground(){
  var letters = "0123456789ABCDEF"; //building bricks of hex color
  var color = "#"; //declaring and starting the hex color to be made
  for (var i = 0; i < 6; i++) { //hex color consists of six numbers/letters
    color += letters.charAt(Math.floor(Math.random() * 16)); //mixing the 16 bricks
  }
  document.body.style.backgroundColor = color;
  document.getElementById("loadQuote").style.backgroundColor = color;
}

//reset the timer by turning it off and on again
function setTimer(){
  console.log("Setting timer for 20 seconds.");
  clearInterval(timer);
  timer = setInterval(printQuote, 20000);
}
