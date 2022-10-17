"use strict"
//=================================================================================================================
// Header Menu

// Проверка экрана ПК или тачпада
// let isMobile = {
//     Android: function() {
//         return navigator.userAgent.match(/Android/i);
//     },
//     BlackBerry: function() {
//         return navigator.userAgent.match(/BlackBerry/i);
//     },
//     iOS: function() {
//         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//     },
//     Opera: function() {
//         return navigator.userAgent.match(/Opera Mini/i);
//     },
//     Windows: function() {
//         return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
//     },
//     any: function() {
//         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//     }
// };

// if ( isMobile.any()){
//     document.body.classList.add('_touch');
//     let menuArrows = document.querySelectorAll('.menu__arrow');
//     if(menuArrows.length > 0){
//         for(let i = 0; i < menuArrows.length; i++){
//             let menuArrow = menuArrows[i];
//             menuArrow.addEventListener('click', () => menuArrow.parentElement.classList.toggle('_active'));
//         }
//     }
// } else {
//     document.body.classList.add('_pc');
// }

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
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0){
    menuLinks.forEach(menuLink => menuLink.addEventListener('click', onMenuLinkClick));
}

function onMenuLinkClick(event){
    const menuLink = event.target;

    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
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
//============================================================================================