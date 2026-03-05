# 🎬 CineSearch

Un'app per cercare film usando le API di [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Demo

Cerca qualsiasi film per titolo, visualizza i risultati in una griglia e clicca su una card per vedere i dettagli completi: trama, generi, durata, budget e incasso.

## Funzionalità

- Ricerca film per titolo
- Ricerca attivabile con click sul bottone o tasto Invio
- Griglia di risultati con poster, titolo, anno e voto
- Modal con dettagli completi del film
- Spinner di caricamento durante le richieste
- Gestione dei film senza poster
- Responsive

## Tecnologie

- HTML5
- CSS3
- JavaScript (fetch, async/await)
- [TMDB API](https://developer.themoviedb.org/)

## Come usarlo

1. Clona la repository
   ```bash
   git clone https://github.com/giga0023/cinesearch.git
   ```

2. Ottieni una API key gratuita su [TMDB](https://www.themoviedb.org/settings/api)

3. In `js/app.js` sostituisci la chiave nella prima riga:
   ```js
   const API_KEY = 'la_tua_api_key';
   ```

4. Apri `html/index.html` nel browser

## Cosa ho imparato

Progetto realizzato per consolidare l'uso di `fetch()` e `async/await` in JavaScript, lavorando con un'API reale e manipolando il DOM dinamicamente.
