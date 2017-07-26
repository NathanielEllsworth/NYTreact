//Variables of question answers and number of questions (global)

// **ask if question.length is needed to avoid hard coding question array length**


function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}

function validateDateValue(str) {
    if (isNormalInteger(str)) {
        var date = Number.parseInt(str);
        if (date < 1900 || date > 2017) {
            return false;
        }
    }
    return true;
}

$(document).ready(function () {

    $("#searchButton").on("click", function () {

        var usersearchstring = $("#userSearch").val();
        console.log("User searched for article: " + usersearchstring);

        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

        var startDate = ($("#userStart").val().trim().substr(0,4) || "2000") + "0101"; // 20000101
        var endDate = ($("#userEnd").val().trim().substr(0,4) || "2017") + "0101"; // 20170101

        console.log("Start: " + startDate);
        console.log("End: " + endDate);


        url += '?' + $.param({
            'api-key': "1b28775532ae4894b37bd690ab8be500",
                'q' : $("#userSearch").val(),
                'limit' : $("#userNumber").val() || "10",
                'begin_date' : startDate,
                'end_date' : endDate,
                'sort' : "newest",
        });

        console.log(url);

        $.ajax({
            url: url,
            method: "GET"
        }).done(function (response) {
            // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
            // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.
            console.log(response);

            // Step 2: since the image information is inside of the data key,
            // make a variable named results and set it equal to response.data

            // =============== put step 2 in between these dashes ==================
            var results = response.response.docs;

            $(".articles").empty();

            for (var i = 0; i < results.length; i++) {
                var article = results[i];
                $("<h3>").text(article.headline.main).appendTo(".articles");
            }
            // ========================
        });
    });

});


