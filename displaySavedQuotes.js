function deleteQuote(index) {
    var savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
    savedQuotes.splice(index, 1);
    localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
    displaySavedQuotes();
}
function displaySavedQuotes() {
    var savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    var savedQuotesList = document.getElementById("savedQuotes");
    savedQuotesList.innerHTML = "";
    savedQuotes.forEach(function (savedQuote, index) {
        var listItem = document.createElement("li");
        listItem.className = "saved-quote"; // Adding class for flex container
        listItem.textContent = '"' + savedQuote.quote + '" - ' + savedQuote.author;
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function () {
            deleteQuote(index);
        };
        listItem.appendChild(deleteButton);
        savedQuotesList.appendChild(listItem);
    });
}

displaySavedQuotes();