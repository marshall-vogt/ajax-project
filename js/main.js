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

const $discs = document.querySelector('.discs');

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
      const $brandDiv = document.createElement('div');
      const $brandHeader = document.createElement('h3');
      const $discDiv = document.createElement('div');
      const $rowDiv = document.createElement('div');
      const $discName = document.createElement('p');
      const $discNumbers = document.createElement('p');
      $brandHeader.textContent = sortedResponse[i].brand;
      $discName.textContent = sortedResponse[i].name;
      $discNumbers.textContent = `${sortedResponse[i].speed}|${sortedResponse[i].glide}|${sortedResponse[i].turn}|${sortedResponse[i].fade}|`;
      $brandDiv.setAttribute('class', 'brand-row');
      $discDiv.setAttribute('class', `disc ${sortedResponse[i].brand_slug}`);
      $rowDiv.setAttribute('class', 'disc-row');
      $discName.setAttribute('class', 'disc-name');
      $discNumbers.setAttribute('class', 'flight-numbers');
      $discs.append($brandDiv);
      $brandDiv.append($brandHeader);
      $discs.append($rowDiv);
      $rowDiv.append($discDiv);
      $discDiv.append($discName);
      $discDiv.append($discNumbers);
    } else if (sortedResponse[i].brand !== sortedResponse[i - 1].brand) {
      const $brandDiv = document.createElement('div');
      const $brandHeader = document.createElement('h3');
      const $discDiv = document.createElement('div');
      const $rowDiv = document.createElement('div');
      const $discName = document.createElement('p');
      const $discNumbers = document.createElement('p');
      $brandHeader.textContent = sortedResponse[i].brand;
      $discName.textContent = sortedResponse[i].name;
      $discNumbers.textContent = `${sortedResponse[i].speed}|${sortedResponse[i].glide}|${sortedResponse[i].turn}|${sortedResponse[i].fade}|`;
      $brandDiv.setAttribute('class', 'brand-row');
      $discDiv.setAttribute('class', `disc ${sortedResponse[i].brand_slug}`);
      $rowDiv.setAttribute('class', 'disc-row');
      $discName.setAttribute('class', 'disc-name');
      $discNumbers.setAttribute('class', 'flight-numbers');
      $discs.append($brandDiv);
      $brandDiv.append($brandHeader);
      $discs.append($rowDiv);
      $rowDiv.append($discDiv);
      $discDiv.append($discName);
      $discDiv.append($discNumbers);
    } else {
      const $discDiv = document.createElement('div');
      const $discName = document.createElement('p');
      const $discNumbers = document.createElement('p');
      const $allDiscRows = document.querySelectorAll('.disc-row');
      const previousRow = $allDiscRows[$allDiscRows.length - 1];
      $discName.textContent = sortedResponse[i].name;
      $discNumbers.textContent = `${sortedResponse[i].speed}|${sortedResponse[i].glide}|${sortedResponse[i].turn}|${sortedResponse[i].fade}|`;
      $discDiv.setAttribute('class', `disc ${sortedResponse[i].brand_slug}`);
      $discName.setAttribute('class', 'disc-name');
      $discNumbers.setAttribute('class', 'flight-numbers');
      previousRow.append($discDiv);
      $discDiv.append($discName);
      $discDiv.append($discNumbers);
    }
  }
}

xmlHR.send();

// Event listener disc click to show to flight pattern

$searchPage.addEventListener('click', handleDiscClick);
const $blurModal = document.querySelector('.background-blur-modal');
$blurModal.addEventListener('click', removeBlur);
const $discModal = document.querySelector('.disc-modal');
const $flightPatternImage = document.querySelector('.flight-pattern-image');

async function handleDiscClick(event) {
  const response = await fetch('https://discit-api.fly.dev/disc');
  const data = await response.text();
  const parseData = JSON.parse(data);
  if (event.target.classList.contains('disc')) {
    const $discName = event.target.querySelector('.disc-name');
    for (let i = 0; i < parseData.length; i++) {
      if (parseData[i].name === $discName.textContent) {
        $discModal.setAttribute('class', `disc-modal ${parseData[i].brand_slug}`);
        $flightPatternImage.setAttribute('src', `${parseData[i].pic}`);
      }
      $blurModal.classList.remove('hidden');
      $discModal.classList.remove('hidden');
    }
  } else if (event.target.classList.contains('disc-name')) {
    const $discName = event.target.textContent;
    for (let i = 0; i < parseData.length; i++) {
      if (parseData[i].name === $discName.textContent) {
        $discModal.setAttribute('class', `disc-modal ${parseData[i].brand_slug}`);
        $flightPatternImage.setAttribute('src', `${parseData[i].pic}`);
      }
      $blurModal.classList.remove('hidden');
      $discModal.classList.remove('hidden');
    }
  } else if (event.target.classList.contains('flight-numbers')) {
    const $discName = event.target.previousElementSibling;
    for (let i = 0; i < parseData.length; i++) {
      if (parseData[i].name === $discName.textContent) {
        $discModal.setAttribute('class', `disc-modal ${parseData[i].brand_slug}`);
        $flightPatternImage.setAttribute('src', `${parseData[i].pic}`);
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
