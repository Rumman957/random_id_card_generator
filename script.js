const generateBtn = document.querySelector('.generate-btn');
const cardsContainer = document.querySelector('.cards-container');
if (!navigator.onLine) {
    alert('Internet connection is required for fetching data.');
    generateBtn.innerText = "Connect to internet";
    generateBtn.style.color = 'red';
}
else {
    generateBtn.addEventListener('click', () => {
    createCard();
})
}
function fetchData(personName, personEmail, personImg, personImgContainer, loadingBg, personCountry) {
    // Make request for data
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', `https://randomuser.me/api/`);
    xhr.send();

    // Render data
    xhr.addEventListener('load', () => {
        personName.innerText = xhr.response.results[0].name.first;
        personEmail.innerText = xhr.response.results[0].email;
        personCountry.innerText = xhr.response.results[0].location.country;
        personImg.src = xhr.response.results[0].picture.large;
        personImgContainer.style.border = 'none';
        loadingBg.classList.add('hide');
        // If image requests fail
        if (personImg.src === '') {
            personImgContainer.innerText = 'Error loading image';
            personImgContainer.style.color = 'red';
        }
    })

    // Error handling
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

    // Loading animation
    const loadingBg = document.createElement('div');
    loadingBg.classList.add('loading-bg');
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loadingBg.append(loader);
    card.append(loadingBg);

    // Person's image 
    const personImgContainer = document.createElement('div');
    personImgContainer.classList.add('person-img-container');
    const personImg = document.createElement('img');
    personImg.alt = 'Person image';
    personImgContainer.append(personImg);

    // Person's info container
    const personInfoContainer = document.createElement('div');
    personInfoContainer.classList.add('person-info-container');
    // Person's name
    const personName = document.createElement('p');
    const nameLabel = document.createElement('span');
    nameLabel.innerText = 'Name: ';
    nameLabel.id = 'label';
    personName.classList.add('name');

    // Person's email
    const personEmail = document.createElement('p');
    const emailLabel = document.createElement('span');
    emailLabel.innerText = 'Email: ';
    emailLabel.id = 'label';
    personEmail.classList.add('email');

    // Person's country
    const personCountry = document.createElement('p');
    const countryLabel = document.createElement('span');
    countryLabel.innerText = 'Country: ';
    countryLabel.id = 'label';
    personCountry.classList.add('country');

    // Containers for name,email and country
    const nameContainer = document.createElement('div');
    nameContainer.append(nameLabel, personName);
    const emailContainer = document.createElement('div');
    emailContainer.append(emailLabel, personEmail);
    const personCountryContainer = document.createElement('div');
    personCountryContainer.append(countryLabel, personCountry);

    // Appending elements
    personInfoContainer.append(nameContainer, emailContainer, personCountryContainer);

    card.append(personImgContainer, personInfoContainer);
    cardsContainer.append(card);

    // To show a smooth transition for card reveal
    setTimeout(() => {
        card.classList.add('show');

    }, 100);

    fetchData(personName, personEmail, personImg, personImgContainer, loadingBg, personCountry);
}

// generateBtn.addEventListener('click', () => {
//     createCard();
// })

// Checking internet connection

// async function checkRealInternet() {
//     // If the browser already says offline, don't bother fetching
//     if (!navigator.onLine) return false;

//     try {
//         // Fetch a tiny piece of data with a cache-busting timestamp
//         const response = await fetch("https://typicode.com", {
//             method: "HEAD", // HEAD request only downloads headers, saving data
//             cache: "no-store"
//         });
//         return response.ok; // Returns true if status is 200-299
//     } catch (error) {
//         return false; // Fetch failed, meaning no actual internet access
//     }
// }

// // Usage Example:
// window.addEventListener('online', async () => {
//     const hasInternet = await checkRealInternet();
//     if (hasInternet) {
//         console.log("Confirmed: You are fully connected to the internet!");
//     } else {
//         console.log("Connected to router, but NO internet access available.");
//     }
// });