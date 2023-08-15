const $buildMyBag = document.querySelector('.home-page-button');
const $homePage = document.querySelector('.home-page');
const $searchPage = document.querySelector('.search-page');

$buildMyBag.addEventListener('click', searchPageView);

function searchPageView(event) {
  $homePage.classList.remove('shown');
  $homePage.classList.add('hidden');
  $searchPage.classList.remove('hidden');
  $searchPage.classList.add('shown');
}
