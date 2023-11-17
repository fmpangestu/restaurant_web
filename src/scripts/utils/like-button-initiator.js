import FavoriteRestaurantIdb from '../data/favorite-rest-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../view/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    // eslint-disable-next-line no-underscore-dangle
    this._likeButtonContainer = likeButtonContainer;
    // eslint-disable-next-line no-underscore-dangle
    this._restaurant = restaurant;
    // eslint-disable-next-line no-underscore-dangle
    this._favoriteRestaurant = FavoriteRestaurantIdb;

    // eslint-disable-next-line no-underscore-dangle
    await this._renderButton();
  },

  // eslint-disable-next-line no-underscore-dangle
  async _renderButton() {
    // eslint-disable-next-line no-underscore-dangle
    const { id } = this._restaurant;

    // eslint-disable-next-line no-underscore-dangle
    if (await this._isRestaurantExist(id)) {
      // eslint-disable-next-line no-underscore-dangle
      this._renderLiked();
    } else {
      // eslint-disable-next-line no-underscore-dangle
      this._renderLike();
    }
  },

  // eslint-disable-next-line no-underscore-dangle
  async _isRestaurantExist(id) {
    // eslint-disable-next-line no-underscore-dangle
    const rest = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!rest;
  },
  // eslint-disable-next-line no-underscore-dangle
  _renderLike() {
    // eslint-disable-next-line no-underscore-dangle
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      // eslint-disable-next-line no-underscore-dangle
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      // eslint-disable-next-line no-underscore-dangle
      this._renderButton();
    });
  },

  // eslint-disable-next-line no-underscore-dangle
  _renderLiked() {
    // eslint-disable-next-line no-underscore-dangle
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      // eslint-disable-next-line no-underscore-dangle
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      // eslint-disable-next-line no-underscore-dangle
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
