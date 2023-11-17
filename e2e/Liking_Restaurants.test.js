const assert = require('assert');

// eslint-disable-next-line no-undef
Feature('Liking Restaurants');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/#/like');
});

// eslint-disable-next-line no-undef
Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.restaurants');
  I.dontSee('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

// eslint-disable-next-line no-undef
Scenario('liking one restaurant', async ({ I }) => {
  I.dontSee('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  // eslint-disable-next-line no-undef
  const firstDetailLink = locate('.lengkap a').first();
  const firstRestaurantName = await I.grabTextFrom('.lengkap a');
  I.click(firstDetailLink);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.wait(2);
  I.amOnPage('/#/like');
  I.seeElement('.card');
  const likedRestaurantName = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});
// eslint-disable-next-line no-undef
Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/#/like');
  const isRestaurantLiked = await I.grabNumberOfVisibleElements('.card') > 0;

  if (isRestaurantLiked) {
    // eslint-disable-next-line no-undef
    const firstLikedRestaurant = locate('.card').first();
    const firstLikedRestaurantTitle = await I.grabTextFrom(firstLikedRestaurant);

    I.click('.card');
    I.dontSeeElement('.card');
    I.amOnPage('/#/like');
    I.dontSee(firstLikedRestaurantTitle, '.restaurant__title');
  } else {
    // eslint-disable-next-line no-console
    console.log('No liked restaurants to unlike.');
  }
});
// eslint-disable-next-line no-undef
Scenario('searching restaurants', async ({ I }) => {
  I.dontSee('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.lengkap a');

  const names = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 3; i++) {
    // eslint-disable-next-line no-undef
    I.click(locate('.lengkap a').at(i));

    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.wait(2);
    // eslint-disable-next-line no-await-in-loop
    names.push(await I.grabTextFrom('.restaurant__title'));

    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.card');
  assert.strictEqual(names.length, visibleLikedRestaurants);

  const searchQuery = names[1].substring(1, 3);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements('.card');

  assert.strictEqual(matchingRestaurants.length, visibleSearchedLikedRestaurants);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < matchingRestaurants.length; i++) {
    // eslint-disable-next-line no-await-in-loop,no-undef
    const visibleName = await I.grabTextFrom(locate('.restaurant__title').at(i + 1));

    assert.strictEqual(matchingRestaurants[i], visibleName);
  }
});
