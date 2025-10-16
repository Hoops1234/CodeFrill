 new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,


  /* bullet */
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicsbullets: true
  },


 
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


  breakpoints: {
    0: {
        slidesperview: 1
    },
    768: {
        slidesperview: 2
    },
    1024: {
        slidesperview: 3
    },
  }
});
