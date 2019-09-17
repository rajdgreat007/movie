const API_ENDPOINT = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = "3a94078fb34b772a31d9a1348035bed7";
const OTHERS = "language=en-US&include_adult=false&include_video=false&page=1";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

export const useMockData = false; // setting it to true will load images stored locally, used for dev purpose

export const LIMIT = 20;

export const getUrl = (sortBy) => {
  return `${API_ENDPOINT}?api_key=${API_KEY}&sort_by=${sortBy}&${OTHERS}`;
};

export const getImageUrl = (posterPath) => {
  return `${IMAGE_BASE_URL}${posterPath}`;
}
