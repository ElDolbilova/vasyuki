let curr_stage = 0;
let stage_width = 0;

function stageCarousel(d) {
    let step = !isNaN(parseInt(d)) ? parseInt(d) : 0;

    let elem = document.getElementsByClassName('stages-container');

    elem[0].scrollTo({
        top: 0,
        left: elem[0].scrollLeft + step * (stage_width + 10),
        behavior: "smooth",
    });

    let dots = document.getElementsByClassName('stage-dot');
    if (dots.length) {
        dots[curr_stage].classList.toggle('active');
        dots[curr_stage + step].classList.toggle('active');
    }

    if (curr_stage == 0) {
        document.getElementsByClassName('stage-prev')[0].disabled = false;
    }
    if (curr_stage == 4) {
        document.getElementsByClassName('stage-next')[0].disabled = false;
    }
    curr_stage += step;

    if (curr_stage == 0) {
        document.getElementsByClassName('stage-prev')[0].disabled = true;
    }
    if (curr_stage == 4) {
        document.getElementsByClassName('stage-next')[0].disabled = true
    }
}

function setStageWidth() {
    let elem = document.getElementsByClassName('stage-1');

    if (elem.length) {
        stage_width = elem[0].offsetWidth;
        elem[0].parentElement.scrollLeft = curr_stage * (stage_width + 10);
    }
}

function initStageCarousel() {
    setStageWidth();
    document.getElementsByClassName('stage-dot')[curr_stage].classList.toggle('active');
    document.getElementsByClassName('stage-prev')[0].disabled = true;
}

function secondMarquee() {
    let marquee = document.getElementsByClassName("marquee-line");
    let fot = document.getElementsByTagName("footer");
    fot[0].insertBefore(marquee[0].cloneNode(true), fot[0].firstChild);
    marquee[0].classList.add('top');
}

const smallScreens = 600;
const mediumScreens = 1024;
const MAX_SLIDES_CNT = 3;
let slidesCnt = window.innerWidth > smallScreens ? ( window.innerWidth > mediumScreens ? MAX_SLIDES_CNT : 2): 1;
let prevSlideCnt = slidesCnt;

const sliderBtnLeft = document.querySelectorAll('.prev')[0];
const sliderBtnRight = document.querySelectorAll('.next')[0];

const slider = document.querySelector('.participants-block');
const sliderItems = document.querySelectorAll('.participant');
const dots = document.querySelector('.part-num');

let countItems = sliderItems.length;
let activeIndex = 0;
let sliderElemWidth = document.querySelectorAll('.participant')[0].offsetWidth;
sliderElemWidth *= slidesCnt;
let position = sliderElemWidth;
slider.style.transition = 'none';
slider.style.transform = `translateX(-${position}px)`;

for (let i = 0; i < slidesCnt; i++) {
    let ditem = sliderItems[i];
    slider.insertAdjacentElement('beforeend', ditem.cloneNode(true));
}
for (let i = 0; i < slidesCnt; i++) {
    let ditem = sliderItems[sliderItems.length - 1 - i]
    slider.insertAdjacentElement('afterbegin', ditem.cloneNode(true));
}

function pageNumText(curPage, totalPages) {
    return `<span>${curPage}</span><span>/${totalPages}<span>`
}


function initParticipantsCarousel() {

    if (prevSlideCnt !== slidesCnt) {

        for (let i = 0; i < prevSlideCnt; i++) {
            slider.removeChild(slider.children[0]);

        }
        for (let i = 0; i < prevSlideCnt; i++) {
            slider.removeChild(slider.lastChild);
        }

        for (let i = 0; i < slidesCnt; i++) {
            let ditem = sliderItems[i];
            slider.insertAdjacentElement('beforeend', ditem.cloneNode(true));
        }
        for (let i = 0; i < slidesCnt; i++) {
            let ditem = sliderItems[sliderItems.length - 1 - i]
            slider.insertAdjacentElement('afterbegin', ditem.cloneNode(true));
        }
    }

    activeIndex = 0;
    sliderElemWidth = document.querySelectorAll('.participant')[0].offsetWidth;
    sliderElemWidth *= slidesCnt;
    position = sliderElemWidth;
    slider.style.transition = 'none';
    slider.style.transform = `translateX(-${position}px)`;
    prevSlideCnt = slidesCnt;
    dots.innerHTML = pageNumText(activeIndex + slidesCnt, countItems);

}

const onRightBtnClick = () => {

    activeIndex += slidesCnt;

    if (activeIndex === countItems) {
        activeIndex = 0;
        slider.style.transform = `translateX(-${position + sliderElemWidth}px)`;

        setTimeout(() => {
            position = sliderElemWidth;
            slider.style.transition = 'none';
            slider.style.transform = `translateX(-${position}px)`;
        }, 300);

    } else {
        slider.style.transition = 'transform .3s';
        position += sliderElemWidth;
        slider.style.transform = `translateX(-${position}px)`;

    }
    dots.innerHTML = pageNumText(activeIndex + slidesCnt, countItems);
};

const onLeftBtnClick = () => {
    activeIndex -= slidesCnt;
    if (activeIndex === -slidesCnt) {
        slider.style.transition = 'transform .3s';
        slider.style.transform = `translateX(0px)`;
        activeIndex = countItems - slidesCnt;

        setTimeout(() => {
            slider.style.transition = 'none';
            position = sliderElemWidth * (countItems / slidesCnt);
            slider.style.transform = `translateX(-${position}px)`;
        }, 300);
    } else {
        slider.style.transition = 'transform .3s';
        position -= sliderElemWidth;
        slider.style.transform = `translateX(-${position}px)`;
    }
    dots.innerHTML = pageNumText(activeIndex + slidesCnt, countItems);
};

setInterval(function () {
    onRightBtnClick();
}, 4000);

sliderBtnRight.addEventListener('click', onRightBtnClick);
sliderBtnLeft.addEventListener('click', onLeftBtnClick);

window.addEventListener("resize", () => {
    setStageWidth();
    slidesCnt = window.innerWidth > smallScreens ? ( window.innerWidth > mediumScreens ? MAX_SLIDES_CNT : 2): 1;
    initParticipantsCarousel();

});
initStageCarousel();
initParticipantsCarousel();

secondMarquee();
