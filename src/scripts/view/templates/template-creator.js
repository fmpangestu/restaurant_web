import CONFIG from '../../globals/config';

const createRestDetailTemplate = (rest) => `
  <h2 class="movie__title">${rest.title}</h2>
  <img class="movie__poster" src="${CONFIG.BASE_IMAGE_URL + rest.pictureId}" alt="${rest.title}" />
  <div class="movie__info">
    <h3>Information</h3>
    <h4>Tagline</h4>
    <p>${rest.tagline}</p>
    <h4>Release Date</h4>
    <p>${rest.release_date}</p>
    <h4>Duration</h4>
    <p>${rest.runtime} minutes</p>
    <h4>Rating</h4>
    <p>${rest.vote_average}</p>
  </div>
  <div class="movie__overview">
    <h3>Overview</h3>
    <p>${rest.overview}</p>
  </div>
`;
export {
  createRestDetailTemplate,
};
