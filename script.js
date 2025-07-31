document.getElementById("searchButton").addEventListener("click", fetchMovies);

function fetchMovies() {
    const movieName = document.getElementById("searchInput").value.trim();
    if (movieName === "") {
        alert("Please enter a movie name.");
        return;
    }

    // Ensure config.js is loaded
    if (typeof config === "undefined" || !config.API_KEY) {
        console.error("API Key is missing. Make sure config.js is included.");
        alert("API configuration error. Please check your setup.");
        return;
    }

    const apiKey = config.API_KEY;
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;

    console.log("Fetching from:", url); // Debugging

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // Debugging
            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                alert("No movies found. Try another search.");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

function displayMovies(movies) {
    const movieContainer = document.getElementById("movieContainer");
    movieContainer.innerHTML = ""; 

    // Sort movies by year (descending)
    movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'no-image.png'}" alt="${movie.Title}">
            <h3>${movie.Title} (${movie.Year})</h3>
        `;

        movieContainer.appendChild(movieCard);
    });
}