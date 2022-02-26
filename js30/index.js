// self-check
console.log("Ваша отметка - 60 балла(ов)nОтзыв по пунктам ТЗ:\nНе выполненные/не засчитанные пункты:\n1) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения\nВсе оставшиеся пункты выполнены и не имеют комментариев проверяющего.\n")





// player
let isPlay = false;

const playBtn = document.querySelector('.play-button');
const pauseBtn = document.querySelector('.pause-button');
const player = document.querySelector('.player');
const audio2 = new Audio();
let activeAudio = './assets/audio/forest.mp3';

// player.addEventListener('click', playAudio1);
const but = document.querySelector('body');
but.addEventListener('click', playAudio2)

function playAudio2(event) {
    if (event.target.classList.contains('play-button')) {
        // console.log(event.target)
        audio2.src = activeAudio;
        audio2.currentTime = 0;
        audio2.play();
        player.classList.remove('play-button')
        player.classList.add('pause-button')
        isPlay = true;
    } else if (event.target.classList.contains('pause-button')) {
        audio2.src = activeAudio;
        audio2.currentTime = 0;

        audio2.pause();
        player.classList.remove('pause-button')
        player.classList.add('play-button')
        isPlay = false;
    } else if (event.target.classList.contains('header-button')) {
        audio2.src = activeAudio;
        audio2.currentTime = 0;
        audio2.play();
        player.classList.remove('play-button')
        player.classList.add('pause-button')
        isPlay = true;
    }


}



// Change active theme



const playButtonAll = document.querySelectorAll('.button')
const playButtons = document.querySelector('.header-container');
playButtons.addEventListener('click', toggleActiveStatus);


function toggleActiveStatus(event) {



    if (event.target.classList.contains('button')) {

        playButtonAll.forEach((elem) => elem.classList.remove('active'));
        event.target.classList.add('active');
        document.querySelector('.main').style.backgroundImage = `url(assets/img/${event.target.dataset.bird}.jpg)`;
        activeAudio = `./assets/audio/${event.target.dataset.bird}.mp3`;
        console.log(activeAudio);
        // playAudioM();
    }
}

// menu player
const buttons = document.querySelectorAll('.button')

// let isPlay = false; 

// const playBtn = document.querySelector('.play-button');
// const pauseBtn = document.querySelector('.pause-button');
// const btnIcon = document.querySelector('.play-image-use');
// const audio = new Audio();

// function playAudio() {
//     audio.src = './assets/audio/forest.mp3';
//     audio.currentTime = 0;
//     audio.play();
//     if (isPlay == false) {
//         isPlay = true;
//         playBtn.classList.remove('play-button')
//         playBtn.classList.add('pause-button')
//             // btnIcon.xlink.href = "./assets/svg/sprite.svg#pause"
//         isPlay = true;
//     } else if (isPlay == true) {
//         audio.pause();
//         playBtn.classList.remove('pause-button')
//         playBtn.classList.add('play-button')
//         isPlay = false

//     }
// }

// playBtn.addEventListener('click', playAudio);