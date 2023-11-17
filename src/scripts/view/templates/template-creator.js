import CONFIG from '../../globals/config';

function limitReviewText(text) {
  const maxCharacters = 100;
  if (text.length > maxCharacters) {
    const truncatedText = text.slice(0, maxCharacters);
    const remainingText = text.slice(maxCharacters);
    return `
      <div class="truncated-review">${truncatedText}</div>
      <div class="remaining-review hidden">${remainingText}</div>
    `;
  }
  return text;
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('read-more-link')) {
    event.preventDefault();
    const parentReview = event.target.parentElement;
    const truncatedReview = parentReview.querySelector('.truncated-review');
    const remainingReview = parentReview.querySelector('.remaining-review');
    truncatedReview.innerHTML += remainingReview.textContent;
    remainingReview.style.display = 'none';
    // eslint-disable-next-line no-param-reassign
    event.target.style.display = 'none';
  }
});
const createRestDetailTemplate = (rest) => `
  <h2 class="restaurant__title">${rest.restaurant.name}</h2>
  <picture>
  <source media="max-width: 600px" srcset="${CONFIG.BASE_IMAGE_URL + rest.restaurant.pictureId}">
  <img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL + rest.restaurant.pictureId}" alt="${rest.restaurant.name}" />
  </picture>
  <div class="restaurant__info" aria-label="information restaurant">
    <h2 aria-label="information">Information</h2>
    <h4 aria-label="Address">Address</h4>
    <p aria-label="${rest.restaurant.address},kota ${rest.restaurant.city}">${rest.restaurant.address}, ${rest.restaurant.city}</p> 
    <h4 aria-label="menu kita">Menu</h4>
    <div class="menu-categories">
      <div class="food-categories">
        <p>Food Categories:</p>
        <ul>
          ${rest.restaurant.menus.foods.map((food) => `<li aria-label="${food.name}">${food.name}</li>`).join('')}
        </ul>
      </div>
      <div class="drink-categories">
        <p>Drink Categories:</p>
        <ul>
          ${rest.restaurant.menus.drinks.map((drink) => `<li aria-label="${drink.name}">${drink.name}</li>`).join('')}
        </ul>
        </div>
  </div>
  <div class="restaurant__overview">
    <h3>Description</h3>
    <p aria-label="${rest.restaurant.description}">${rest.restaurant.description}</p>
  </div>
  <div class="customer__riview">
<h3 aria-label="riview customer,">Customer Reviews</h3>
${rest.restaurant.customerReviews.map((review) => `
<p aria-label="${review.name}"><span>${review.name}</span</p>
<p class="date__review" aria-label="${review.date}">${review.date}</p>
<p class="review__value" aria-label="${review.review}">Riview: <span>${limitReviewText(review.review)}</span></p>
<hr>
`).join('')}
</div>
  <button id="add-review-button" class="add-review-button">Add Review</button>
  <div id="review-modal" class="review-modal">
    <form id="review-form" class="review-form">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <label for="review">Review:</label>
      <textarea id="review" name="review" rows="4" required></textarea>
      <button id="submit" type="submit">Submit</button>
      <button id="cancel-button" class="cancel-button">Cancel</button>
    </form>
  </div>
`;
function generateStarRating(rating) {
  const maxRating = 5;
  const roundedRating = Math.round(rating * 2) / 2;
  let starHTML = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= maxRating; i++) {
    if (i <= roundedRating) {
      starHTML += '<span class="star filled">★</span>';
    } else {
      starHTML += '<span class="star">☆</span>';
    }
  }

  return starHTML;
}
const createRestItemTemplate = (rest) => `
      <article class="card" tabindex="0">
        <p class="city" aria-label="Kota ${rest.city},">${rest.city}</p>
        <picture>
        <source media="(max-width:600px)" srcset="${CONFIG.BASE_IMAGE_URL + rest.pictureId}">
        <img data-src="${CONFIG.BASE_IMAGE_URL + rest.pictureId}" alt="${rest.name || '-'}" class="lazyload">
        </picture>
        <div class="card-content">
            <h3 class="restaurant__title" aria-label="Nama restoraunt ${rest.name},">${rest.name || '-'}</h3>
            <div class="rating" >
            <p aria-label="rating ${rest.rating},">${generateStarRating(rest.rating)} ${rest.rating || '-'}</p>
            <p class="lengkap"><a href="/#/detail/${rest.id}" aria-label="detail restaurant ${rest.name}," class="detail">Detail</a></p>
            </div>
            <p class="description" aria-label="Description restaurant ${rest.description},">${rest.description || '-'}</p>
        </div>
    </article>
`;

const createLikeButtonTemplate = () => `
<button aria-label="like this restaurant" id="likeButton" 
class="like">
<i class="fa fa-heart-o" aria-hidden="true"></i>
</button>`;

const createLikedButtonTemplate = () => `
<button aria-label="unlike this restaurant"
id="likeButton" class="like">
<i class="fa fa-heart" aria-hidden="true"></i>
</button>`;
export {
  createRestDetailTemplate,
  createRestItemTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
