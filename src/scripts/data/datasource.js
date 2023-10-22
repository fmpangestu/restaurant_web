import data from '../../public/data/DATA.json';
import ENDPOINT from '../globals/endpoint';

class DataSource {
  // static getAllRestaurants() {
  //   return new Promise((resolve, reject) => {
  //     const { restaurants } = data;
  //
  //     if (restaurants && restaurants.length > 0) {
  //       resolve(restaurants);
  //     } else {
  //       // eslint-disable-next-line prefer-promise-reject-errors
  //       reject('No restaurants found');
  //     }
  //   });
  // }

  static async getAllRestaurants() {
    const response = await fetch(ENDPOINT.LIST_REST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default DataSource;
