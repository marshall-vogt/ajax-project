// Search-page, home-page and bag-page view swap

const $buildMyBag = document.querySelector('.home-page-button');
const $homePage = document.querySelector('.home-page');
const $searchPage = document.querySelector('.search-page');
const $filterPage = document.querySelector('.filter-page');
const $bagPage = document.querySelector('.bag-page');
const $navbar = document.querySelector('.navbar');

$buildMyBag.addEventListener('click', searchPageView);

function searchPageView(event) {
  $homePage.classList.remove('shown');
  $homePage.classList.add('hidden');
  $searchPage.classList.remove('hidden');
  $searchPage.classList.add('shown');
  $filterPage.classList.remove('shown');
  $filterPage.classList.add('hidden');
  $bagPage.classList.remove('shown');
  $bagPage.classList.add('hidden');
  $navbar.classList.remove('hidden');
  $navbar.classList.add('shown');
}

const $navbarButtons = document.querySelectorAll('i');
const $homeButton = $navbarButtons[0];
const $searchButton = $navbarButtons[1];
const $bagButton = $navbarButtons[2];
const $noDiscsText = document.querySelector('.no-discs-text');

$homeButton.addEventListener('click', homePageView);
$searchButton.addEventListener('click', searchPageView);
$bagButton.addEventListener('click', bagPageView);

function homePageView(event) {
  $homePage.classList.remove('hidden');
  $homePage.classList.add('shown');
  $searchPage.classList.remove('shown');
  $searchPage.classList.add('hidden');
  $filterPage.classList.remove('shown');
  $filterPage.classList.add('hidden');
  $navbar.classList.remove('shown');
  $navbar.classList.add('hidden');
  $bagPage.classList.remove('shown');
  $bagPage.classList.add('hidden');
}

function bagPageView(event) {
  const $discBagDiscs = document.querySelectorAll('.disc-bag-disc');
  for (let i = 0; i < $discBagDiscs.length; i++) {
    $discBagDiscs[i].remove();
  }
  if (data.bag.length === 0) {
    $noDiscsText.classList.remove('hidden');
    $noDiscsText.classList.add('shown');
  }
  if (data.bag.length > 0) {
    $noDiscsText.classList.remove('shown');
    $noDiscsText.classList.add('hidden');
    data.bag.map(disc => renderBag(disc));
  }
  $homePage.classList.remove('shown');
  $homePage.classList.add('hidden');
  $searchPage.classList.remove('shown');
  $searchPage.classList.add('hidden');
  $filterPage.classList.remove('shown');
  $filterPage.classList.add('hidden');
  $bagPage.classList.remove('hidden');
  $bagPage.classList.add('shown');
}

// Obtain API data

const $loadingCircle = document.querySelector('#loading-circle-main');
const xmlHR = new XMLHttpRequest();
xmlHR.open('GET', 'https://discit-api.fly.dev/disc');
xmlHR.responseType = 'json';
xmlHR.addEventListener('load', handleLoadEvent);
xmlHR.addEventListener('loadstart', handleLoadStart);
xmlHR.addEventListener('loadend', handleLoadEnd);

function handleLoadStart(scope) {
  $loadingCircle.classList.remove('hidden');
  $loadingCircle.classList.add('shown');
}

function handleLoadEnd(scope) {
  $loadingCircle.classList.remove('shown');
  $loadingCircle.classList.add('hidden');
}

