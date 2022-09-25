import './css/styles.css';
import { fetchPicturs } from './fetchPicturs.js';
import Notiflix from 'notiflix';
import { renderGallery } from './renderGallery.js';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const endSearch = document.querySelector('.end-search');

loadMoreBtn.classList.add('is-hidden');
endSearch.classList.add('is-hidden');

gallery.innerHTML = '';
let name = '';
let perPage = 40;
let page = 0;
let totalPages = 0;

form.addEventListener('submit', onPictureInput);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onPictureInput(evt) {
  // loadMoreBtn.classList.remove('is-hidden');
  endSearch.classList.add('is-hidden');
  loadMoreBtn.classList.add('is-hidden');
  evt.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  name = evt.currentTarget.elements.searchQuery.value.trim();
  gallery.innerHTML = '';

  if (name === '') {
    return alertEmptyName();
  }

  fetchPicturs(name, page, perPage)
    .then(data => {
      loadMoreBtn.classList.add('is-hidden');
      endSearch.classList.add('is-hidden');
      gallery.innerHTML = '';

      if (data.totalHits === 0) {
        alertNotFoundImages();
      } else {
        gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));

        alertImagesFound(data);
        simpleLightBox = new SimpleLightbox('.gallery a', {
          captions: true,
          captionsData: 'alt',
          captionDelay: 250,
        }).refresh();

        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

function onLoadMoreBtnClick() {
  page += 1;
  simpleLightBox.destroy();

  fetchPicturs(name, page, perPage).then(data => {
    gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
    simpleLightBox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    }).refresh();
    totalPages = Math.ceil(data.totalHits / perPage);
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    if (page >= totalPages) {
      endSearch.classList.remove('is-hidden');
      loadMoreBtn.classList.add('is-hidden');
      // alertEndOfSearch();
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
function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}
function alertEndOfSearch() {
  Notiflix.Notify.failure(
    `We're sorry, but you've reached the end of search results.`
  );
}
