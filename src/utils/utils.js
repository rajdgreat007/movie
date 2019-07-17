const GIPHY_API_ENDPOINT = "https://api.giphy.com/v1/gifs/search";
const API_KEY = "26VJbgRGEw7u4JGqzve3TvzflmNUYbRK";

export const useMockData = false; //setting it to true will load images stored locally, used for dev purpose

export const LIMIT = 20;

export const getUrl = (searchTerm, offset = 0, limit = 20) => {
  return `${GIPHY_API_ENDPOINT}?api_key=${API_KEY}&q=${searchTerm}&offset=${offset}&limit=${limit}`;
};
