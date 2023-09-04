const select = document.querySelector('.breed-select');
select.style.display = 'none';
let catInfo = document.querySelector('.cat-info');

import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed, fetchCatData } from './js/cat-api';

fetchBreeds()
  .then(data => (select.innerHTML = createMarkup(data)))
  .catch(() =>
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    )
  );

function createMarkup(arr) {
  select.style.display = 'block';
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

// new SlimSelect({
//   select: '#selectElement',
//   settings: {
//     showSearch: false,
//   },
//   events: {
//     afterChange: () => {
//       selectHandler();
//     },
//   },
// });

select.addEventListener('change', selectHandler);

function selectHandler(evt) {
  catInfo.innerHTML = ``;

  let breedId = evt.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      catInfo.innerHTML = createMarkupForCat(data);
    })
    .catch(() => Notiflix.Notify.warning('Such a breed cannot be found'));
}

function createMarkupForCat(arr) {
  let cat = arr
    .map(
      ({ url }) => `<img class="cat-img" src="${url}" alt="" width="400">
      <div class="cat-div">
      <h3 class="breed"></h3>
      <p class="descr"></p>
      <p class="temp"></p>
      </div>`
    )
    .join('');

  fetchCatData(arr[0].id)
    .then(data => addDescription(data))
    .catch(err => console.log(err));

  return cat;
}

function addDescription(arr) {
  document.querySelector('.breed').textContent = arr.breeds[0].name;
  document.querySelector('.descr').textContent = arr.breeds[0].description;
  document.querySelector('.temp').textContent = arr.breeds[0].temperament;
}
