# MovieHub

## Table of Contents
- [Introduction](#introduction)
- [Cloning the Repository](#cloning-the-repository)
- [Running the Project Locally](#running-the-project-locally)
- [Features](#features)
- [Optimizations](#optimizations)
- [API Usage](#api-usage)

## Introduction
MovieHub is a web application that allows users to search for thousands of movies and view their details. The application is built using React and Tailwind CSS, and it leverages the TMDB (The Movie Database) API to fetch movie data.

## Cloning the Repository
To clone the repository, run the following command:
```bash
git clone https://github.com/your-username/moviehub.git
```

## Running the Project Locally
1. Navigate to the project directory:
    ```bash
    cd moviehub
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

## Features
- **Search Movies**: Users can search for movies using the search bar.
- **Movie Cards**: Display movie details such as title, rating, release date, and language.
- **Loading Spinner**: A spinner is displayed while fetching data from the API.

## Optimizations
- **Debounced Search**: The search feature is optimized using debouncing to reduce the number of API calls. The `useDebounce` hook from `react-use` is used to delay the search query execution by 500 milliseconds.

## API Usage
The application uses the TMDB (The Movie Database) API to fetch movie data. The API key is stored in an environment variable and used to authenticate requests.

### Fetching Movies
The `fetchMovies` function in `App.jsx` is responsible for fetching movies from the TMDB API. It constructs the API endpoint based on the search query and makes a GET request to fetch the movie data.

### Example API Request
```javascript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const fetchMovies = async (query = "") => {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, API_OPTIONS);
  const data = await response.json();
  return data.results;
};
```

## Components
- **App.jsx**: The main component that manages the state and renders other components.
- **Search.jsx**: A search bar component that allows users to input their search queries.
- **Spinner.jsx**: A spinner component that is displayed while data is being fetched.
- **Card.jsx**: A card component that displays movie details.

## Styling
The application uses Tailwind CSS for styling. Custom styles are defined in `index.css`.

## Conclusion
MovieHub is a simple yet powerful application for searching and viewing movie details. The use of debouncing and the TMDB API ensures a smooth and efficient user experience.