import requests from './requests'

const {
  fetchReleasedMoviesByOneMonth,
  fetchTrendingMovies,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchActionMovies,
  fetchAdventureMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchAnimationMovies,
  fetchUpcomingMovies,
  fetchActionAdventureSeries,
  fetchAnimationSeries,
  fetchComedySeries,
  fetchCrimeSeries,
  fetchDocumentarySeries,
  fetchFamilySeries,
  fetchKidsSeries,
  fetchSciFiFantasySeries,
  fetchTrendingSeries,
} = requests

export const fetchMovieDataConfig = [
  {
    id: 0,
    url: fetchTrendingMovies,
    title: 'Trending Now',
    genre: 'trending',
  },
  {
    id: 1,
    url: fetchTopRated,
    title: 'Top Rated on FastFlix',
    genre: 'toprated',
  },
  {
    id: 2,
    url: fetchNetflixOriginals,
    title: 'FastFlix Originals',
    genre: 'FastFlix',
    isLarge: true,
  },
  {
    id: 3,
    url: fetchActionMovies,
    title: 'Action',
    genre: 'action',
  },
  {
    id: 4,
    url: fetchAdventureMovies,
    title: 'Adventure',
    genre: 'adventure',
  },
  {
    id: 5,
    url: fetchComedyMovies,
    title: 'Comedy',
    genre: 'comedy',
  },
  {
    id: 6,
    url: fetchHorrorMovies,
    title: 'Horror',
    genre: 'horror',
  },
  {
    id: 7,
    url: fetchRomanceMovies,
    title: 'Romance',
    genre: 'romance',
  },
  {
    id: 8,
    url: fetchAnimationMovies,
    title: 'Animation',
    genre: 'animation',
  },
  {
    id: 9,
    url: fetchUpcomingMovies,
    title: 'Upcoming',
    genre: 'upcoming',
  },
]

export const fetchSeriesDataConfig = [
  {
    id: 0,
    url: fetchTrendingSeries,
    title: 'Trending Now',
    genre: 'trending',
  },
  {
    id: 1,
    url: fetchNetflixOriginals,
    title: 'FastFlix Originals',
    genre: 'FastFlix',
    isLarge: true,
  },
  {
    id: 2,
    url: fetchActionAdventureSeries,
    title: 'Action & Adventure',
    genre: 'actionadventure',
  },
  {
    id: 3,
    url: fetchAnimationSeries,
    title: 'Animation',
    genre: 'animation',
  },
  {
    id: 4,
    url: fetchComedySeries,
    title: 'Comedy',
    genre: 'comedy',
  },
  {
    id: 5,
    url: fetchCrimeSeries,
    title: 'Crime',
    genre: 'crime',
  },
  {
    id: 6,
    url: fetchDocumentarySeries,
    title: 'Documentary',
    genre: 'documentary',
  },
  {
    id: 7,
    url: fetchFamilySeries,
    title: 'Family',
    genre: 'family',
  },
  {
    id: 8,
    url: fetchKidsSeries,
    title: 'Kids',
    genre: 'kids',
  },
  {
    id: 9,
    url: fetchSciFiFantasySeries,
    title: 'Sci-Fi & Fantasy',
    genre: 'scififantasy',
  },
]

export const fetchPopularDataConfig = [
  {
    id: 0,
    url: fetchTopRated,
    title: 'Top Rated in your country',
    genre: 'toprated',
  },
  {
    id: 1,
    url: fetchReleasedMoviesByOneMonth,
    title: 'New on FastFlix',
    genre: 'newin',
  },
  {
    id: 2,
    url: fetchUpcomingMovies,
    title: 'Upcoming',
    genre: 'upcoming',
  },
]

export const genresList = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
  {
    id: 10759,
    name: 'Action & Adventure',
  },
  {
    id: 10762,
    name: 'Kids',
  },
  {
    id: 10763,
    name: 'News',
  },
  {
    id: 10764,
    name: 'Reality',
  },
  {
    id: 10765,
    name: 'Sci-Fi & Fantasy',
  },
  {
    id: 10766,
    name: 'Soap',
  },
  {
    id: 10767,
    name: 'Talk',
  },
  {
    id: 10768,
    name: 'War & Politics',
  },
]
