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
let slidesCnt = window.innerWidth > smallScreens ? 3 : 1;
let step = 0;

function initParticipantsCarousel() {
    let slides = Array.from(document.getElementsByClassName('participant'));
    let elem = document.getElementsByClassName("participants-block");
    
    console.log(slides,slidesCnt)
    
    
        for (let i = 0; i < slidesCnt; i++) {
            console.log(slides.length-1-i)
           elem[0].insertBefore(slides[slides.length-1-i].cloneNode(true),slides[0])

        }
    
    console.log(slides)
    
}
function slidesStep(dir) {
    let slides = Array.from(document.getElementsByClassName('participant'));
    let elem = document.getElementsByClassName("participants-block");
    console.log(slides)
    
    if ((step + 1) * slidesCnt >= slides.length) {
        //копируем slidesCnt первых элементов в хвост при dir>0
        for (let i = 0; i < slidesCnt; i++) {
           elem[0].appendChild(slides[i].cloneNode(true))

        }
    }

    //скролл
    console.log(dir * slidesCnt * slides[0].clientWidth,parseInt(dir),slidesCnt,slides[0].clientWidth,elem[0].scrollLeft)

    elem[0].scrollTo({
        top: 0,
        left: elem[0].scrollLeft + parseInt(dir) * slidesCnt * slides[0].clientWidth,
        behavior: "smooth",
    });

    if ((step + 1) * slidesCnt >= slides.length) {
        
        //удаляем slidesCnt первых элементов  при dir>0
for (let i = 0; i < slidesCnt; i++) {
        elem[0].removeChild(slides[i])
       
}
         elem[0].scrollTo({
        top: 0,
        left: 1,
        behavior: "instant",
    });
    }

    step = ((step + parseInt(dir))*slidesCnt + slides.length) % (slides.length);
    console.log(step,elem[0].scrollLeft)

}

setInterval(function () {
    slidesStep(1);
}, 4000);

window.addEventListener("resize", () => {
    setStageWidth();
    slidesCnt = window.innerWidth > smallScreens ? 3 : 1;
    console.log(slidesCnt);
});
initStageCarousel();
initParticipantsCarousel();

secondMarquee();
