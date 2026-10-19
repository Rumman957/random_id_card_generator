const generateBtn = document.querySelector('.generate-btn');
const cardsContainer = document.querySelector('.cards-container');
// alert('Internet connection is required for fetching data.')

function fetchData(personName, personEmail, personImg, personImgContainer, loadingBg, personCountry) {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', `https://randomuser.me/api/`);
    xhr.send();

    xhr.addEventListener('load', () => {
        personName.innerText = xhr.response.results[0].name.first;
        personEmail.innerText = xhr.response.results[0].email;
        personCountry.innerText = xhr.response.results[0].location.country;
        personImg.src = xhr.response.results[0].picture.large;
        personImgContainer.style.border = 'none';
        loadingBg.classList.add('hide');
    })
   
    xhr.addEventListener('error', () => {
        personName.innerText = 'Error loading';
        personName.style.color = 'red';

        personEmail.innerText = 'Error loading';
        personEmail.style.color = 'red';

        personImgContainer.innerText = 'Error loading';
        personImgContainer.style.color = 'red';

        personCountry.innerText = 'Error loading';
        personCountry.style.color = 'red';

        loadingBg.classList.add('hide');

    })




}
function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');

    const loadingBg = document.createElement('div');
    loadingBg.classList.add('loading-bg');
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loadingBg.append(loader);
    card.append(loadingBg);


    const personImgContainer = document.createElement('div');
    personImgContainer.classList.add('person-img-container');

    const personImg = document.createElement('img');
    personImg.alt = 'Person image'
    personImgContainer.append(personImg);

    const personInfoContainer = document.createElement('div');
    personInfoContainer.classList.add('person-info-container');


    const personName = document.createElement('p');
    const nameLabel = document.createElement('span');
    nameLabel.innerText = 'Name: ';
    nameLabel.id = 'label';
    personName.classList.add('name')

    const personEmail = document.createElement('p');
    const emailLabel = document.createElement('span');
    emailLabel.innerText = 'Email: ';
    emailLabel.id = 'label';
    personEmail.classList.add('email')

    const personCountry = document.createElement('p');
    const countryLabel = document.createElement('span');
    countryLabel.innerText = 'Country: ';
    countryLabel.id = 'label';
    personCountry.classList.add('country')

    const nameContainer = document.createElement('div');
    nameContainer.append(nameLabel, personName);
    const emailContainer = document.createElement('div');
    emailContainer.append(emailLabel, personEmail);
    const personCountryContainer = document.createElement('div');
    personCountryContainer.append(countryLabel, personCountry);


    personInfoContainer.append(nameContainer, emailContainer, personCountryContainer);

    card.append(personImgContainer, personInfoContainer);
    cardsContainer.append(card);

    setTimeout(() => {
        card.classList.add('show');

    }, 100)


    fetchData(personName, personEmail, personImg, personImgContainer, loadingBg, personCountry);

}






generateBtn.addEventListener('click', () => {
    createCard();
})