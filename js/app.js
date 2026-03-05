// Configurazione API key e URL's

const API_KEY = "11a1836c755f548cbd0f246fc407b563";
const urlBase = `https://api.themoviedb.org/3`;
const urlImg = `https://image.tmdb.org/t/p/w500`;

// Selezione elementi DOM

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsGrid = document.getElementById('results');
const statusEl = document.getElementById('status');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

// Funzione searchMovie

const searchMovie = async (query) => {
    try {
        statusEl.innerHTML = '<div class="spinner"></div>';
        const response = await fetch(`${urlBase}/search/movie?api_key=${API_KEY}&query=${query}&language=it-IT`);
        if (response.ok) {
            const jsonResponse = await response.json();
            statusEl.innerHTML = '';
            resultsGrid.innerHTML = '';
            movieCard(jsonResponse.results);
        } else {
            throw new Error ("Request Failed!")
        }
    } catch (error) {
        statusEl.innerHTML = 'Qualcosa è andato storto.';
        console.log(error)
    }
};

// Rendering delle card

const movieCard = (movies) => {
    movies.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
        <img class="card-poster" src="${element.poster_path ? urlImg + element.poster_path : 'https://placehold.co/500x750/13131a/7a7870?text=Nessuna+Copertina'}" />
        <div class="card-body">
          <div class="card-title">${element.title}</div>
          <div class="card-meta">
            <span class="card-year">${element.release_date?.slice(0, 4) || "N/D"}</span>
            <span class="card-rating">★ ${element.vote_average.toFixed(1)}</span>
          </div>
        </div>
        `;
        resultsGrid.appendChild(card);
        // Event listener su card usando fetchMovieDetails()
        card.addEventListener('click', () => {
            fetchMovieDetails(element.id)
})
    });
}

// Event listener su searchBtn e sul pulsante invio

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    searchMovie(query);
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchMovie(searchInput.value);
    }
});

// Funzione fetchMovieDetails(id)

const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${urlBase}/movie/${id}?api_key=${API_KEY}&language=it-IT`)
        if (response.ok) {
            const jsonResponse = await response.json();

            modalContent.innerHTML = '';
            modalContent.innerHTML = `
            <img class="modal-poster" src="${urlImg}${jsonResponse.poster_path}" alt="Official poster of ${jsonResponse.original_title}" />
            <div class="modal-info">
              <h2 class="modal-title">${jsonResponse.original_title}</h2>
              <p class="modal-tagline">${jsonResponse.tagline}</p>

              <div class="modal-badges">
                <span class="badge accent">★ ${jsonResponse.vote_average.toFixed(1)}</span>
                <span class="badge">${jsonResponse.release_date?.slice(0, 4) || "N/D"}</span>
                <span class="badge">${jsonResponse.runtime} minuti</span>  
                ${jsonResponse.genres.map(genre => `<span class="badge">${genre.name}</span>`).join('')}
              </div>

          <p class="modal-overview">${jsonResponse.overview}</p> 

          <div class="modal-stats">
            <div class="stat-item">
              <div class="stat-value">$ ${Math.floor(jsonResponse.budget / 1000000)}M</div>
              <div class="stat-label">Budget</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">$ ${Math.floor(jsonResponse.revenue / 1000000)}M</div>
              <div class="stat-label">Incasso</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${jsonResponse.vote_average.toFixed(1)}</div>
              <div class="stat-label">Voto Medio</div>
            </div>
          </div>
        </div>       
            `;
           modal.classList.add('open');    
        }
    } catch (error) {
        console.log(error)
    }
};

// Chiudere il modal con bottone x o cliccando sull'overlay

closeModal.addEventListener('click', () => {
    modal.classList.remove('open')
});

modalOverlay.addEventListener('click', () => {
    modal.classList.remove('open')
});





