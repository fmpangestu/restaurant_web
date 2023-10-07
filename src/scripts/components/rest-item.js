class restItem extends HTMLElement {
    constructor() {
        super();
        this.restDom = this.attachShadow({mode: "open"});
    }

    set rest(rest) {
        this._rest = rest;
        this.render();
    }

    render() {
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
  top: -1px;
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


      <article  class="card" tabindex="0" >
        <p class="city" aria-label="Kota ${this._rest.city},">${this._rest.city}</p>
        <img src="${this._rest.pictureId}" alt="${this._rest.name}">
        <div class="card-content">
                <h3 class="name_resto" aria-label="Nama restoraunt ${this._rest.name},">${this._rest.name}</h3>
            <div class="rating" >
                <p aria-label="rating ${this._rest.rating},">${this.generateStarRating(this._rest.rating)}
                ${this._rest.rating}</p>
            </div>
             <p class="description" aria-label="Description restaurant ${this._rest.description},">${this._rest.description}</p>
        </div>
    </article>
      
`;
    };

    generateStarRating(rating) {
        const maxRating = 5;
        const roundedRating = Math.round(rating * 2) / 2;
        let starHTML = '';

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

customElements.define("rest-item", restItem);