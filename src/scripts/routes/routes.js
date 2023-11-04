import ListRestaurant from '../view/pages/list-restaurant';
import Detail from '../view/pages/detail';
import Like from '../view/pages/like';

const routes = {
  '/': ListRestaurant,
  '/list-restaurant': ListRestaurant,
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
