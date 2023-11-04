import DataSource from '../../data/datasource';
import { createRestItemTemplate } from '../templates/template-creator';

const ListRestaurant = {
  render() {
    return `
      <div class="content">
        <div class="headline_content">
          <h1 class="headline_title">Explore Restaurant</h1>
          <p class="headline_sub">List Restaurant</p>
        </div>
        <div id="restaurantList"></div>
      </div>
    `;
  },

  // async afterRender() {
  //   try {
  //     const restaurants = await DataSource.getAllRestaurants();
  //     createRestaurantListTemplate(restaurants);
  //   } catch (error) {
  //     console.error('Error', error);
  //   }
  // },
  async afterRender() {
    const rest = await DataSource.getAllRestaurants();
    const restContainer = document.querySelector('#restaurantList');
    rest.forEach((restaurant) => {
      restContainer.innerHTML += createRestItemTemplate(restaurant);
    });
  },
};

export default ListRestaurant;
