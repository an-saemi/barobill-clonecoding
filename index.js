const head = document.querySelector('header');
const elBurger = document.querySelector('header .burger_icon');
const popup = document.querySelector('.burger_popup');
const popupAll = document.querySelector('.burger_popup > .popup_all');

const sectionThree1 = document.querySelector('.section3 > p:nth-of-type(1)');
const sectionThree2 = document.querySelector('.section3 > h2');
const sectionThree3 = document.querySelector('.section3 > p:nth-of-type(2)');
const sectionThree4 = document.querySelectorAll('.section3 > .tab > a');
const slide = document.querySelectorAll('.step');

const sectionFour1 = document.querySelector('.section4 > p');
const sectionFour2 = document.querySelector('.section4 > h2');
const sectionFoura = document.querySelectorAll('.section4 > .sec4tab > a');
const fourInfo = document.querySelector('.section4 > .info');




document.addEventListener('load', function () {
    document.querySelector('.section1 > p').createAttribute('class', 'scroll');
    document.querySelector('.section1 > h2').createAttribute('class', 'scroll');
});
//왜 로딩시 class가 안먹는가에 대하여 classList써보기



elBurger.addEventListener('click', function () {
    //console.log('dz');
    popup.style.display = 'block';
    popupAll.classList.add('rtol');


    document.querySelector('.popup-top > span').addEventListener('click', function () {
        popup.style.display = 'none';
    });

    let list = document.querySelectorAll('.popup-middle > li');
    //forEach는 value먼저 jQuery는 index먼저
    list.forEach(function (v, k) {
        //각자의 값을 나타내려면 forEach문 그냥 each는 jQuery문
        v.addEventListener('click', function () {
            //console.log(this.children[2]); 아래거랑 같은거
            //console.log(list[k].children[2]);
            if (this.children[2].style.display != "block") {
                this.children[1].style.transform = "rotate(180deg)";
                //console.log('ddd');
                this.children[2].style.display = "block";
            } else if (this.children[2].style.display == "block") {
                this.children[1].style.transform = "rotate(0deg)";

                this.children[2].style.display = "none";
            };
        });
    });
});
//팝업창까지는 완료
//스크롤이 안되었지만 그건 scss가 제대로 적용되지 않아 생겼던 일...!


//자이제 제일문제인 scrollY를 해볼까
let scrollTop = '';

document.addEventListener('scroll', function () {

    scrollTop = window.scrollY;

    //console.log(scrollTop);
    if (scrollTop >= 100) {
        head.style.height = "80px";
        head.classList.add('fix');
    } else {
        head.style.height = "100px";
    }


    if (scrollTop >= 200) {
        sectionThree1.setAttribute("class", "scroll");
        sectionThree2.style.animationDelay = "0.2s";
        sectionThree2.classList.add('scroll');
        sectionThree3.style.animationDelay = "0.4s";
        sectionThree3.classList.add('scroll');

        sectionThree4.forEach(function (v, k) {
            v.style.animationDelay = "0.6s";
            v.classList.add('scroll');
        });
    };

    if (scrollTop >= 750) {
        slide.forEach(function (v, k) {
            v.classList.add('scroll');
        });

        document.querySelector('.section3-1 > .line > .step > div').classList.add('scroll');
    };
    //그림 absolute했는데 왜 안올라가는건징..
    //글씨들은 왜 안나오는건지.........

    if (scrollTop >= 950) {
        sectionFour1.classList.add('scroll');
        sectionFour2.classList.add('scroll');
    };



    if (scrollTop >= 2000) {
        document.querySelector('.section5 > .tit > p:nth-of-type(1)').classList.add('scroll');
        document.querySelector('.section5 > .tit > h2').classList.add('scroll');
        document.querySelector('.section5 > .tit > p:nth-of-type(2)').classList.add('class', 'scroll');
    };
});

//section2swiper + section3-1 swiper
var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

//section4 tab
function dataLoad(url) {
    fetch(url)
        .then(function (data) {
            return data.text();
        })
        .then(function (aaa) {
            fourInfo.innerHTML = aaa;
        })
}

let index = [];

sectionFoura.forEach(function (v, k) {

    dataLoad('./load1.html');

    v.addEventListener('click', function (event) {
        event.preventDefault();

        sectionFoura.forEach(function (v, k) {
            v.classList.remove('check');
        });

        this.classList.add('check');
        index.push(v);

        if (v.textContent == "수익형") {
            //textContent와 text()구분하기
            dataLoad('./load1.html')
        } else {
            dataLoad('./load2.html')
            //dataLoad함수생성
        }

    })
})

//section5 json읽어오기
const sec5Ul = document.querySelector('.fiveSwiper > ul');

fetch('./partners.json')
    .then(function (data) {
        return data.text();
    })
    .then(function (par) {
        console.log(par);

        const json = JSON.parse(par);
        console.log(json);

        let sec5Li = '';

        json.company.forEach(function (v, k) {

            sec5Li += `<li class="swiper-slide">
            <div class="partners">
                <img src="${v.url}" alt="">
                <div class="name">
                    <p class="subject">${v.subject}</p>
                    <b class="company">${v.name}</b>
                </div>
            </div>
            <img src="./바로빌 개발자센터 _ 비즈니스 데이터 API 연동_ 전자세금계산서 구축/quotes.png" alt="">
            <p>${v.review}</p>
            </li>`
        });

        sec5Ul.innerHTML = sec5Li;

        var swiper = new Swiper(".fiveSwiper", {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    })

//par=json배열임












