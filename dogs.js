
getIndividualDogBreed();


let dogBreedDefault;
let getBtnRefresh = document.querySelector('button');
getBtnRefresh.addEventListener('click', getIndividualDogBreed);
getBtnRefresh.textContent = "Ny bild!";


let getPlaceforImgs = document.querySelector('#insertDogBreedImgs');
let createdLiForUl;

let getBreedPlace = document.querySelector('#headDogBreedsContainer');
let getAllDogBreeds;

getAllBreed();
function getAllBreed() {
  let requestBreed = new XMLHttpRequest();
  requestBreed.addEventListener('load', renderDogBreedMenue);
  let urlStr = 'https://dog.ceo/api/breeds/list/all';
  requestBreed.open('GET', urlStr);
  requestBreed.send();
}
function renderDogBreedMenue() {
  let getParsedListOfAllBreed = JSON.parse(this.responseText);
  getParsedListOfAllBreed = getParsedListOfAllBreed['message'];



      let getBigLetterAllDogBreeds = getAllDogBreeds.charAt(0).toUpperCase() + getAllDogBreeds.slice(1);

      createdLiForUl = document.createElement('li');
      createdLiForUl.setAttribute('class', 'dogBreedBox');


      let createdPForLiInUl = document.createElement('p');


      createdPForLiInUl.addEventListener('click', function(){
       window.location.hash = 'breed-' + listAllBreed;
       getIndividualDogBreed(getBigLetterAllDogBreeds);
      });
      createdPForLiInUl.textContent = getBigLetterAllDogBreeds;
      createdLiForUl.appendChild(createdPForLiInUl);
      getBreedPlace.appendChild(createdLiForUl);
    }
    getSubBreeds = getParsedListOfAllBreed[listAllBreed];
    let createdSubUlForLi = document.createElement('ul');
    createdSubUlForLi.setAttribute('class', 'subBreed');


      for (let i = 0; i < getSubBreeds.length; i++) {
      if (checkIfAnyChildNode === "") {
        let insertSubBreeds = getSubBreeds[i];


        let createdSubLiForUl = document.createElement('li');
        createdSubLiForUl.setAttribute('class', 'subBreedIteam');
          createdSubLiForUl.addEventListener('click', function(){
         window.location.hash = 'breed-' + listAllBreed + '/' + insertSubBreeds;
        });
        createdSubUlForLi.appendChild(createdSubLiForUl);
        createdLiForUl.appendChild(createdSubUlForLi);
      }
    }
  }
}

function getIndividualDogBreed(getBigLetterAllDogBreeds, insertBigLetterSubBreeds){
  let urlStr;
  let getBreedStrAddressBar = location.hash;
  let getDogBreedsStrPlace = document.querySelector('#presentDogBreed');


  let getBreedStr = getBreedStrAddressBar.split('#breed-')[1];

  let requestImgs = new XMLHttpRequest();
  requestImgs.addEventListener('load', getIndividualDogBreedImgs);
  let getHeadDogStr;
  let getSubDogStr;

  if (getBreedStr) {

    let getBreedStrIntoArr = getBreedStr.replace("/", " ").split(' ');
    let getHeadDogBreedStr = getBreedStrIntoArr[0];

    }
    if (getBreedStr.includes('/')) {
      getDogBreedsStrPlace.textContent = 'Bild på ' + getHeadDogStr + ' --> ' + getSubDogStr;
    }
    else getDogBreedsStrPlace.textContent = 'Bild på ' + getHeadDogStr;
    urlStr = 'https://dog.ceo/api/breed/' + getBreedStr + '/images/random';
  }
  else urlStr = 'https://dog.ceo/api/breeds/image/random';

  requestImgs.open('GET', urlStr);
  requestImgs.send();
}
function getIndividualDogBreedImgs() {
  let getParsedListOfAllBreed = JSON.parse(this.responseText);

  let getParsedImgsOfAllBreed = getParsedListOfAllBreed['message'];
  getPlaceforImgs.setAttribute('src', getParsedImgsOfAllBreed);
}
