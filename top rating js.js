// Data film
const movies = [
    {
        id: 1,
        title: "Spider-Man: No Way Home",
        image: "Spiderman.jpg",
        rating: 9.3,
        year: 2021,
        genre: "action",
        description: "Bercerita tentang Peter Parker yang membuka multiverse saat meminta bantuan Doctor Strange untuk membuat dunia melupakan identitasnya. Musuh lama dari film Spider-Man sebelumnya muncul, dan Spider-Man dari versi Tobey Maguire dan Andrew Garfield bergabung untuk melawannya. Film ini penuh aksi, kejutan, dan momen nostalgia..",
        director: "Jon Watts",
        cast: ["Tom Holland, Zendaya, Benedict Cumberbatch, Jamie Foxx, Tobey Maguire, and Andrew Garfield."]
    },
    {
        id: 2,
        title: "The Dark Knight",
        image: "ce10fb2e34e11afaa79ef6bf7f365f1f.jpg",
        rating: 9.0,
        year: 2023,
        genre: "action",
        description: "Batman menghadapi musuh terbesarnya, The Joker, dalam pertarungan untuk menyelamatkan Gotham City.",
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger"]
    },
    {
        id: 3,
        title: "Pulp Fiction",
        image: "cc5c6098b749a51a94b371210fd9162b.jpg",
        rating: 9.2,
        year: 1994,
        genre: "crime",
        description: "Cerita yang saling terkait tentang kejahatan di Los Angeles.",
        director: "Quentin Tarantino",
        cast: ["John Travolta", "Uma Thurman"]
    },
    {
        id: 4,
        title: "The Godfather",
        image: "510L5ypQBdL._AC_UF894,1000_QL80_.jpg",
        rating: 9.2,
        year: 2022,
        genre: "drama",
        description: "Saga keluarga mafia Italia-Amerika yang legendaris.",
        director: "Francis Ford Coppola",
        cast: ["Marlon Brando", "Al Pacino"]
    },
    {
        id: 5,
        title: "Harry Potter and the Deathly Hallows: Part 2",
        image: "Harry potta.jpg",
        rating: 9.0,
        year: 2011,
        genre: "action",
        description: "*Harry Potter and the Deathly Hallows: Part 2* (2011) mengakhiri seri dengan pertempuran final antara Harry dan Voldemort di Hogwarts..",
        director: "David Yates",
        cast: ["Daniel Radcliffe, Emma Watson, Rupert Grint"]
    }
];

// State Management
let currentMovies = [...movies];
let currentPage = 1;
const moviesPerPage = 6;

// Initial Load
window.onload = () => {
    filterMovies();
};

// Display Featured Movie (Highest Rated)
function displayFeaturedMovie() {
    const featuredMovie = movies.reduce((prev, current) => 
        (prev.rating > current.rating) ? prev : current
    );

    document.getElementById('featuredMovie').innerHTML = `
        <img src="${featuredMovie.image}" alt="${featuredMovie.title}">
        <div class="featured-info">
            <h2>${featuredMovie.title}</h2>
            <div class="rating">
                ${generateStars(featuredMovie.rating)} ${featuredMovie.rating}/10
            </div>
            <p>${featuredMovie.description}</p>
            <p><strong>Director:</strong> ${featuredMovie.director}</p>
            <p><strong>Cast:</strong> ${featuredMovie.cast.join(', ')}</p>
            <p><strong>Genre:</strong> ${featuredMovie.genre.charAt(0).toUpperCase() + featuredMovie.genre.slice(1)}</p>
            <p><strong>Year:</strong> ${featuredMovie.year}</p>
        </div>
    `;
}

// Generate Star Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    return stars;
}

// Filter Movies
function filterMovies() {
    const genre = document.getElementById('genreFilter').value;
    const year = document.getElementById('yearFilter').value;
    
    currentMovies = movies.filter(movie => {
        const genreMatch = genre === 'all' || movie.genre === genre;
        const yearMatch = year === 'all' || movie.year.toString() === year;
        return genreMatch && yearMatch;
    });
    
    sortMovies();
}

// Sort Movies
function sortMovies() {
    const sortType = document.getElementById('ratingSort').value;
    
    currentMovies.sort((a, b) => {
        if (sortType === 'highest') {
            return b.rating - a.rating;
        } else {
            return a.rating - b.rating;
        }
    });
    
    currentPage = 1;
    displayMovies();
}

// Search Movies
function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    currentMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.description.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    displayMovies();
}

// Display Movies
function displayMovies() {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToShow = currentMovies.slice(startIndex, endIndex);
    
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
    
    moviesToShow.forEach(movie => {
        const movieCard = `
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-card-info">
                    <h3>${movie.title}</h3>
                    <div class="rating">
                        ${generateStars(movie.rating)} ${movie.rating}/10
                    </div>
                    <div class="genre">${movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)} | ${movie.year}</div>
                </div>
            </div>
        `;
        movieList.innerHTML += movieCard;
    });
    
    displayPagination();
}

// Display Pagination
function displayPagination() {
    const totalPages = Math.ceil(currentMovies.length / moviesPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    // Previous button
    if (totalPages > 1) {
        pagination.innerHTML += `
            <button onclick="changePage(${currentPage - 1})" 
                    ${currentPage === 1 ? 'disabled' : ''}>
                Previous
            </button>
        `;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <button onclick="changePage(${i})" 
                    class="${currentPage === i ? 'active' : ''}">
                ${i}
            </button>
        `;
    }
    
    // Next button
    if (totalPages > 1) {
        pagination.innerHTML += `
            <button onclick="changePage(${currentPage + 1})" 
                    ${currentPage === totalPages ? 'disabled' : ''}>
                Next
            </button>
        `;
    }
}

// Change Page
function changePage(page) {
    if (page < 1 || page > Math.ceil(currentMovies.length / moviesPerPage)) {
        return;
    }
    currentPage = page;
    displayMovies();
}