import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_aGX7WzmcnZnyi609EMP0icKIvgk9WDdzKrnACI7y4Uf5Uk0UzoMGVkfJTih7oJYX';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/breeds';
  const API_KEY = axios.defaults.headers.common['x-api-key'];

  return fetch(`${BASE_URL}${END_POINT}?${API_KEY}`)
  .then(response => {
    if (!response.ok) {      
      throw new Error(response.status);
    }
    loader.style.display = 'none';
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/images/search';
  const API_KEY = axios.defaults.headers.common['x-api-key'];

  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  loader.style.display = 'block';
  return fetch(`${BASE_URL}${END_POINT}?${API_KEY}&${params}`)
  .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      loader.style.display = 'none';
      return response.json();
    }
  );
}

export function fetchCatData(id) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/images/';
  const API_KEY = axios.defaults.headers.common['x-api-key'];

  const catId = id;

  return fetch(`${BASE_URL}${END_POINT}${catId}?${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
