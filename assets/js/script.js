	/* ========================================================================= */
	/*	Page Preloader
	/* ========================================================================= */

	$(window).on("load", function () {
		$('#preloader').fadeOut('slow', function () {
			$(this).remove();
		});
	});

	(function ($) {
		"use strict";

		/* ========================================================================= */
		/*	Portfolio Filtering Hook
		/* =========================================================================  */
		$('.play-icon i').click(function () {
			var video = '<iframe allowfullscreen src="' + $(this).attr('data-video') + '"></iframe>';
			$(this).replaceWith(video);
		});

		/* ========================================================================= */
		/*	Portfolio Filtering Hook
		// =========================================================================  
		// setTimeout(function () {
		//	var filterizd = $('.filtr-container').filterizr({});
		//	//Active changer
		//	$('.filtr-control').on('click', function () {
		//		$('.filtr-control').removeClass("active");
		//		$(this).addClass("active");
		//	});
		// }, 500);*/

		/* ========================================================================= */
		/*	Galeria: filtr zdjęć wg roku
		/* =========================================================================  */
		$('#galeria .filtr-control').on('click', function () {
			var filter = String($(this).data('filter'));
			$('#galeria .filtr-control').removeClass('active');
			$(this).addClass('active');
			$('#galeria .filtr-item').each(function () {
				var show = filter === 'all' || String($(this).data('category')) === filter;
				$(this).toggle(show);
				// lightbox przewija tylko zdjęcia widoczne po filtrze
				$(this).find('a[data-lightbox]').attr('data-lightbox', show ? 'galeria' : 'galeria-ukryte');
			});
		});
		// start z filtrem oznaczonym w szablonie jako aktywny (najnowszy rok)
		$('#galeria .filtr-control.active').trigger('click');

		if (typeof lightbox !== 'undefined') {
			lightbox.option({ albumLabel: 'Zdjęcie %1 z %2' });
		}

		/* ========================================================================= */
		/*	Galeria: pasek zdjęć na stronie głównej
		/* =========================================================================  */
		$('.galeria-pasek-track').each(function () {
			var track = this;
			var base = $(track).data('base');
			var count = parseInt($(track).data('count'), 10) || 20;
			var photos = $(track).data('photos') || []; // {y: rok, n: numer, w: szerokość, h: wysokość}

			// losowy wybór przy każdym wejściu na stronę (Fisher–Yates)
			for (var i = photos.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var tmp = photos[i]; photos[i] = photos[j]; photos[j] = tmp;
			}
			photos = photos.slice(0, count);
			if (!photos.length) {
				$(track).closest('.galeria-pasek').hide();
				return;
			}

			// dwa takie same zestawy obok siebie = pętla bez końca przy automatycznym przesuwaniu;
			// każdy zestaw ma własną grupę lightboxa, więc w powiększeniu jest zawsze "z 20"
			function addSet(group, eager) {
				photos.forEach(function (p, idx) {
					var a = $('<a class="galeria-pasek-item"></a>')
						.attr('href', base + p.y + '/web/' + p.n + '.jpg')
						.attr('data-lightbox', group);
					$('<img>')
						.attr({
							src: base + p.y + '/thumbnails/' + p.n + '_thumb.jpg',
							alt: 'PMCC ' + p.y + ' – zdjęcie ' + p.n,
							width: p.w,
							height: p.h,
							loading: eager && idx < 6 ? 'eager' : 'lazy'
						})
						.appendTo(a);
					$('<span class="galeria-pasek-year"></span>').text(p.y).appendTo(a);
					$(track).append(a);
				});
			}
			addSet('pasek', true);
			addSet('pasek-kopia', false);

			// automatyczne przesuwanie; pauza przy dotyku, najechaniu myszą i strzałkach
			var speed = 0.5; // px na klatkę (~30 px/s)
			var pos = 0;
			var pausedUntil = 0;
			var hover = false;
			var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			function pause(ms) {
				pausedUntil = Date.now() + ms;
			}

			function step() {
				if (!hover && Date.now() > pausedUntil) {
					var half = track.scrollWidth / 2;
					if (Math.abs(track.scrollLeft - pos) > 2) {
						pos = track.scrollLeft; // ktoś przesunął ręcznie — jedziemy dalej od tego miejsca
					}
					pos += speed;
					if (half > 0 && pos >= half) {
						pos -= half;
					}
					track.scrollLeft = pos;
				}
				window.requestAnimationFrame(step);
			}

			// tylko prawdziwa mysz — na telefonie stuknięcie nie kończy się "zjechaniem" z paska
			$(track).on('pointerenter', function (e) { if (e.originalEvent.pointerType === 'mouse') hover = true; });
			$(track).on('pointerleave', function () { hover = false; });
			$(track).on('touchstart pointerdown wheel', function () { pause(4000); });

			var wrap = $(track).closest('.galeria-pasek-wrap');
			wrap.find('.galeria-pasek-prev, .galeria-pasek-next').on('click', function () {
				var dir = $(this).hasClass('galeria-pasek-prev') ? -1 : 1;
				pause(4000);
				track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
			});

			if (!reduceMotion) {
				window.requestAnimationFrame(step);
			}
		});

		/* ========================================================================= */
		/*	Testimonial Carousel
		/* =========================================================================  */

		//Init the slider
		$('.testimonial-slider').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			responsive: [{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
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


		/* ========================================================================= */
		/*	Clients Slider Carousel
		/* =========================================================================  */

		//Init the slider
		$('.clients-logo-slider').slick({
			infinite: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			slidesToShow: 5,
			slidesToScroll: 1,
		});




		/* ========================================================================= */
		/*	Company Slider Carousel
		/* =========================================================================  */
		$('.company-gallery').slick({
			infinite: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			slidesToShow: 5,
			slidesToScroll: 1,
		});


		/* ========================================================================= */
		/*	Awars Counter Js
		/* =========================================================================  */
		$('.counter').each(function () {
			var $this = $(this),
				countTo = $this.attr('data-count');

			$({
				countNum: $this.text()
			}).animate({
					countNum: countTo
				},

				{
					duration: 1500,
					easing: 'linear',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
						//alert('finished');
					}

				});
		});




		/* ========================================================================= */
		/*   Contact Form Validating
		/* ========================================================================= */


		$('#contact-submit').click(function (e) {

			//stop the form from being submitted
			e.preventDefault();

			/* declare the variables, var error is the variable that we use on the end
			to determine if there was an error or not */
			var error = false;
			var name = $('#name').val();
			var email = $('#email').val();
			var subject = $('#subject').val();
			var message = $('#message').val();

			/* in the next section we do the checking by using VARIABLE.length
			where VARIABLE is the variable we are checking (like name, email),
			length is a JavaScript function to get the number of characters.
			And as you can see if the num of characters is 0 we set the error
			variable to true and show the name_error div with the fadeIn effect. 
			if it's not 0 then we fadeOut the div( that's if the div is shown and
			the error is fixed it fadesOut. 
			
			The only difference from these checks is the email checking, we have
			email.indexOf('@') which checks if there is @ in the email input field.
			This JavaScript function will return -1 if no occurrence have been found.*/
			if (name.length == 0) {
				var error = true;
				$('#name').css("border-color", "#D8000C");
			} else {
				$('#name').css("border-color", "#666");
			}
			if (email.length == 0 || email.indexOf('@') == '-1') {
				var error = true;
				$('#email').css("border-color", "#D8000C");
			} else {
				$('#email').css("border-color", "#666");
			}
			if (subject.length == 0) {
				var error = true;
				$('#subject').css("border-color", "#D8000C");
			} else {
				$('#subject').css("border-color", "#666");
			}
			if (message.length == 0) {
				var error = true;
				$('#message').css("border-color", "#D8000C");
			} else {
				$('#message').css("border-color", "#666");
			}

			//now when the validation is done we check if the error variable is false (no errors)
			if (error == false) {
				//disable the submit button to avoid spamming
				//and change the button text to Sending...
				$('#contact-submit').attr({
					'disabled': 'false',
					'value': 'Sending...'
				});

				/* using the jquery's post(ajax) function and a lifesaver
				function serialize() which gets all the data from the form
				we submit it to send_email.php */
				$.post("sendmail.php", $("#contact-form").serialize(), function (result) {
					//and after the ajax request ends we check the text returned
					if (result == 'sent') {
						//if the mail is sent remove the submit paragraph
						$('#cf-submit').remove();
						//and show the mail success div with fadeIn
						$('#mail-success').fadeIn(500);
					} else {
						//show the mail failed div
						$('#mail-fail').fadeIn(500);
						//re enable the submit button by removing attribute disabled and change the text back to Send The Message
						$('#contact-submit').removeAttr('disabled').attr('value', 'Send The Message');
					}
				});
			}
		});


	})(jQuery);



	window.marker = null;

	function initialize() {
		var map;

		var latitude = $('#map').data('lat');
		var longitude = $('#map').data('long');
		var nottingham = new google.maps.LatLng(latitude, longitude);

		var style = [{
			"stylers": [{
				"hue": "#ff61a6"
			}, {
				"visibility": "on"
			}, {
				"invert_lightness": true
			}, {
				"saturation": 40
			}, {
				"lightness": 10
			}]
		}];

		var mapOptions = {
			// SET THE CENTER
			center: nottingham,

			// SET THE MAP STYLE & ZOOM LEVEL
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 9,

			// SET THE BACKGROUND COLOUR
			backgroundColor: "#000",

			// REMOVE ALL THE CONTROLS EXCEPT ZOOM
			zoom: 17,
			panControl: false,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE
			}

		}
		map = new google.maps.Map(document.getElementById('map'), mapOptions);

		// SET THE MAP TYPE
		var mapType = new google.maps.StyledMapType(style, {
			name: "Grayscale"
		});
		map.mapTypes.set('grey', mapType);
		map.setMapTypeId('grey');

		//CREATE A CUSTOM PIN ICON
		var marker_image = $('#map').data('marker');
		var pinIcon = new google.maps.MarkerImage(marker_image, null, null, null, new google.maps.Size(25, 33));

		marker = new google.maps.Marker({
			position: nottingham,
			map: map,
			icon: pinIcon,
			title: 'navigator'
		});
	}

	var map = $('#map');
	if (map.length != 0) {
		google.maps.event.addDomListener(window, 'load', initialize);
	}