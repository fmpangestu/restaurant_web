import UrlParser from '../../routes/url-parser';
import Datasource from '../../data/datasource';
import { createRestDetailTemplate } from '../templates/template-creator';
// import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
        <div id="rest" class="rest"></div>
<!--        <div id="likeButtonContainer"></div>-->
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const rest = await Datasource.detailRestaurant(url.id);
    const movieContainer = document.querySelector('#rest');

    movieContainer.innerHTML = createRestDetailTemplate(rest);

    // LikeButtonInitiator.init({
    //     likeButtonContainer: document.querySelector('#likeButtonContainer'),
    //     movie: {
    //         id: movie.id,
    //         title: movie.title,
    //         overview: movie.overview,
    //         backdrop_path: movie.backdrop_path,
    //         vote_average: movie.vote_average,
    //     },
    // });
  },
};

export default Detail;
