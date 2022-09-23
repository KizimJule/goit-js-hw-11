export function renderGallery(images = []) {
  const markup = images
    .map(image => {
      return `
          <div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${image.downloads}</b>
    </p>
  </div>
</div>
          `;
    })
    .join('');
  return markup;
}
