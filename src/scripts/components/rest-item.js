import CONFIG from '../globals/config';

class restItem extends HTMLElement {
  constructor() {
    super();
    this.restDom = this.attachShadow({ mode: 'open' });
  }

  set rest(rest) {
    // eslint-disable-next-line no-underscore-dangle
    this._rest = rest;
    this.render();
  }

  render() {
    // eslint-disable-next-line no-underscore-dangle
    const rest = this._rest;
    this.restDom.innerHTML = `
<style>
.card{
position: relative;
width: 100%;
border-radius: 8px;
overflow:hidden;
box-shadow: 0 2px 4px rgba(0,0,0,0.2);
margin: 20px auto;
height: 90%;
background-color:white;
color: #609966;
}
.city {
  position: absolute;
  padding: 12px;
  width: 30%;
  top: -1px;
  background-color: #609966;
  color: white;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  left: -100%;
  opacity: 0;
  pointer-events: none;
  transition: left 0.3s ease, opacity 0.3s ease;
}

.card:hover .city,
.card:focus-within .city {
  left: 0;
  opacity: 1;
  pointer-events: auto;
  top: 1px;
}
.card img{
width: 100%;
}
.card-content{
padding: 16px 32px 32px 32px;
}
.card-content .name_resto{
margin: 0;
padding: 0;
}
.card-content .rating p{
font-size: 15px;
margin-top: 0;
margin-bottom: 2px;
}
.card-content .description{
    margin-top: 5px;
    font-size: 14px;
    line-height: 1.5em;
    text-align: justify;
}
.card-content .descripti{
margin-top: 12px;
}
.star {
    font-size: 18px;
    color: #f5ce42; 
    margin-right: 4px;
}

.filled {
    color: #fbc02d; 
}
.card-content .rating {
display: flex;
justify-content: space-between;
}
/*detail*/
.detail {
position: relative;
  padding: 12px;
  width: 20%;
  top: -50%;
  background-color: #609966;
  color: white;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  text-decoration: none;
  transition: right 0.3s ease, opacity 0.3s ease;
  text-align: center;
}

.card:hover .detail,
.card:focus-within .detail {
  opacity: 1;
  pointer-events: auto;
  
}
@media screen and (min-width: 550px){
    .card img{
    height: 200px;
    }
    .card .description{
    width: 100%;
    }
    
}
@media screen and (max-width: 480px){
    .card {
    width:100%;
    margin: 25px auto; 
    }
    .card .description{
    width: 100%;
    }
    
}

@media screen and (min-width: 900px) {
.card{
width: 100%;
height: 100%;
}
}
</style>


      <article class="card" tabindex="0">
        <p class="city" aria-label="Kota ${rest.city},">${rest.city}</p>
        <img src="${CONFIG.BASE_IMAGE_URL + rest.pictureId}" alt="${rest.name}">
        <div class="card-content">
            <h3 class="name_resto" aria-label="Nama restoraunt ${rest.name},">${rest.name}</h3>
            <div class="rating" >
            <p aria-label="rating ${rest.rating},">${this.generateStarRating(rest.rating)} ${rest.rating}</p>
            <p><a href="/#/detail/${rest.id}" aria-label="detail restaurant ${rest.name}," class="detail">Detail</a></p>
            </div>
            <p class="description" aria-label="Description restaurant ${rest.description},">${rest.description}</p>
        </div>
    </article>
      
`;
  }

  // eslint-disable-next-line class-methods-use-this
  generateStarRating(rating) {
    const maxRating = 5;
    const roundedRating = Math.round(rating * 2) / 2;
    let starHTML = '';

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= maxRating; i++) {
      if (i <= roundedRating) {
        starHTML += '<span class="star filled">★</span>';
      } else {
        starHTML += '<span class="star">☆</span>';
      }
    }

    return starHTML;
  }
}

customElements.define('rest-item', restItem);
export default restItem;
