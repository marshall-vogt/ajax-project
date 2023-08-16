// Search page view swap

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
      $discDiv.setAttribute('class', 'disc');
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
      $discDiv.setAttribute('class', 'disc');
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
      $discDiv.setAttribute('class', 'disc');
      $discName.setAttribute('class', 'disc-name');
      $discNumbers.setAttribute('class', 'flight-numbers');
      previousRow.append($discDiv);
      $discDiv.append($discName);
      $discDiv.append($discNumbers);
    }
  }
}

xmlHR.send();
