// self-check
console.log("Ваша отметка - 60 балла(ов)nОтзыв по пунктам ТЗ:\nНе выполненные/не засчитанные пункты:\n1) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения\nВсе оставшиеся пункты выполнены и не имеют комментариев проверяющего.\n")

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {

    // if (lockBoard) return;
    // if (this === firstCard) return;
    this.classList.add('flip');

    // if (!hasFlippedCard) {
    //     hasFlippedCard = true;
    //     firstCard = this;
    //     return;
    // }

    // secondCard = this;
    // // hasFlippedCard = false;

    // checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {

    // lockBoard = true;
    resetBoard();

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// (function shuffle() {
//     cards.forEach(card => {
//         let ramdomPos = Math.floor(Math.random() * 12);
//         card.style.order = ramdomPos;
//     });
// })();


cards.forEach(card => card.addEventListener('click', flipCard));