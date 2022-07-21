const lotteryBtn = document.getElementsByClassName('lottery-btn');
const lotteryContainer = document.getElementsByClassName('lottery-container');
const lotteryContainerLine = document.getElementsByClassName('lottery-container-line');
const lotteryBackground = document.getElementsByClassName('lottery-background');
const lotteryWinner = document.getElementsByClassName('lottery-winner');
const lotterySpeedModeBtns = document.getElementsByClassName('lottery-speed-btn');
const lotteryOddsModeBtns = document.getElementsByClassName('lottery-odds-btn');
const lotterySoundSlow = new Audio('lotterySlow.mp3');
const lotterySoundMedium = new Audio('lotteryMedium.mp3');
const lotterySoundFast = new Audio('lotteryFast.mp3');

let nextLottery = false;
let speedMode = 8; // WOLNO: 20; ŚREDNIO: 8; SZYBKO: 3;
let oddsMode = 1; // MJx1: 1; MJx10: 10; MJx100: 100;
let choosens = [];

lotteryBtn[0].addEventListener('click', () => {
  lotteryBtn[0].setAttribute('disabled', 'true');

  if (speedMode === 20) {
    lotterySoundSlow.pause();
    lotterySoundSlow.currentTime = 0;
    lotterySoundSlow.play();
  } else if (speedMode === 8) {
    lotterySoundMedium.pause();
    lotterySoundMedium.currentTime = 0;
    lotterySoundMedium.play();
  } else if (speedMode === 3) {
    lotterySoundFast.pause();
    lotterySoundFast.currentTime = 0;
    lotterySoundFast.play();
  }
  
  for (const lotterySpeedModeBtn of lotterySpeedModeBtns) {
    lotterySpeedModeBtn.setAttribute('disabled', 'true');
  }

  lotteryWinner[0].textContent = '';
  lotteryWinner[0].classList.remove('lottery-winner-fadein');

  if (lotteryBackground.length > 0) {
    lotteryContainer[0].removeChild(lotteryBackground[0]);
  }

  if (nextLottery) {
    let lotteryItems = document.getElementsByClassName('lottery-item');
    lotteryItems = Array.from(lotteryItems);

    for (const lotteryItem of lotteryItems) {
      lotteryContainer[0].removeChild(lotteryItem);
    }
  }

  for (let i = 0; i < 80; i++) {
    const item = document.createElement('div');
    item.classList.add('lottery-item');

    const itemImg = document.createElement('img');

    const number = getRndInteger(1, oddsMode + 7);

    switch (number) {
      case 1:
        itemImg.setAttribute('src', 'https://zapodaj.net/images/ad5f45edf7033.png');
        item.setAttribute('name', 'Osoba1');
        break;
      case 2:
        itemImg.setAttribute('src', 'https://zapodaj.net/images/ead8e9da43ac2.png');
        item.setAttribute('name', 'Osoba2');
        break;
      case 3:
        itemImg.setAttribute('src', 'https://zapodaj.net/images/f6f435df43b3d.png');
        item.setAttribute('name', 'Osoba3');
        break;
      case 4:
        itemImg.setAttribute('src', 'https://zapodaj.net/images/ef44be493914a.png');
        item.setAttribute('name', 'Osoba4');
        break;
      case 5:
        itemImg.setAttribute('src', 'https://zapodaj.net/images/b880085bed0bf.png');
        item.setAttribute('name', 'Osoba5');
        break;
      case 6:
        itemImg.setAttribute('src', 'https://zapodaj.net/images/d5fa5bf8ff8e6.png');
        item.setAttribute('name', 'Osoba6');
        break;
      default:
        itemImg.setAttribute('src', 'https://zapodaj.net/images/ad5f45edf7033.png');
        item.setAttribute('name', 'Osoba1');
    }

    choosens.push(item.getAttribute('name'));

    itemImg.setAttribute('width', '76');

    lotteryContainer[0].appendChild(item);
    item.appendChild(itemImg);
  }

  const lotteryItems = document.getElementsByClassName('lottery-item');

  for (const lotteryItem of lotteryItems) {
    lotteryItem.classList.add('lottery-item-animation-fadein');
    setTimeout(() => {
      let root = document.documentElement;
      const number = getRndInteger(0, 11);
      root.style.setProperty('--animation-name', `scrollItems${number}`);
      lotteryItem.classList.add('lottery-item-animation-scroll');
    }, 1000);
  }

  setTimeout(() => {
    lotteryBtn[0].removeAttribute('disabled');

    for (const lotterySpeedModeBtn of lotterySpeedModeBtns) {
      lotterySpeedModeBtn.removeAttribute('disabled');
    }

    const number = getRndInteger(1, 6);

    switch (number) {
      case 1:
        lotteryWinner[0].textContent = `${choosens[70]}, gratulujemy!`;
        break;
      case 2:
        lotteryWinner[0].textContent = `${choosens[70]} wygrałeś/aś!`;
        break;
      case 3:
        lotteryWinner[0].textContent = `${choosens[70]} ❤`;
        break;
      case 4:
        lotteryWinner[0].textContent = `${choosens[70]}, jesteś zwycięzcą!`;
        break;
      case 5:
        lotteryWinner[0].textContent = `${choosens[70]}, zostałeś/aś wybrany/a :)`;
        break;
      default:
        lotteryWinner[0].textContent = `${choosens[70]}`;
    }

    lotteryWinner[0].classList.add('lottery-winner-fadein');

    const lotteryItemWinner = document.querySelector('.lottery-container div:nth-of-type(71)');
    lotteryItemWinner.classList.add('lottery-item-winner');

    choosens = [];
  }, speedMode * 1000 + 2000);

  nextLottery = true;
});

