import './css/styles.css';
import { fetchPicturs } from './fetchPicturs.js';
import Notiflix from 'notiflix';
import { renderGallery } from './renderGallery.js';

const form = document.querySelector('#search-form');
const pictureInput = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

loadMoreBtn.style.display = 'none';
// loadMoreBtn.style.display = 'flex';
gallery.innerHTML = '';
let name = '';
let perPage = 40;
let page = 0;
//

form.addEventListener('submit', onPictureInput);

async function onPictureInput(evt) {
  evt.preventDefault();
  console.log('clik');
  name = pictureInput.value.trim();
  if (name === '') {
    return alertEmptyName();
  }
  console.log(name);
  page = 1;
  gallery.innerHTML = '';
}

fetchPicturs(name, page, perPage).then(images => {
  if (images.totalHits === 0) {
    alertNotFoundImages();
  } else {
    gallery.insertAdjacentHTML('beforeend', renderGallery(images.hits));
    alertImagesFound(images);
  }
});

function alertEmptyName() {
  Notiflix.Notify.failure(
    'The object name is not valid. The name cannot be empty.'
  );
}
function alertNotFoundImages() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
function alertImagesFound(images) {
  Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
}
