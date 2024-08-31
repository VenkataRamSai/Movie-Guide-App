const buttonElement = document.querySelector(".btn");
const movieContainer = document.querySelector(".movie-cont");
const moviePoster = document.querySelector(".movie-poster");
const movieDetails = document.querySelector(".movie-details");
const inputBox = document.querySelector(".input-box");
const disp = document.querySelector(".front");
const errorMessage = document.querySelector(".error-message"); // Select the error message container

const showMovieDetails = (data) => {
    if (data.Response === "False") {
        // If no movie is found
        disp.style.display = "block";
        disp.textContent = "No movie found!";
        moviePoster.innerHTML = '';
        movieDetails.innerHTML = '';
        movieContainer.classList.add("noBackground");
        return;
    }
    disp.style.display = "none";
    movieContainer.classList.remove("noBackground");

    // Clear previous content
    moviePoster.innerHTML = '';
    movieDetails.innerHTML = '';

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const pic = document.createElement('img');
    pic.src = Poster;
    pic.classList.add('imag');
    moviePoster.appendChild(pic);

    const movieElement = document.createElement('div');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating : &#11088;</strong> ${imdbRating}</p>`;
    movieElement.classList.add('movie-info');

    const genreElement = document.createElement('div');
    genreElement.classList.add('movie-genre');
    Genre.split(",").forEach(item => {
        const p = document.createElement('p');
        p.innerText = item;
        genreElement.appendChild(p);
    });

    const details = document.createElement('div');
    details.innerHTML = `<p><strong>Released Date : </strong>${Released}</p>
                         <p><strong>Duration : </strong>${Runtime}</p>
                         <p><strong>Cast : </strong>${Actors}</p>
                         <p><strong>Plot : </strong>${Plot}</p>`;
    details.classList.add('detail');

    movieDetails.appendChild(movieElement);
    movieDetails.appendChild(genreElement);
    movieDetails.appendChild(details);
};

async function getMovieDetails(movieName) {
    try {
        const apiKey = "418741e4";
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        showMovieDetails(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

buttonElement.addEventListener('click', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();

    // Clear previous error message
    errorMessage.textContent = '';

    if (movieName === "") {
        errorMessage.textContent = "Please enter a movie name to get info.";
        movieContainer.classList.add("noBackground");
        return;
    }

    getMovieDetails(movieName);
});
