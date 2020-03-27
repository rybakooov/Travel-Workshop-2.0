document.addEventListener("DOMContentLoaded", function(){
  fetch('https://jsonplaceholder.typicode.com/photos?_limit=8')
    .then(response => response.json())
    .then(function(json){
      let imgVal = [],
          index = 0; 
      json.map(function(item, ind, arr){
        imgVal.push({
          'id': item.id,
          'url': item.url
        })
      })
      $(document).find('.banner__base').css('background-image', `url('${imgVal[0]['url']}')`);
      $(document).find('.banner-bottom__link_refresh span').html(imgVal[0]['id']);
      $(document).on('click', '.banner-bottom__link_refresh', function(e){
        e.preventDefault();
        index == imgVal.length - 1 ? index = 0 : index++;
        $(document).find('.banner__base').css('background-image', `url('${imgVal[index]['url']}')`);
        $(document).find('.banner-bottom__link_refresh span').html(imgVal[index]['id']);
      })
    })
    .catch(error => {
      $(document).find('.banner__base').css('background-image', `url(assets/images/index-bg.png)`);
      $(document).find('.banner-bottom__link_refresh').fadeOut();
    })
  

    if (window.location.pathname == '/' || window.location.pathname == '/index.html'){
      $(document).on('click', '.header-logo', function(e){
        e.preventDefault();
        $(this).css('cursor', 'default');
      })
    }
    
});

$(document).ready(function(){

  /* switch dark-theme */

  if(localStorage.getItem('dark-theme') == null){
    localStorage.setItem('dark-theme', 'false');
  } else localStorage.getItem('dark-theme') == 'true' ? document.querySelector('html').setAttribute('theme', 'dark') : null


  $(document).on('click', '.header-right__switch-theme_moon', function(){
    localStorage.setItem('dark-theme', 'true');
    document.querySelector('html').setAttribute('theme', 'dark');
  })

  $(document).on('click', '.header-right__switch-theme_sun', function(){
    localStorage.setItem('dark-theme', 'false');
    document.querySelector('html').removeAttribute('theme');
  })

  /* switch dark-theme end */

  
  /* Раскрывающиейся FAQ-списки */

  $(document).on('click', '.faq-item-top', function(){
    $(this).parent().toggleClass('faq-item_open')
    $(this).parent().find('.faq-item-main').slideToggle();
  })

  /* Раскрывающиейся FAQ-списки end*/


  /* item yandex map */

  if($('#main-map').length){
    ymaps.ready(init);
    function init(){
      // Создание карты.
      var myMap = new ymaps.Map("main-map", {
          center: [57.623229, 39.856246],
          zoom: 16,
          controls: ['zoomControl']
      });


      myGeoObject = new ymaps.GeoObject({
        // Описание геометрии.
        geometry: {
            type: "Point",
            coordinates: [57.623229, 39.856246]
        },
        // Свойства.
        properties: {
            // Контент метки.
            iconContent: 'Travel Workshop'
        }},{
          // Опции.
          // Иконка метки будет растягиваться под размер ее содержимого.
          preset: 'islands#blackStretchyIcon'
        });
        
      myMap.geoObjects.add(myGeoObject);
      myMap.behaviors.disable('scrollZoom'); 
      myMap.behaviors.disable('drag');
    }
    
  }

  /* item yandex map end */
  

  /* resiZZZer */

  function resizer() {
    $('.tours-wrap-item').each(function (){
      $(this).css('height', $(this).width());
    })
  }
  resizer();

  $(window).resize(function(){
    resizer();
  })

  /* resiZZZer end */


  /* header scroll */
  
  $('.header').addClass('header_down');
  
  /* header scroll end */


  /* tour sliders */

  if($('.tour-main-slider').length){
    $('.tour-main-slider').slick({
      slidesToScroll: 1,
      slidesToShow: 1,
      prevArrow: $('.tour-mainSl__prev'),
      nextArrow: $('.tour-mainSl__next'),
      asNavFor: '.tour-sub-slider',
      infinite: true,
    }) 

    $('.tour-sub-slider').slick({
      slidesToShow: 4,
      focusOnSelect: true,
      slidesToScroll: 1,
      arrows: false,
      infinite: true,
      asNavFor: '.tour-main-slider',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    })
  }

  /* tour sliders end */



  /* main-modal-form */

  $(document).on('click', '[data-modal]', function(){
    $('#main-modal-form').fadeIn();
    $('body').addClass('body-overflow');
  })

  $(document).mouseup(function (e){ 
		var div = $(".modal-form > form");
		if (!div.is(e.target) && $('.modal-form').css('display') !== 'none' && div.has(e.target).length === 0) {
      div.closest('.modal-form').fadeOut();
      if(!$('.header-mobile').hasClass('opened')) $('body').removeClass('body-overflow');
		}
	});

  /* main-modal-form end */


  /* input placeholder */ 

  $(document).on('blur', '.modal-form-label input', function(){
    if(this.value != ''){
      $(this).next().addClass('toTop');
    } else {
      $(this).next().removeClass('toTop');
    }
  })

  /* input placeholder end */ 






  /* detach`им элементы меню */


  var screenStage = 0;
  var beforeStage = 0;
  function replaceMenuEl(){
    let screenWidth = $('body').width() + 17;
    if (screenWidth < 1024 && screenWidth > 767 && screenStage != 1){
        $('.header-linklist').detach().appendTo('.header-mobile');
        $('.header-right__switch-theme').detach().appendTo('.header-mobile');
        $('.header-right__tel').detach().appendTo('.header-right');
        $('.header-right__pop-up-btn').detach().appendTo('.header-right');
      screenStage = 1;
      return false;
    } else if (screenWidth < 768 && screenStage != 2) {
      $('.header-linklist').detach().appendTo('.header-mobile');
      $('.header-right__switch-theme').detach().appendTo('.header-mobile');
      $('.header-right__tel').detach().appendTo('.header-mobile');
      $('.header-right__pop-up-btn').detach().appendTo('.header-mobile');
      beforStage = screenStage;
      screenStage = 2;
      return false;
    } else if (screenWidth >= 1024 && screenStage != 0){
      $('.header-linklist').detach().insertAfter('.header-logo');
      $('.header-right__tel').detach().appendTo('.header-right');
      $('.header-right__pop-up-btn').detach().appendTo('.header-right');
      $('.header-right__switch-theme').detach().appendTo('.header-right');
      screenStage = 0;
      return false;
    }
  }

  replaceMenuEl();

  $(window).resize(function(){
    replaceMenuEl();
    $('header-mobile').removeClass('opened');
    $('header__burger').removeClass('active');
  })
  /* detach`им элементы меню end*/


  /* mobile menu + burder */ 

  $(document).on('click', '.header__burger', function(){
    $(this).toggleClass('active');
    $('.header-mobile').toggleClass('opened');
    $('body').toggleClass('body-overflow');
  })

  /* mobile menu + burder end*/ 
});