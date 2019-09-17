const API_ENDPOINT = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = "3a94078fb34b772a31d9a1348035bed7";
const OTHERS = "language=en-US&include_adult=false&include_video=false&page=1";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_ENDPOINT = "https://api.themoviedb.org/3/search/movie";

export const getUrl = (sortBy, search = false, query) => {
  let url = `${API_ENDPOINT}?api_key=${API_KEY}&sort_by=${sortBy}&${OTHERS}`;
  if (search) {
    url = `${SEARCH_ENDPOINT}?api_key=${API_KEY}&sort_by=${sortBy}&${OTHERS}&query=${query}`;
  }
  return url;
};

export const getImageUrl = posterPath => {
  return `${IMAGE_BASE_URL}${posterPath}`;
};

export const getYear = releaseDate => {
  return releaseDate.split("-")[0];
};