lotterySpeedModeBtns[0].addEventListener('click', () => {
  lotterySpeedModeBtns[0].classList.add('lottery-speed-btn-on');
  lotterySpeedModeBtns[1].classList.remove('lottery-speed-btn-on');
  lotterySpeedModeBtns[2].classList.remove('lottery-speed-btn-on');

  speedMode = 20;

  let root = document.documentElement;
  root.style.setProperty('--animation-duration', `${speedMode}s`);
});

lotterySpeedModeBtns[1].addEventListener('click', () => {
  lotterySpeedModeBtns[1].classList.add('lottery-speed-btn-on');
  lotterySpeedModeBtns[0].classList.remove('lottery-speed-btn-on');
  lotterySpeedModeBtns[2].classList.remove('lottery-speed-btn-on');

  speedMode = 8;

  let root = document.documentElement;
  root.style.setProperty('--animation-duration', `${speedMode}s`);
});

lotterySpeedModeBtns[2].addEventListener('click', () => {
  lotterySpeedModeBtns[2].classList.add('lottery-speed-btn-on');
  lotterySpeedModeBtns[0].classList.remove('lottery-speed-btn-on');
  lotterySpeedModeBtns[1].classList.remove('lottery-speed-btn-on');

  speedMode = 3;

  let root = document.documentElement;
  root.style.setProperty('--animation-duration', `${speedMode}s`);
});

lotteryOddsModeBtns[0].addEventListener('click', () => {
  lotteryOddsModeBtns[0].classList.add('lottery-odds-btn-on');
  lotteryOddsModeBtns[1].classList.remove('lottery-odds-btn-on');
  lotteryOddsModeBtns[2].classList.remove('lottery-odds-btn-on');

  oddsMode = 1;
});

lotteryOddsModeBtns[1].addEventListener('click', () => {
  lotteryOddsModeBtns[1].classList.add('lottery-odds-btn-on');
  lotteryOddsModeBtns[0].classList.remove('lottery-odds-btn-on');
  lotteryOddsModeBtns[2].classList.remove('lottery-odds-btn-on');

  oddsMode = 10;
});

lotteryOddsModeBtns[2].addEventListener('click', () => {
  lotteryOddsModeBtns[2].classList.add('lottery-odds-btn-on');
  lotteryOddsModeBtns[0].classList.remove('lottery-odds-btn-on');
  lotteryOddsModeBtns[1].classList.remove('lottery-odds-btn-on');

  oddsMode = 100;
});

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}