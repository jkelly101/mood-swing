const dailyQuoteDiv = $("#daily-quote");

$.get("/api/dailyQuote").then((response) => dailyQuoteDiv.html(response[0].h));
