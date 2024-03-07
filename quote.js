const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const btn = document.querySelector("#btn");

btn.addEventListener("click", getQuote);

function getQuote() {
    fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((data) => {
            quote.innerHTML = `"${data.content}"`;
            author.innerHTML = data.author;
        });
}

function saveQuote() {
    var quoteText = quote.textContent;
    var authorText = author.textContent.replace("- ", ""); // Adjusted to remove the "- " prefix
    var currentTime = new Date(); // Get the current date and time
    var timestamp = currentTime.toLocaleString(); // Convert the current date and time to a string

    var savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    savedQuotes.push({ quote: quoteText, author: authorText, timestamp: timestamp });
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));

    alert("Quote saved successfully!");

    // Redirect to the saved quotes page
    // window.location.href = "save.html";
}

function displaySavedQuotes() {
    var savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
    var savedQuotesList = document.getElementById('savedQuotes');
    savedQuotesList.innerHTML = ''; 
    savedQuotes.forEach(function(savedQuote, index) {
        var listItem = document.createElement('li');
        var quoteText = '"' + savedQuote.quote + '" - ' + savedQuote.author;
        var timestamp = savedQuote.timestamp;
        var formattedTimestamp = new Date(timestamp).toLocaleString(); // Convert timestamp to a formatted string
        listItem.textContent = quoteText + ' (Saved at: ' + formattedTimestamp + ')';
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteQuote(index);
        };
        listItem.appendChild(deleteButton);
        savedQuotesList.appendChild(listItem);
    });
}

