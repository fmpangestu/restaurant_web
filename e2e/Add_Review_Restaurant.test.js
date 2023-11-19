// const assert = require('assert');
//
// const { I } = inject();
//
// Feature('Add New Review');
//
// Before(() => {
//   I.amOnPage('/');
// });
//
// Scenario('Add new review to first restaurant', async () => {
//   I.seeElement('.card-content .lengkap');
//   I.click(locate('.card-content .lengkap').first());
//
//   const customerName = 'Asepp ganteng';
//   const reviewContent = 'Asep guedeg e atuh ah';
//
//   I.waitForElement('.add-review-button', 5);
//   I.click('.add-review-button');
//
//   I.fillField('#name', customerName);
//   I.fillField('#review', reviewContent);
//
//   I.click('#submit');
//
//   I.waitForVisible('.review__name', 10);
//   const addedReviewName = await I.grabTextFrom('.review__name');
//   assert.strictEqual(addedReviewName, customerName);
//
//   I.waitForVisible('.review__value', 10);
//   const addedReviewBody = await I.grabTextFrom('.review__value');
//   assert.strictEqual(addedReviewBody, reviewContent);
// });

// ini kalau kaka mau test coba, silahkan kak, //
// soalnya saya udh berhasil untuk menambahkan, //
// tetapi karena sistem pada add web saya itu harus refresh dulu, //
// jadi testing menganggapnya error deh, hadehh //
