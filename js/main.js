var canvas = document.getElementById('percent'),
	  context = canvas.getContext('2d'),
	  x = canvas.width / 2,
	  y = canvas.height / 2,
	  radius = 87,
	  startAngle = 1.5 * Math.PI,
	  endAngle = 0 * Math.PI,
	  counterClockwise = false;

	  context.beginPath();
	  context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
	  context.lineWidth = 5;

	  // line color
	  context.strokeStyle = '#fff';
	  context.stroke();

////////////////////////////////////	

$(function($){
	
	wow = new WOW({
		boxClass:     'animated', 
		animateClass: 'animated', // default
		offset:       0,          // default
		mobile:       true,       // default
		live:         true        // default
	})
	wow.init();
	
	$('#countdown').timeTo({
		timeTo: new Date(new Date('Mon August 12 2017 16:00:00 GMT+0300 (Финляндия (лето))')),
		displayDays: 2,
		displayCaptions: true,
		fontSize: 48,
	});
	
	$.fn.scrollToTop=function(){
    	$(this).hide().removeAttr("href");
		if($(window).scrollTop()!="0"){
        	$(this).fadeIn("slow")
		}
		var scrollDiv = $(this);
		$(window).scroll(function(){
			if($(window).scrollTop()=="0"){
				$(scrollDiv).fadeOut("slow")
			}else{
				$(scrollDiv).fadeIn("slow")
			}
		});
		$(this).click(function(){
		  $("html, body").animate({scrollTop:0}, "slow")
		});
	}
	$("#toTop").scrollToTop();

	
	$(window).on('resize load', function(){
		var mainSlide = $('.main-slide'),
			mainSlideText = $('#main_slide-text');

		mainSlideText.css({
			top : (mainSlide.height() - mainSlideText.height()) / 2 + 'px',
			//left : (mainSlide.width() - mainSlideText.width()) / 2 + 'px'
		})
	});
	
	$('#nav-open').on('click', function(e){
		$(this).toggleClass('active')
		e.preventDefault();
		$('#headerNav').toggle();
	});
	
	$(document).on("scroll",function(){
		if($(document).scrollTop()>50){
			$("header").removeClass("large").addClass("small");
		} else{
			$("header").removeClass("small").addClass("large");
		}
	});
	
	$('#news-slider').slick({
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		infinite: true,
		speed: 300,
		autoplay: true,
		adaptiveHeight: false,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				dots: true
			  }
			},
			{
			  breakpoint: 769,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		  ]
    });
	
	$('#quotes-slider').slick({
		infinite: true,
		speed: 300,
		autoplay: false,
		adaptiveHeight: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
    });
	
	$('#social-slider').slick({
		nextArrow: '<button class="slick-next"></button>',
		prevArrow: '<button class="slick-prev"></button>',
		//fade: true,
		appendArrows: $('#social-slider-nav'),
		//adaptiveHeight: true,
		infinite: true,
		speed: 300,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
    });
	
}(jQuery));