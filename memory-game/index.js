// self-check
console.log("Ваша отметка - 65 балла(ов)\nОтзыв по пунктам ТЗ:\nЧастично выполненные пункты:\n1) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения — 5 балл(а)\nВсе оставшиеся пункты выполнены и не имеют комментариев проверяющего.\n")
const cards = document.querySelectorAll('.memory-card');
const playButton = document.querySelector('.play');
const scoreButton = document.querySelector('.score');
let scoreItems = document.querySelectorAll('.score-item')
let youWonText = document.querySelector('.winner');
let openedPairs = 0;
let madeMoves = 0;
let records = [];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    madeMoves++;

    // console.log('flip', madeMoves)
    if (lockBoard) return;
    if (this === firstCard) return;
    playDeal()
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();
    }
    if (openedPairs === 6) {
        setTimeout(() => {
            records.push(Math.floor(madeMoves / 2));
            madeMoves = 0;
            finishGame();
        }, 1000);

    }

}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        openedPairs++;
    } else unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();


}



function unflipCards() {

    lockBoard = true;


    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        resetBoard();
        playUnflip();

    }, 1000);
}



function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;

    });
};
shuffle();

function playAgain() {
    openedPairs = 0;
    cards.forEach(card => card.classList.remove('flip'));
    resetBoard();
    cards.forEach(card => card.addEventListener('click', flipCard));
    // console.log(hasFlippedCard, lockBoard, firstCard, secondCard)
}

function finishGame() {
    winner();
    playAgain()
    sortRecords()
    shuffle();
    // console.log(records);
}

function sortRecords() {

    // records.sort((a, b) => a - b);
    records.reverse();
    if (records.length > 10) records.length = 10;
    records.reverse();

}
cards.forEach(card => card.addEventListener('click', flipCard));
playButton.addEventListener('click', playAgain)

// local Storage

function setLocalStorage() {
    localStorage.setItem('score', JSON.stringify(records));

}
window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
    if (localStorage.getItem('score')) {
        records = JSON.parse(localStorage.getItem('score'));
    }
    // console.log(records)
}
window.addEventListener('load', getLocalStorage);

// Show score 


function showScore() {
    document.querySelector('.best-score').classList.toggle('open')
    calculateScore();
}

scoreButton.addEventListener('click', showScore);


function calculateScore() {
    for (let i = 0; i < records.length; i++) {
        scoreItems[i].innerHTML = ` Game finished in  ${records[i]}    moves`;
    }

}

// winner 
const audio = new Audio();

 
function playWin() {
    audio.src = './assets/audio/pobedy.mp3';
    audio.currentTime = 0;
    audio.play();
}

const deal = new Audio();

 
function playDeal() {
    audio.src = './assets/audio/mb_card_deal_08.mp3';
    audio.currentTime = 0;
    audio.play();
}

const unflip = new Audio();

 
function playUnflip() {
    audio.src = './assets/audio/unflip.mp3';
    audio.currentTime = 0;
    audio.play();
}

function winner() {

    youWonText.innerHTML = `You made ${records[records.length -1]} moves!`;

    function flash() {

        youWonText.classList.add('open');

        // youWonText.classList.add('open')
        // setTimeout(() => {
        playWin();
        // }, 2000);
        // playWin();
        setTimeout(() => {
            youWonText.classList.add('big')
        }, 2000);
        // youWonText.classList.add('big')
        setTimeout(() => {
            youWonText.classList.remove('open');
        }, 2000);
    }
    flash();

}