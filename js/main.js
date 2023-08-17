// Search-page and home-page view swap

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

const $navbarButtons = document.querySelectorAll('i');
const $homeButton = $navbarButtons[0];
const $searchButton = $navbarButtons[1];
// const $favoritesButton = $navbarButtons[2];
// const $bagButton = $navbarButtons[3];

$homeButton.addEventListener('click', homePageView);
$searchButton.addEventListener('click', searchPageView);

function homePageView(event) {
  $homePage.classList.remove('hidden');
  $homePage.classList.add('shown');
  $searchPage.classList.remove('shown');
  $searchPage.classList.add('hidden');
}

// Obtain API data

const xmlHR = new XMLHttpRequest();
xmlHR.open('GET', 'https://discit-api.fly.dev/disc');
xmlHR.responseType = 'json';
xmlHR.addEventListener('load', handleLoadEvent);

function handleLoadEvent() {
  const sortedResponse = xmlHR.response.sort(function (a, b) {
    a = a.brand.toLowerCase();
    b = b.brand.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  });

  for (let i = 0; i < sortedResponse.length; i++) {
    if (i === 0) {
      renderDisc1(sortedResponse[i]);
    } else if (sortedResponse[i].brand !== sortedResponse[i - 1].brand) {
      renderDisc2(sortedResponse[i]);
    } else {
      renderDisc3(sortedResponse[i]);
    }
  }
}
xmlHR.send();

const $discs = document.querySelector('.discs');

function renderDisc1(disc) {
  if (disc.brand_slug === 'løft-discs') {
    disc.brand_slug = 'loft-discs';
  }
  const $brandDiv = document.createElement('div');
  const $brandHeader = document.createElement('h3');
  const $discDiv = document.createElement('div');
  const $rowDiv = document.createElement('div');
  const $discName = document.createElement('p');
  const $discNumbers = document.createElement('p');
  $brandHeader.textContent = disc.brand;
  $discName.textContent = disc.name;
  $discNumbers.textContent = `${disc.speed}|${disc.glide}|${disc.turn}|${disc.fade}|`;
  $brandDiv.setAttribute('class', 'brand-row');
  $discDiv.setAttribute('class', `disc ${disc.brand_slug}`);
  $rowDiv.setAttribute('class', 'disc-row');
  $discName.setAttribute('class', 'disc-name');
  $discNumbers.setAttribute('class', 'flight-numbers');
  $discs.append($brandDiv);
  $brandDiv.append($brandHeader);
  $discs.append($rowDiv);
  $rowDiv.append($discDiv);
  $discDiv.append($discName);
  $discDiv.append($discNumbers);
}

function renderDisc2(disc) {
  if (disc.brand_slug === 'løft-discs') {
    disc.brand_slug = 'loft-discs';
  }
  const $brandDiv = document.createElement('div');
  const $brandHeader = document.createElement('h3');
  const $discDiv = document.createElement('div');
  const $rowDiv = document.createElement('div');
  const $discName = document.createElement('p');
  const $discNumbers = document.createElement('p');
  $brandHeader.textContent = disc.brand;
  $discName.textContent = disc.name;
  $discNumbers.textContent = `${disc.speed}|${disc.glide}|${disc.turn}|${disc.fade}|`;
  $brandDiv.setAttribute('class', 'brand-row');
  $discDiv.setAttribute('class', `disc ${disc.brand_slug}`);
  $rowDiv.setAttribute('class', 'disc-row');
  $discName.setAttribute('class', 'disc-name');
  $discNumbers.setAttribute('class', 'flight-numbers');
  $discs.append($brandDiv);
  $brandDiv.append($brandHeader);
  $discs.append($rowDiv);
  $rowDiv.append($discDiv);
  $discDiv.append($discName);
  $discDiv.append($discNumbers);
}

function renderDisc3(disc) {
  if (disc.brand_slug === 'løft-discs') {
    disc.brand_slug = 'loft-discs';
  }
  const $discDiv = document.createElement('div');
  const $discName = document.createElement('p');
  const $discNumbers = document.createElement('p');
  const $allDiscRows = document.querySelectorAll('.disc-row');
  const previousRow = $allDiscRows[$allDiscRows.length - 1];
  $discName.textContent = disc.name;
  $discNumbers.textContent = `${disc.speed}|${disc.glide}|${disc.turn}|${disc.fade}|`;
  $discDiv.setAttribute('class', `disc ${disc.brand_slug}`);
  $discName.setAttribute('class', 'disc-name');
  $discNumbers.setAttribute('class', 'flight-numbers');
  previousRow.append($discDiv);
  $discDiv.append($discName);
  $discDiv.append($discNumbers);
}

// Event listener disc click to show to flight pattern

$searchPage.addEventListener('click', handleDiscClick);
const $blurModal = document.querySelector('.background-blur-modal');
$blurModal.addEventListener('click', removeBlur);
const $discModal = document.querySelector('.disc-modal');
const $flightPatternImage = document.querySelector('.flight-pattern-image');
const $anchor = document.querySelector('a');

async function handleDiscClick(event) {
  const response = await fetch('https://discit-api.fly.dev/disc');
  const data = await response.text();
  const parseData = JSON.parse(data);
  if (event.target.classList.contains('disc')) {
    const $discName = event.target.querySelector('.disc-name');
    for (let i = 0; i < parseData.length; i++) {
      if (parseData[i].brand_slug === 'løft-discs') {
        parseData[i].brand_slug = 'loft-discs';
      }
      if (parseData[i].name === $discName.textContent) {
        $discModal.setAttribute('class', `disc-modal ${parseData[i].brand_slug}`);
        $flightPatternImage.setAttribute('src', `${parseData[i].pic}`);
        $anchor.setAttribute('href', `${parseData[i].link}`);
      }
      $blurModal.classList.remove('hidden');
      $discModal.classList.remove('hidden');
    }
  } else if (event.target.classList.contains('disc-name')) {
    const $discName = event.target.textContent;
    for (let i = 0; i < parseData.length; i++) {
      if (parseData[i].brand_slug === 'løft-discs') {
        parseData[i].brand_slug = 'loft-discs';
      }
      if (parseData[i].name === $discName) {
        $discModal.setAttribute('class', `disc-modal ${parseData[i].brand_slug}`);
        $flightPatternImage.setAttribute('src', `${parseData[i].pic}`);
        $anchor.setAttribute('href', `${parseData[i].link}`);
      }
      $blurModal.classList.remove('hidden');
      $discModal.classList.remove('hidden');
    }
  } else if (event.target.classList.contains('flight-numbers')) {
    const $discName = event.target.previousElementSibling;
    for (let i = 0; i < parseData.length; i++) {
      if (parseData[i].brand_slug === 'løft-discs') {
        parseData[i].brand_slug = 'loft-discs';
      }
      if (parseData[i].name === $discName.textContent) {
        $discModal.setAttribute('class', `disc-modal ${parseData[i].brand_slug}`);
        $flightPatternImage.setAttribute('src', `${parseData[i].pic}`);
        $anchor.setAttribute('href', `${parseData[i].link}`);
      }
      $blurModal.classList.remove('hidden');
      $discModal.classList.remove('hidden');
    }
  }
}

function removeBlur(event) {
  $blurModal.classList.add('hidden');
  $discModal.classList.add('hidden');
}
