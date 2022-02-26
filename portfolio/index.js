import i18Obj from './translate.js';

// Self-assesmet

console.log("Ваша отметка - 82.5 балла(ов)\nОтзыв по пунктам ТЗ:\n\nЧастично выполненные пункты:\n1) сложные эффекты для кнопок при наведении и/или клике — 2 балл(только кнопка hire me)\n\n\nВсе оставшиеся пункты выполнены и не имеют комментариев проверяющего.")



// Hamburger-menu

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

function toggleMenu() {
    if (hamburger.classList.contains('open')) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        // nav.classList.add('closed');
    } else {
        hamburger.classList.add('open');
        nav.classList.add('open');
        // nav.classList.remove('closed');
    }
}
hamburger.addEventListener('click', toggleMenu);

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((el) => el.addEventListener('click', closeMenu));

nav.addEventListener('click', closeMenu);

function closeMenu(event) {
    if (event.target.classList.contains('nav-link')) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
    }
}

// Portfolio-images


const portfolioImages = document.querySelectorAll('.portfolio-img');

const portfolioBtns = document.querySelector('.portfolio-button-container');
portfolioBtns.addEventListener('click', changeImage);


function changeImage(event) {
    if (event.target.classList.contains('portfolio-button')) {
        portfolioImages.forEach((elem, index, arr) => elem.src = `./assets/img/${event.target.dataset.season}/${index+1}.jpg`)

    }
}

// image caching

const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadImages(seasons) {
    seasons.forEach((elem) => {

        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${elem}/${i}.jpg`;
        }
    });
}
preloadImages(seasons);




// Class .Active

const portfolioBtnAll = document.querySelectorAll('.portfolio-button');
portfolioBtns.addEventListener('click', toggleActiveStatus);

const langLinkAll = document.querySelectorAll('.lang-selector-link')
const langLinks = document.querySelector('.lang-selector');
langLinks.addEventListener('click', toggleActiveStatus);

function toggleActiveStatus(event) {
    let activeElement;
    if (event.target.classList.contains('portfolio-button')) {
        activeElement = portfolioBtnAll;

    } else if (event.target.classList.contains('lang-selector-link')) {
        activeElement = langLinkAll;
    }
    activeElement.forEach((elem, index, arr) => elem.classList.remove('active'));

    event.target.classList.add('active');

}


// translate

let lang = 'en';

const langObject = document.querySelector('.nav-item.lang-selector-link.nav-link.active');
const language = langObject.textContent;

langLinks.addEventListener('click', getTranslate);

function getTranslate(event) {
    // console.log(language);
    const currentElement = document.querySelectorAll('[data-i18]');
    currentElement.forEach((elem) => {
        elem.textContent = i18Obj[event.target.innerHTML][elem.dataset.i18];
        if (elem.placeholder) {
            elem.placeholder = i18Obj[event.target.innerHTML][elem.dataset.i18];
            elem.textContent = '';
        }

        lang = event.target.innerHTML;

    });

}

// toggle theme

let theme = '';

const themeSwitch = document.querySelector('.theme')
const themeElementsAll = document.querySelectorAll('.dark-light')

themeSwitch.addEventListener('click', toggleTheme);




function toggleTheme() {
    themeSwitch.classList.toggle('active');
    themeElementsAll.forEach((elem) => elem.classList.toggle('light-theme'))
    if (themeElementsAll[0].classList.contains('light-theme')) {
        theme = 'light-theme';
    } else {
        theme = '';
    }
}


// local storage

function Translate(language) {
    const currentElement = document.querySelectorAll('[data-i18]');
    currentElement.forEach((elem) => {
        elem.textContent = i18Obj[language][elem.dataset.i18];
        if (elem.placeholder) {
            elem.placeholder = i18Obj[language][elem.dataset.i18];
            elem.textContent = '';
        }

    });

}

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        const lang1 = localStorage.getItem('lang');

        Translate(lang1);
        lang = lang1;

    }

    if (localStorage.getItem('theme') == 'light-theme') {
        theme = localStorage.getItem('theme');

        toggleTheme()

    }

}
window.addEventListener('load', getLocalStorage);


// Animation

const button = document.querySelectorAll('.ripple');

function Ripple(e) {

    const x = e.clientX
    const y = e.clientY

    const buttonTop = e.target.offsetTop
    const buttonLeft = e.target.offsetLeft

    const xInside = x - buttonLeft
    const yInside = y - buttonTop

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = yInside + 'px'
    circle.style.left = xInside + 'px'

    this.appendChild(circle)

    setTimeout(() => circle.remove(), 500)
};

button.forEach((elem) => elem.addEventListener('click', Ripple));