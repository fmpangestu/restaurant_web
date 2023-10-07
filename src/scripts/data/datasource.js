import data from '../../public/data/DATA.json';

class DataSource {
    static getAllRestaurants() {
        return new Promise((resolve, reject) => {
            const restaurants = data.restaurants;

            if (restaurants && restaurants.length > 0) {
                resolve(restaurants);
            } else {
                reject('No restaurants found');
            }
        });
    }
}

export default DataSource;
