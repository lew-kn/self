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

$(document).ready(function () {
    // Existing code for search and categories...

    // Admin button password check
    $('#adminButton').click(function() {
        const password = prompt("Please enter the admin password:");

        if (password === '1234') {
            window.location.href = 'admin.html'; // Redirect to admin page
        } else {
            alert('Incorrect password. Access denied.');
        }
    });

    // Your existing search and grid functions...
});


function displayResults(results) {
    const $resultsGrid = $('#resultsGrid');
    $resultsGrid.empty();

    if (results.length === 0) {
        $resultsGrid.html('<p>No results found.</p>');
    } else {
        results.forEach(result => {
            const iconPath = result.image || 'default-icon.png';
            const iconAlt = result.name;
            const documentName = result.name;
            const documentLink = result.link;

            const $gridItem = $('<div class="grid-item"></div>');
            const $link = $('<a href="' + documentLink + '" target="_blank"></a>');
            $link.addClass('custom-link');
            $link.append(`<img src="${iconPath}" alt="${iconAlt}" class="icon">`);
            $link.append(`<p>${documentName}</p>`);

            // Add click event handler to log the click
            $link.click(function() {
                logClick(result.name);  // Log the click event
            });

            $gridItem.append($link);
            $resultsGrid.append($gridItem);
        });
    }
}

// Function to log the click to an admin page or server
function logClick(documentName) {
    // Example using localStorage to store click counts
    let clicks = localStorage.getItem('clicks') ? JSON.parse(localStorage.getItem('clicks')) : {};
    
    if (clicks[documentName]) {
        clicks[documentName]++;
    } else {
        clicks[documentName] = 1;
    }
    
    localStorage.setItem('clicks', JSON.stringify(clicks));

    // Optionally, send the click data to your admin page
    $.post('/admin-page-endpoint', { documentName: documentName }, function(response) {
        console.log('Click logged:', response);
    });
}


        
         // Get the current year
    const currentYear = new Date().getFullYear();

    // Update the copyright year element
    document.getElementById('copyright-year').textContent = currentYear;


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

// Get the current year
const currentYear = new Date().getFullYear();

// Update the copyright year element
document.getElementById('copyright-year').textContent = currentYear;




