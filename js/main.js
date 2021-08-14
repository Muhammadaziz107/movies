const elMoviesList = document.querySelector(".list");
const elMovieTemplate = document.querySelector("#movie__template").content;
const elMoviesInput = document.querySelector(".movies__input");
const elMoviesSelect = document.querySelector(".select");

const API_KEY = "ccf8314a";

let page = 1;
let searchQuery = "hulk";
let selectValue = "";

const elPrevBtn = document.querySelector(".prev-btn");
const elNextBtn = document.querySelector(".next-btn");

function renderMovies(arr, element) {
  element.innerHTML = null;

  const movieFragment = document.createDocumentFragment();

  arr.forEach(row => {
    const movieTemplate = elMovieTemplate.cloneNode(true);

    movieTemplate.querySelector(".movie__img").src = row.Poster;
    movieTemplate.querySelector(".movie__img").alt = row.Title + " cover";

    movieTemplate.querySelector(".movie__img").onerror = evt => {
      evt.target.src = "https://via.placeholder.com/100x150";
    };
    movieTemplate.querySelector(".movie__title").textContent = row.Title;
    movieTemplate.querySelector(".movie__type").textContent = "Type: " + row.Type;
    movieTemplate.querySelector(".movie__year").textContent = "Year: " + row.Year;
    movieTemplate.querySelector(".movie__imdbid").textContent = "imdbID: " + row.imdbID;

    movieFragment.appendChild(movieTemplate);
  });

  element.appendChild(movieFragment);
}

async function fetchMovies() {
  try {
    elMoviesList.innerHTML = "<img src='./images/loader.svg' alt='Spinner' />";

    const response = await fetch(
      "http://www.omdbapi.com/?apikey=" +
        API_KEY +
        "&s=" +
        searchQuery +
        "&type=" +
        selectValue +
        "&page=" +
        page
    );

    const data = await response.json();

    if (data.Search?.length) {
      renderMovies(data.Search, elMoviesList);
    }

    if (page <= 1) {
      elPrevBtn.disabled = true;
    } else {
      elPrevBtn.disabled = false;
    }

    const lastPage = Math.ceil(data.totalResults / 10);

    if (page === lastPage) {
      elNextBtn.disabled = true;
    } else {
      elNextBtn.disabled = false;
    }
  } catch (err) {
    console.error("error", err);
  }
}

elPrevBtn.addEventListener("click", evt => {
  page--;
  fetchMovies();
});

elNextBtn.addEventListener("click", evt => {
  page++;
  fetchMovies();
});

elMoviesInput.addEventListener("change", evt => {
  searchQuery = evt.target.value.trim();

  fetchMovies();
});

fetchMovies();

fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then(response => {
    console.log(response);

    return response.json();
  })
  .then(data => console.log(data));

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "GET",
})
  .then(response => {
    console.log(response);

    return response.json();
  })
  .then(data => console.log(data));

elMoviesSelect.addEventListener("change", evt => {
  selectValue = evt.target.value;

  fetchMovies();
});
