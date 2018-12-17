let ul = document.querySelector('ul');
let main = document.querySelector('main');
let section = document.querySelector('section ul');
let ulImages = '';
let breedName ='';
let subBreedName = '';

window.addEventListener("hashchange", function() {
    hash = window.location.hash.substring(1);
    main.innerHTML = ' ';
    section.innerHTML = ' ';
    location.reload();
    main.innerHTML = '<h3>' + capitalize(ulImages) + '</h3>';
    request('GET', 'https://dog.ceo/api/breed/'+ subBreedName +'/images/random', breedPicture);
    request('GET', "https://dog.ceo/api/breed/" + subBreedName +"/list", subBreedList);
    location.reload();
});


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function request(method, url, run) {
    let req = new XMLHttpRequest();
    req.addEventListener("load", run);
    req.open(method, url);
    req.send();
    }



function renderAllBreedList() {
    let myArray = JSON.parse(this.responseText);
    let data = myArray.message;
    for (let dog in data) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', '#' + dog);
        a.textContent = capitalize(dog);
        a.addEventListener('click', getBreedsRandomPicture);
        ul.appendChild(li);
        li.appendChild(a);
    }
}


function getRandomPicture() {
    main.innerHTML = ' ';
    main.innerHTML = '<h3 id="picheader">Random picture on dog</h3> ';
    request('GET', 'https://dog.ceo/api/breeds/image/random', randomPicture)
}

function randomPicture() {
    let pic = JSON.parse(this.responseText);
    let data = pic.message;
    let img = document.createElement('img');
    img.setAttribute('src', data);
    img.setAttribute('id', 'picture');
    main.appendChild(img);
    let button = document.createElement('input')
    button.setAttribute('value', 'New Picture');
    button.setAttribute('type', 'button');
    button.setAttribute('onClick', 'getRandomPicture()');
    main.appendChild(button);
}


function getBreedsRandomPicture() {
    hashRemoved = this.getAttribute('href').substring(1);
    main.innerHTML = ' ';
    section.innerHTML = ' ';
    request('GET', 'https://dog.ceo/api/breed/'+ subBreedName +'/images/random', breedPicture);
    request('GET', "https://dog.ceo/api/breed/" + subBreedName +"/list", subBreedList)

}

function breedPicture() {
    let pic = JSON.parse(this.responseText);
    let data = pic.message;
    main.innerHTML = '<h3>' + capitalize(subBreedName) + '</h3>';
    let img = document.createElement('img');
    img.setAttribute('src', data);
    img.setAttribute('id', 'picture');
    main.appendChild(img);
    let a = document.createElement('a')
    a.setAttribute('href', '#' + ulImages);
    a.setAttribute('class', 'PicButton');
    a.addEventListener('click', getBreedsRandomPicture);
    a.textContent = 'New Picture';
    main.appendChild(a);

}


function subBreedList() {
    let myArray = JSON.parse(this.responseText);
    let data = myArray.message;
    if (data.length !== 0) {
        section.innerHTML = ' ';
        let h4 = document.createElement('h4');
        h4.textContent = ('Sub-breeds');
        section.appendChild(h4);
    }
    for (let key in data) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', '#' +subBreedName+'/'+ data[key]);
        a.addEventListener('click', subBreedsRandomPic);
        a.textContent = capitalize(data[key]);
        section.appendChild(li);
        li.appendChild(a);
    }
}


function subBreedsRandomPic() {
    main.innerHTML = ' ';
    request('GET', 'https://dog.ceo/api/breed/'+ subBreedName +'/images/random', subBreedPicture)
    if (subBreedName.includes('/')) {
        let str = subBreedName;
        let words = str.split('/');
        request('GET', "https://dog.ceo/api/breed/" + words[0] +"/list", subBreedList);
        location.reload();
        } else {
        request('GET', "https://dog.ceo/api/breed/" + subBreedName +"/list", subBreedList);
        location.reload();
    }
}

function subBreedPicture() {
    let pic = JSON.parse(this.responseText);
    let data = pic.message;
    main.innerHTML = '<h3>' + capitalize(subBreedName)  + '</h3>';
    let img = document.createElement('img');
    img.setAttribute('src', data);
    img.setAttribute('id', 'picture');
    main.appendChild(img);
    let a = document.createElement('a')
    a.setAttribute('href', '#' + subBreedName);
    a.setAttribute('class', 'PicButton');
    a.textContent = 'New Picture';
    a.addEventListener('click', subBreedsRandomPic)
    main.appendChild(a);
    let a2 = document.createElement('a')
    a2.setAttribute('href', '#' + ulImages);
    a2.setAttribute('class', 'PicButton');
    a2.addEventListener('click', getBreedsRandomPicture);
    a2.textContent = 'Back';
    main.appendChild(a2);
}


function start() {
    request('GET', 'https://dog.ceo/api/breeds/list/all', renderAllBreedList);
    if (window.location.hash !== '') {
        subBreedName = window.location.hash.substring(1);
        request('GET', 'https://dog.ceo/api/breed/'+ subBreedName +'/images/random', subBreedPicture);
        if (subBreedName.includes('/')) {
            let str = subBreedName;
            let words = str.split('/');
            request('GET', "https://dog.ceo/api/breed/" + words[0] +"/list", subBreedList);
        } else {
            request('GET', "https://dog.ceo/api/breed/" + subBreedName +"/list", subBreedList);
        }
    } else {
    getRandomPicture();
    }
}

start();
