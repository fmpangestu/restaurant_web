import FavoriteRestaurantIdb from '../../data/favorite-rest-idb';
import { createRestItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
<div class="content">
        <div class="headline_content">
          <h1 class="headline_title">Explore Restaurant</h1>
          <p class="headline_sub">Restaurant Favorite</p>
        </div>
    <div id="restaurants">
    </div>
</div>
      `;
  },
  async afterRender() {
    const restaurant = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#restaurants');

    restaurant.forEach((rest) => {
      restaurantContainer.innerHTML += createRestItemTemplate(rest);
    });
  },
};

export default Like;