function handleLoadEvent() {
  const sortedResponse = xmlHR.response.sort(function (a, b) {
    a = a.brand.toLowerCase();
    b = b.brand.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  });
  const brandArray = [];
  const brandSlugArray = [];
  for (let i = 0; i < sortedResponse.length; i++) {
    if (i === 0 || sortedResponse[i].brand !== sortedResponse[i - 1].brand) {
      renderDisc1(sortedResponse[i]);
      brandArray.push(sortedResponse[i].brand);
      brandSlugArray.push(sortedResponse[i].brand_slug);
    } else {
      renderDisc2(sortedResponse[i]);
    }
  }
  renderBrandOptions(brandArray, brandSlugArray);
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

function renderBag(disc) {
  if (disc.brand_slug === 'løft-discs') {
    disc.brand_slug = 'loft-discs';
  }
  const $discDiv = document.createElement('div');
  const $discBrand = document.createElement('p');
  const $discName = document.createElement('p');
  const $discNumbers = document.createElement('p');
  const $discBag = document.querySelector('.disc-bag');
  const $deleteButton = document.createElement('button');
  $discBrand.textContent = disc.brand;
  $discName.textContent = disc.name;
  $discNumbers.textContent = `${disc.speed}|${disc.glide}|${disc.turn}|${disc.fade}|`;
  $deleteButton.textContent = 'Remove Disc';
  $discBrand.setAttribute('class', 'disc-bag-brand');
  $discDiv.setAttribute('class', `disc-bag-disc ${disc.brand_slug}`);
  $discName.setAttribute('class', 'disc-name');
  $discNumbers.setAttribute('class', 'flight-numbers');
  $deleteButton.setAttribute('class', 'delete-button');
  $discBag.append($discDiv);
  $discDiv.append($discBrand);
  $discDiv.append($discName);
  $discDiv.append($discNumbers);
  $discDiv.append($deleteButton);
}

const $brandSelect = document.querySelector('#brand-select');

function renderBrandOptions(arrayA, arrayB) {
  for (let i = 0; i < arrayA.length; i++) {
    const $option = document.createElement('option');
    $option.textContent = arrayA[i];
    $option.setAttribute('value', arrayB[i]);
    $brandSelect.append($option);
  }
}

// Event listener disc click to show to flight pattern

$searchPage.addEventListener('click', handleDiscClick);
const $blurModal = document.querySelector('.background-blur-modal');
$blurModal.addEventListener('click', removeBlur);
const $discModal = document.querySelector('.disc-modal');
const $flightPatternImage = document.querySelector('.flight-pattern-image');
const $anchor = document.querySelector('a');

function handleDiscClick(event) {
  const xmlHR = new XMLHttpRequest();
  xmlHR.open('GET', 'https://discit-api.fly.dev/disc');
  xmlHR.responseType = 'json';
  xmlHR.addEventListener('load', function () {
    const response = xmlHR.response;
    if (event.target.classList.contains('disc')) {
      const $discName = event.target.querySelector('.disc-name');
      for (let i = 0; i < response.length; i++) {
        if (response[i].brand_slug === 'løft-discs') {
          response[i].brand_slug = 'loft-discs';
        }
        if (response[i].name === $discName.textContent) {
          $discModal.setAttribute(
            'class',
            `disc-modal ${response[i].brand_slug}`
          );
          $flightPatternImage.setAttribute('src', `${response[i].pic}`);
          $anchor.setAttribute('href', `${response[i].link}`);
          data.disc.push(response[i]);
        }
        $blurModal.classList.remove('hidden');
        $discModal.classList.remove('hidden');
      }
    } else if (event.target.classList.contains('disc-name')) {
      const $discName = event.target.textContent;
      for (let i = 0; i < response.length; i++) {
        if (response[i].brand_slug === 'løft-discs') {
          response[i].brand_slug = 'loft-discs';
        }
        if (response[i].name === $discName) {
          $discModal.setAttribute(
            'class',
            `disc-modal ${response[i].brand_slug}`
          );
          $flightPatternImage.setAttribute('src', `${response[i].pic}`);
          $anchor.setAttribute('href', `${response[i].link}`);
          data.disc.push(response[i]);
        }
        $blurModal.classList.remove('hidden');
        $discModal.classList.remove('hidden');
      }
    } else if (event.target.classList.contains('flight-numbers')) {
      const $discName = event.target.previousElementSibling;
      for (let i = 0; i < response.length; i++) {
        if (response[i].brand_slug === 'løft-discs') {
          response[i].brand_slug = 'loft-discs';
        }
        if (response[i].name === $discName.textContent) {
          $discModal.setAttribute(
            'class',
            `disc-modal ${response[i].brand_slug}`
          );
          $flightPatternImage.setAttribute('src', `${response[i].pic}`);
          $anchor.setAttribute('href', `${response[i].link}`);
          data.disc.push(response[i]);
        }
        $blurModal.classList.remove('hidden');
        $discModal.classList.remove('hidden');
      }
    }
  });
  xmlHR.send();
}

function removeBlur(event) {
  $blurModal.classList.add('hidden');
  $discModal.classList.add('hidden');
  data.disc = [];
}

// Filter page view swap

const $filterButton = document.querySelector('.filter-button');
$filterButton.addEventListener('click', filterView);

function filterView(event) {
  $homePage.classList.remove('shown');
  $homePage.classList.add('hidden');
  $searchPage.classList.remove('shown');
  $searchPage.classList.add('hidden');
  $filterPage.classList.remove('hidden');
  $filterPage.classList.add('shown');
}

// Filter apply

const $applyButton = document.querySelector('.apply-button');
$applyButton.addEventListener('click', applyFilter);
const $allselectButtons = document.querySelectorAll('select');

function applyFilter(event) {
  event.preventDefault();
  const filterNames = [];
  const filterValues = [];
  const $allBrandRows = document.querySelectorAll('.brand-row');
  const $allDiscRows = document.querySelectorAll('.disc-row');
  for (let k = 0; k < $allBrandRows.length; k++) {
    $allBrandRows[k].remove();
    $allDiscRows[k].remove();
  }
  for (let i = 0; i < $allselectButtons.length; i++) {
    const options = $allselectButtons[i];
    const selectedValue = options[options.selectedIndex].value;
    const selectedName = options.name;
    if (selectedValue !== '') {
      filterNames.push(selectedName);
      filterValues.push(selectedValue);
    }
  }
  if (filterNames.length === 1) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `https://discit-api.fly.dev/disc?${filterNames[0]}=${filterValues[0]}`
    );
    xhr.responseType = 'json';
    xhr.addEventListener('loadstart', handleLoadStart);
    xhr.addEventListener('loadend', handleLoadEnd);
    xhr.addEventListener('load', function () {
      const sortedResponse = xhr.response.sort(function (a, b) {
        a = a.brand.toLowerCase();
        b = b.brand.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
      });
      for (let i = 0; i < sortedResponse.length; i++) {
        if (
          i === 0 ||
          sortedResponse[i].brand !== sortedResponse[i - 1].brand
        ) {
          renderDisc1(sortedResponse[i]);
        } else {
          renderDisc2(sortedResponse[i]);
        }
      }
    });
    xhr.send();
  } else if (filterNames.length > 1) {
    let endpointString = `${filterNames[0]}=${filterValues[0]}`;
    for (let j = 1; j < filterNames.length; j++) {
      endpointString += `&${filterNames[j]}=${filterValues[j]}`;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://discit-api.fly.dev/disc?${endpointString}`);
    xhr.responseType = 'json';
    xhr.addEventListener('loadstart', handleLoadStart);
    xhr.addEventListener('loadend', handleLoadEnd);
    xhr.addEventListener('load', function () {
      const sortedResponse = xhr.response.sort(function (a, b) {
        a = a.brand.toLowerCase();
        b = b.brand.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
      });
      for (let i = 0; i < sortedResponse.length; i++) {
        if (
          i === 0 ||
          sortedResponse[i].brand !== sortedResponse[i - 1].brand
        ) {
          renderDisc1(sortedResponse[i]);
        } else {
          renderDisc2(sortedResponse[i]);
        }
      }
    });
    xhr.send();
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://discit-api.fly.dev/disc');
    xhr.responseType = 'json';
    xhr.addEventListener('loadstart', handleLoadStart);
    xhr.addEventListener('loadend', handleLoadEnd);
    xhr.addEventListener('load', function () {
      const sortedResponse = xhr.response.sort(function (a, b) {
        a = a.brand.toLowerCase();
        b = b.brand.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
      });
      for (let i = 0; i < sortedResponse.length; i++) {
        if (
          i === 0 ||
          sortedResponse[i].brand !== sortedResponse[i - 1].brand
        ) {
          renderDisc1(sortedResponse[i]);
        } else {
          renderDisc2(sortedResponse[i]);
        }
      }
    });
    xhr.send();
  }
  searchPageView();
}

