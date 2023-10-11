// script.js

$(document).ready(function () {
    $.getJSON('links.json', function (data) {
        // Function to perform the search
        function performSearch() {
            const searchTerm = $('#searchInput').val().toLowerCase();
            const category = $('.categoryButton.active').data('category');
            
            // Filter documents based on the selected category and search term
            const results = data.filter(item => {
                return (category === 'all' || item.keywords.includes(category)) &&
                    item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
            });

            displayResults(results);
        }

// Function to display search results in a grid
function displayResults(results) {
    const $resultsGrid = $('#resultsGrid');
    $resultsGrid.empty();

    if (results.length === 0) {
        $resultsGrid.html('<p>No results found.</p>');
    } else {
        results.forEach(result => {
            const iconPath = result.image || 'default-icon.png'; // Use a default icon if not specified
            const iconAlt = result.name;
            const documentName = result.name;
            const documentLink = result.link;

            // Create a grid item for each document with a clickable link
            const $gridItem = $('<div class="grid-item"></div>');
            const $link = $('<a href="' + documentLink + '" target="_blank"></a>'); // Create an anchor element
            $link.addClass('custom-link'); // Add a custom CSS class to the anchor element
            $link.append(`<img src="${iconPath}" alt="${iconAlt}" class="icon">`);
            $link.append(`<p>${documentName}</p>`);
            
            $gridItem.append($link);
            $resultsGrid.append($gridItem);
        });
    }
}



        // Event listener for the search button
        $('#searchButton').click(() => {
            performSearch();
        });

        // Event listener for pressing Enter in the search input
        $('#searchInput').keypress(event => {
            if (event.which === 13) {
                event.preventDefault(); // Prevent form submission on Enter key
                performSearch();
            }
        });

        // Event listener for category buttons
        $('.categoryButton').click(function () {
            $('.categoryButton').removeClass('active');
            $(this).addClass('active');
            performSearch();
        });

        // Initialize the search with "All" category selected
        $('.categoryButton[data-category="all"]').addClass('active');
        performSearch();
    });
});
