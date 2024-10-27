// Data film
const movies = [
    {
        title: "Venom : The last Dance",
        image: "Venom The last dance.jpeg",
        description: "bercerita tentang Eddie Brock dan Venom yang harus menghadapi ancaman baru yang lebih kuat.",
        rating: 4.5,
        category: "action"
    },
    {
        title: "Bolehkah Sekali Saja Ku menangis",
        image: "bolehhh.jpeg",
        description: "mengisahkan tentang perjuangan Tari, seorang perempuan muda yang harus menghadapi trauma masa lalu akibat kekerasan dalam rumah tangga.",
        rating: 4.0,
        category: "drama"
    },
    {
        title: "Kuasa Gelap",
        image: "Kuasa.jpeg",
        description: "Film horor eksorsisme pertama di Indonesia yang berlatar belakang agama Katolik",
        rating: 4.7,
        category: "horror"
    },
    {
        title: "Tebusan Dosa",
        image: "Tebusan.jpeg",
        description: "film horor yang bercerita tentang seorang ibu bernama Wening yang mengalami kecelakaan motor dan kehilangan anaknya",
        rating: 4.0,
        category: "horror"
    },
    {
        title: "The Wild Robot",
        image: "the wild.jpeg",
        description: "ilm animasi bergenre sci-fi yang menceritakan tentang petualangan robot Roz yang terdampar di pulau tak berpenghuni.",
        rating: 5.0,
        category: "animation"
    },
    {
        title: "Weekend In Taipei",
        image: "Weekend.jpeg",
        description: "Berkisah tentang John Lawlor mantan agen rahasia DEA yang sedang menyamar dalam misi mengejar kartel narkoba di Taiwan.",
        rating: 3.8,
        category: "action"
    }

];

let currentMovies = [...movies];

// Fungsi untuk mencari film
function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Filter film berdasarkan kata kunci pencarian
    currentMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchTerm) ||
               movie.description.toLowerCase().includes(searchTerm) ||
               movie.director.toLowerCase().includes(searchTerm) ||
               movie.cast.some(actor => actor.toLowerCase().includes(searchTerm));
    });

    // Tampilkan pesan jika tidak ada hasil
    const noResultsElement = document.getElementById('noResults');
    if (currentMovies.length === 0) {
        noResultsElement.style.display = 'block';
    } else {
        noResultsElement.style.display = 'none';
    }

    displayMovies(currentMovies);
}

// Event listener untuk pencarian real-time
document.getElementById('searchInput').addEventListener('input', function(e) {
    if (e.target.value === '') {
        currentMovies = [...movies];
        document.getElementById('noResults').style.display = 'none';
        displayMovies(currentMovies);
    } else {
        searchMovies();
    }
});

// Fungsi untuk filter film berdasarkan kategori
function filterMovies(category) {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (category === 'all') {
        currentMovies = searchTerm ? 
            movies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.description.toLowerCase().includes(searchTerm)
            ) : [...movies];
    } else {
        currentMovies = movies.filter(movie => {
            const categoryMatch = movie.category === category;
            const searchMatch = searchTerm ? 
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.description.toLowerCase().includes(searchTerm) : true;
            return categoryMatch && searchMatch;
        });
    }

    // Tampilkan pesan jika tidak ada hasil
    const noResultsElement = document.getElementById('noResults');
    if (currentMovies.length === 0) {
        noResultsElement.style.display = 'block';
    } else {
        noResultsElement.style.display = 'none';
    }

    displayMovies(currentMovies);
}

// Fungsi untuk menampilkan film
function displayMovies(moviesToShow) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '';

    moviesToShow.forEach(movie => {
        const movieCard = `
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.title}" class="movie-image">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-description">${movie.description}</p>
                    <p class="rating">Rating: ${movie.rating}/5</p>
                    <p class="director">Director: ${movie.director}</p>
                    <p class="cast">Cast: ${movie.cast.join(', ')}</p>
                    <p class="release-date">Release Date: ${movie.releaseDate}</p>
                </div>
            </div>
        `;
        movieGrid.innerHTML += movieCard;
    });
}

// Initialize the page
window.onload = () => {
    displayMovies(movies);
};