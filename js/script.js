"use strict"
//=================================================================================================================

// Меню Бургер
const iconMenu = document.querySelector('.menu__icon');
const phoneHeader = document.querySelector('.header__menu-phones-top');
const menuBody = document.querySelector('.menu__body');
if(iconMenu){
    iconMenu.addEventListener('click', function(){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

if(phoneHeader){
    iconMenu.addEventListener('click', function(){
        phoneHeader.classList.toggle('_hide-phone');
    });
}


//Плавная прокрутка по сайту с меню
const smoothLinks = document.querySelectorAll('.smooth-link[data-goto]');
if (smoothLinks.length > 0){
    smoothLinks.forEach(smoothLink => smoothLink.addEventListener('click', onSmoothLinkClick));
}

function onSmoothLinkClick(event){
    const smoothLink = event.target;

    if(smoothLink.dataset.goto && document.querySelector(smoothLink.dataset.goto)){
        const gotoBlock = document.querySelector(smoothLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
        // const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

        //Закрыть меню на мал экранах при клике на ссылку
        if(iconMenu.classList.contains('_active')){
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
        }

        window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
        });

        event.preventDefault();
    }
}

// Форма обратной связи

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);

        if(error === 0){
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                metod: 'POST',
                body: formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            }else{
                alert('Error');
                form.classList.remove('_sending');
            }
        }
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++){
            const input = formReq[i];
            formRemoveError(input);

            if(input.classList.contains('_phone')){
                if(phoneTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.classList.contains('_email')) {
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            } else {
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError (input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError (input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest (input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function phoneTest (input){
        return !/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/.test(input.value);
    }
})


//SLIDER SWIPER
// let swiper = new Swiper(".mySwiper", {
//     slidesPerView: 1,
//     spaceBetween: 30,
//     loop: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev"
//     }
//   });

  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 1,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        767: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    },
  });
//============================================================================================