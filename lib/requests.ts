import { getOneMonthAgoReleaseDate } from './utils'

const { LANG = 'en', ONEMONTHAGO = getOneMonthAgoReleaseDate(), REGION = 'us' } = process.env

const requests = {
  fetchSearchQuery: `/search/multi?language=${LANG}`,
  fetchTrendingAll: `/trending/all/week?sort_by=popularity.desc&language=${LANG}`,
  fetchReleasedMoviesByOneMonth: `/discover/movie?primary_release_date.gte=${ONEMONTHAGO}&sort_by=popularity.desc&language=${LANG}`,
  // Movies
  fetchTrendingMovies: `/trending/movie/week?sort_by=popularity.desc&language=${LANG}`,
  fetchUpcomingMovies: `/movie/upcoming?language=${LANG}`,
  fetchTopRated: `/movie/top_rated?sort_by=popularity.desc&region=${REGION}`,
  fetchActionMovies: `/discover/movie?with_genres=28&sort_by=popularity.desc&language=${LANG}`,
  fetchAdventureMovies: `/discover/movie?with_genres=12&sort_by=popularity.desc&language=${LANG}`,
  fetchComedyMovies: `/discover/movie?with_genres=35&sort_by=popularity.desc&language=${LANG}`,
  fetchHorrorMovies: `/discover/movie?with_genres=27&sort_by=popularity.desc&language=${LANG}`,
  fetchRomanceMovies: `/discover/movie?with_genres=10749&sort_by=popularity.desc&language=${LANG}`,
  fetchWarMovies: `/discover/movie?with_genres=10752&sort_by=popularity.desc&language=${LANG}`,
  fetchAnimationMovies: `/discover/movie?with_genres=16&sort_by=popularity.desc&language=${LANG}`,
  discoverMovies: `/discover/movie?sort_by=popularity.desc&language=${LANG}`,
  // Series
  discoverSeries: `/discover/tv?sort_by=popularity.desc&language=${LANG}`,
  fetchTrendingSeries: `/trending/tv/week?sort_by=popularity.desc&language=${LANG}`,
  fetchNetflixOriginals: `/discover/tv?with_networks=213&sort_by=popularity.desc&language=${LANG}`,
  fetchActionAdventureSeries: `/discover/tv?with_genres=10759&sort_by=popularity.desc&language=${LANG}`,
  fetchAnimationSeries: `/discover/tv?with_genres=16&sort_by=popularity.desc&language=${LANG}`,
  fetchComedySeries: `/discover/tv?with_genres=35&sort_by=popularity.desc&language=${LANG}`,
  fetchCrimeSeries: `/discover/tv?with_genres=80&sort_by=popularity.desc&language=${LANG}`,
  fetchDocumentarySeries: `/discover/tv?with_genres=99&sort_by=popularity.desc&language=${LANG}`,
  fetchFamilySeries: `/discover/tv?with_genres=10751&sort_by=popularity.desc&language=${LANG}`,
  fetchKidsSeries: `/discover/tv?with_genres=10762&sort_by=popularity.desc&language=${LANG}`,
  fetchSciFiFantasySeries: `/discover/tv?with_genres=10765&sort_by=popularity.desc&language=${LANG}`,
}

export default requests
