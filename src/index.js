import './css/styles.css';
import { fetchPicturs } from './fetchPicturs.js';
import Notiflix from 'notiflix';
import { renderGallery } from './renderGallery.js';

const form = document.querySelector('#search-form');
const pictureSearchInput = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

loadMoreBtn.style.display = 'none';
gallery.innerHTML = '';
let name = '';
let perPage = 200;
let page = 0;
//

form.addEventListener('submit', onPictureInput);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onPictureInput(evt) {
  evt.preventDefault();
  page = 1;
  name = evt.currentTarget.elements.searchQuery.value.trim();
  if (name === '') {
    return alertEmptyName();
  }
  gallery.innerHTML = '';

  fetchPicturs(name, page, perPage).then(images => {
    console.log(images);
    if (images.totalHits === 0) {
      alertNotFoundImages();
    } else {
      gallery.insertAdjacentHTML('beforeend', renderGallery(images.hits));
      alertImagesFound(images);
      loadMoreBtn.style.display = 'flex';
    }
  });
}

function onLoadMoreBtnClick() {
  page += 1;
  fetchPicturs(name, page, perPage).then(images => {
    gallery.insertAdjacentHTML('beforeend', renderGallery(images.hits));
    // alertImagesFound(images);
    const totalPages = Math.ceil(images.totalHits / perPage);
    if (page > totalPages) {
      loadMoreBtn.style.display = 'none';
      return alertEndOfSearch();
    }
  });
}
function alertEmptyName() {
  Notiflix.Notify.failure(
    `The object name is not valid. The name cannot be empty.`
  );
}
function alertNotFoundImages() {
  Notiflix.Notify.failure(
    `Sorry, there are no images matching your search query. Please try again.`
  );
}
function alertImagesFound(images) {
  Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
}
function alertEndOfSearch() {
  Notiflix.Notify.success(
    `We're sorry, but you've reached the end of search results.`
  );
}
