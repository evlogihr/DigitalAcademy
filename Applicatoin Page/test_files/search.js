$(document).ready(function () {
    $("#SearchTerm").keyup(function (e) {
        clearTimeout($.data(this, "timer"));
        if (e.keyCode === 13) {
            search();
        } else {
            $(this).data("timer", setTimeout(search, 500));
        }
    });

    function search() {
        var existingString = $.trim($("#SearchTerm").val());
        if (existingString.length === 0) {
            $("div#SearchSuggestions").hide("slow");
            $("div#SearchSuggestions").html("");
            return;
        }

        if (countMaxConsecutiveCharacters(existingString) < 3) { 
            $("div#SearchSuggestions").html("");
            $("div#SearchSuggestions").append("<h6 class='SearchSuggestionNoResultsHeading'>Въведете поне 3 поредни символа</h6>");
            $("div#SearchSuggestions").show("slow");
            
            return;
        }

        $.get("/Search/Results", { search : existingString }, function (data) {
            $("div#SearchSuggestions").html(data);
            $("div#SearchSuggestions").show("slow");
            $("#SearchSuggestionSeeAllResultsLink").attr("href", "/Search/Results?search=" + existingString);
        });
    }

    $("#Search").on("submit", function (e) {
        var inputTerm = $.trim($("#SearchTerm").val());
        var maxConsecutiveChars = countMaxConsecutiveCharacters(inputTerm);
        if (maxConsecutiveChars < 3) {
            e.preventDefault();
        }
    });

    $("#SearchTerm").on("focusout", function() {
        $("div#SearchSuggestions").delay(200).hide("slow");
    });

    $("#SearchTerm").on("focusin", function() {
        if ($("div#SearchSuggestions").html()) {
            $("div#SearchSuggestions").show("slow");
        }
    });
    
    //Mobile Search
    $("#SearchTermMobile").keyup(function(e) {
        clearTimeout($.data(this, "timer"));
        if (e.keyCode === 13) {
            searchMobile();
        } else {
            $(this).data("timer", setTimeout(searchMobile, 500));
        }
    });

    function searchMobile() {
        var existingString = $.trim($("#SearchTermMobile").val());
        if (existingString.length === 0) {
            $("div#SearchSuggestionsMobile").hide("slow");
            $("div#SearchSuggestionsMobile").html("");
            return;
        }

        if (countMaxConsecutiveCharacters(existingString) < 3) {
            $("div#SearchSuggestionsMobile").html("");
            $("div#SearchSuggestionsMobile").append("<h6 class='SearchSuggestionNoResultsHeading'>Въведете поне 3 поредни символа</h6>");
            $("div#SearchSuggestionsMobile").show("slow");

            return;
        }

        $.get("/Search/Results", { search: existingString }, function (data) {
            $("div#SearchSuggestionsMobile").html(data);
            $("div#SearchSuggestionsMobile").show("slow");
            $("#SearchSuggestionSeeAllResultsLink").attr("href", "/Search/Results?search=" + existingString);
        });
    }

    $("#SearchMobile").on("submit", function (e) {
        var inputTerm = $.trim($("#SearchTermMobile").val());
        var maxConsecutiveChars = countMaxConsecutiveCharacters(inputTerm);
        if (maxConsecutiveChars < 3) {
            e.preventDefault();
        }
    });

    $("#SearchTermMobile").on("focusout", function() {
        $("div#SearchSuggestionsMobile").delay(200).hide("slow");
    });

    $("#SearchTermMobile").on("focusin", function() {
        if ($("div#SearchSuggestionsMobile").html()) {
            $("div#SearchSuggestionsMobile").show("slow");
        }
    });
});

function countMaxConsecutiveCharacters(input) {
    var maxConsecutive = 0;
    var currentConsecutive = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] !== " ") {
            currentConsecutive++;
            if (currentConsecutive > maxConsecutive) {
                maxConsecutive = currentConsecutive;
            }
        } else {
            currentConsecutive = 0;
        }
    }
    return maxConsecutive;
}
