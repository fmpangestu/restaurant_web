// Import yang diperlukan
import UrlParser from '../../routes/url-parser';
import DataSource from '../../data/datasource';
import { createRestDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-rest-idb';

const Detail = {
  async render() {
    return `
        <div id="rest" class="restaurant" tabindex="0"></div>
        <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const rest = await DataSource.detailRestaurant(url.id);
    const detail = rest.restaurant;
    const restaurantContainer = document.querySelector('#rest');

    restaurantContainer.innerHTML = createRestDetailTemplate(rest);

    document.getElementById('add-review-button').addEventListener('click', () => {
      const reviewModal = document.getElementById('review-modal');
      reviewModal.style.display = 'block';
    });

    const nameInput = document.getElementById('name');
    const reviewInput = document.getElementById('review');
    const submitButton = document.querySelector('#submit');
    const cancelButton = document.querySelector('#cancel-button');
    const reviewModal = document.querySelector('.review-modal');

    function closeModal() {
      reviewModal.style.display = 'none';
      nameInput.value = '';
      reviewInput.value = '';
    }

    cancelButton.addEventListener('click', () => {
      closeModal();
    });
    submitButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const name = nameInput.value;
      const review = reviewInput.value;

      if (name.trim() === '' || review.trim() === '') {
        // eslint-disable-next-line no-undef
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Nama dan review belum anda masukan',
        });
      } else {
        try {
          const response = await DataSource.addReview({
            id: detail.id,
            name,
            review,
          });
          closeModal();
          // eslint-disable-next-line no-undef
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Data anda successfully',
            response,
          });
        } catch (error) {
          // eslint-disable-next-line no-undef
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add review',
          });
        }
      }
    });

    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant: {
        id: detail.id,
        name: detail.name,
        description: detail.description,
        pictureId: detail.pictureId,
        city: detail.city,
        rating: detail.rating,
      },
    });
  },
};

export default Detail;
