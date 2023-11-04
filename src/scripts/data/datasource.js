// import data from '../../public/data/DATA.json';
import ENDPOINT from '../globals/endpoint';

class DataSource {
  static async getAllRestaurants() {
    const response = await fetch(ENDPOINT.LIST_REST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async addReview(reviewData) {
    try {
      const response = await fetch(ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const responseData = await response.json();
        // eslint-disable-next-line no-console
        console.log('Ulasan berhasil ditambahkan:', responseData);
      } else {
        // eslint-disable-next-line no-console
        console.error('Gagal menambahkan ulasan:', response.status, response.statusText);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Terjadi kesalahan:', error);
    }
  }
}

export default DataSource;