// Filter reset

const $resetButton = document.querySelector('.reset-button');
const $form = document.querySelector('form');
$resetButton.addEventListener('click', formReset);

function formReset(event) {
  $form.reset();
  const $allBrandRows = document.querySelectorAll('.brand-row');
  const $allDiscRows = document.querySelectorAll('.disc-row');
  for (let k = 0; k < $allBrandRows.length; k++) {
    $allBrandRows[k].remove();
    $allDiscRows[k].remove();
  }
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://discit-api.fly.dev/disc');
  xhr.responseType = 'json';
  xhr.addEventListener('loadstart', handleLoadStart);
  xhr.addEventListener('loadend', handleLoadEnd);
  xhr.addEventListener('load', function () {
    const sortedResponse = xhr.response.sort(function (a, b) {
      a = a.brand.toLowerCase();
      b = b.brand.toLowerCase();

      return a < b ? -1 : a > b ? 1 : 0;
    });
    for (let i = 0; i < sortedResponse.length; i++) {
      if (i === 0 || sortedResponse[i].brand !== sortedResponse[i - 1].brand) {
        renderDisc1(sortedResponse[i]);
      } else {
        renderDisc2(sortedResponse[i]);
      }
    }
  });
  xhr.send();
}

// Save disc to bag

const $saveButton = document.querySelector('.bag-save-button');
$saveButton.addEventListener('click', handleSaveClick);

function handleSaveClick(event) {
  data.bag.push(data.disc[0]);
  removeBlur();
  data.disc = [];
}

// Remove disc from bag

$bagPage.addEventListener('click', handleDelete);

function handleDelete() {
  if (event.target.textContent === 'Remove Disc') {
    const discName = event.target.previousSibling.previousSibling.textContent;
    data.bag.forEach((disc, index) => {
      if (disc.name === discName) data.bag.splice(index, 1);
    });
    bagPageView();
  }
}
