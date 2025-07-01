const cardImages = [
    'image1.jpg', 'image1.jpg', 
    'image2.jpg', 'image2.jpg', 
    'image3.jpg', 'image3.jpg', 
    'image4.jpg', 'image4.jpg', 
    'image5.jpg', 'image5.jpg', 
    'image6.jpg', 'image6.jpg', 
    'image7.jpg', 'image7.jpg', 
    'image8.jpg', 'image8.jpg'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cardImages);
    cardImages.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-image', image);
        card.style.backgroundImage = 'url("backface.jpg")'; // Image for the back of the card
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.style.backgroundImage = `url("${this.getAttribute('data-image')}")`;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image');

    if (isMatch) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.style.backgroundImage = 'url("backface.jpg")';
            secondCard.classList.remove('flipped');
            secondCard.style.backgroundImage = 'url("backface.jpg")';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    grid.innerHTML = '';
    createBoard();
}

restartButton.addEventListener('click', restartGame);
createBoard();