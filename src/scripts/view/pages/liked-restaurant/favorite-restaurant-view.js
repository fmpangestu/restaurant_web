import { createRestItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
      <div class="content">
          <div class="headline_content">
            <h1 class="headline_title">Explore Restaurant</h1>
            <p class="headline_sub">Restaurant Favorite</p>
          </div>
        <input id="query" type="text" placeholder="Cari di sini juga bisa kok">
        <div id="restaurants" class="restaurants">
        </div>
     </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestItemTemplate(restaurant)), '');
    } else {
      // eslint-disable-next-line no-underscore-dangle
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  // eslint-disable-next-line class-methods-use-this,no-underscore-dangle
  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada Restaurant yang anda cari ya
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
