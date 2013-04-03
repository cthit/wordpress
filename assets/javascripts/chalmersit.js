/*
	Javascript functions for Chalmers.it

-------------------------------------------- */

var Chalmers = (function(it) {
	var root = it || {};


	root.linkify = function(text) {
		if (text) {
			text = text.replace(
				/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
				function(url){
					var full_url = url;
					if (!full_url.match('^https?:\/\/')) {
						full_url = 'http://' + full_url;
					}

					return '<a href="' + full_url + '">' + url + '</a>';
				});
		    }

		    return text;
	};

	return root;

})(window.Chalmers);

/**
*	Quick and dirty jQuery animation helper plugin
*
*	Usage:
*	$("#element").jb_animate("<animation name>")
*
*	The single parameter, animation name, should be defined
*	as a CSS class. The class is applied to the element. The class
*	should include a CSS animation. Example:
*
*	.shake {
*		-webkit-animation: shake 1s ease-out;
* 	}
*/
(function($){
	$.fn.jb_animate = function(animation) {
		return this.each(function() {
			$(this).addClass(animation)
			.on("webkitAnimationEnd animationend", function() {
				$(this).removeClass(animation);
			})
		});
	};
})(jQuery);


/*
	Simple jQuery tabs plugin
*/
(function($){

	$.fn.tabs = function(options){
		if(options.tabContainer === undefined){
			return false;
		}

		var nav = $(this),
			settings = {
				activeClass: "current",
				useHash: true,
				hashPrefix: "tab-",
				el: "a"
			};

		settings = $.extend({}, settings, options);

		return this.each(function(){
			var $tabContainers = $(settings.tabContainer),
				hash = location.hash && ("#"+ settings.hashPrefix + location.hash.replace("#","")),
				which = (settings.useHash && hash) || ":first";

			$tabContainers.hide().filter(which).show();

			$(this).find(settings.el).on("click", function(evt){
				evt.preventDefault();
				var tab = $tabContainers.filter(this.hash);

				$tabContainers.hide();
				tab.show();

				nav.find(settings.el).removeClass(settings.activeClass);
				$(this).addClass(settings.activeClass);
				location.hash = tab.attr("id").replace(settings.hashPrefix, "");

			});

			if(which == ":first")
				$(this).find(settings.el).filter(which).click();
			else
				$(this).find(settings.el).filter('[href="'+which+'"]').click();

		});
	};

})(jQuery);


/*
	Load more posts dynamically from frontpage
*/
(function($){
	$.loadMorePosts = function(container) {

		var $container = $(container),
			pageNum = pageOptions.startPage + 1,
			max = pageOptions.maxPages,
			nextLink = pageOptions.nextLink;

		$container.find("footer").remove();

		if(pageNum <= max) {
			$container
				.append('<div class="post-placeholder-'+ pageNum +'"></div>')
				.append('<footer><a href="#" class="btn wide">Fler nyheter</a></footer>');
		}

		$(".news footer a").on("click", function(evt) {
			evt.preventDefault();
			var $button = $(this);

			if(pageNum <= max) {
				$button.text("Laddar ...");

				$(".post-placeholder-"+pageNum).load(nextLink + " [role='article']", function() {
					pageNum++;
					nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/'+ pageNum);

					$('.news > footer').before('<div class="post-placeholder-'+ pageNum +'"></div>');

					if(pageNum <= max) {
						$button.text("Fler nyheter");
					}
					else {
						$button.text("Inga fler nyheter finns").attr("disabled", true);
					}

				});
			}
		});

	};
})(jQuery);

$(function() {

	/* Front page functions */

	// Shake the login form when clicking the 'Log in' button
	$(".home #login-btn").on("click", function(evt) {
		evt.preventDefault();
		$(".user-area form")
			.jb_animate("shake")
			.find("input[type='text']:first")
			.focus();
	});


	// Create modal for the avatar upload on Profile page
	$("#user-avatar-link").on("click", function(evt){
		evt.preventDefault();
		var iframe = $("<iframe />", {
			src: this.href,
			scrolling: "no",
			id: "avatar-iframe",
			frameborder: "no",
			allowTransparency: "true"
		});

		$("#avatar-modal").append(iframe).modal("show");
	});

	// Wipe avatar modal on hide
	$("#avatar-modal").on("hidden", function() {
		$(this).find("iframe").remove();
	});

	$("#avatar-iframe").contents().find("#user-avatar-step3-close")
	.removeAttr("onclick")
	.live("click", function(evt) {
		evt.preventDefault();
		$("#avatar-modal").hide();
	});

	// Set up smooth scrolling links
	$(".smooth").smoothScroll({
		offset: -100
	});

	$(".comment-action").smoothScroll({
		afterScroll: function() {
			$("#comment").focus();
		}
	});

	// Setup the main navigation toggle when on smaller screens
	$("#main-nav-toggle").on("click", function(evt) {
		$(".inner-bar").slideToggle(200);
	});

	// Show comment controls on comment textarea focus
	$("#comment")
	.on("focus", function(evt){
		$(this).next(".comment-submit").show().find("#submit").attr("disabled", true);
	})
	.on("input", function(evt) {
		var text = $(this).val(),
			$submit = $(this).next(".comment-submit").find("#submit");

		$submit.attr("disabled", (text === ""));
	});

	// Auto growing textareas
	$(".autosize").autosize({append: "\n\n\n"});

	$.fn.tipsy.elementOptions = function(ele, options) {
	  return $.extend({}, options, {
			gravity: $(ele).data('tooltip-gravity') || 's',
			offset: parseInt($(ele).data('tooltip-offset')) || 0
		});
	};

	// Add support for touch devices for the 'Tools' main nav menu
	if("ontouchstart" in document) {
		$("#tools-menu-trigger").on("touchstart", function(evt) {
			var dropdown = $(this).next(".dropdown-sub");
			if(dropdown.hasClass("open")) {
				dropdown.removeClass("open").slideUp(100);
			}
			else {
				dropdown.addClass("open").slideDown(200);
			}
		});
	}

	// Tooltips
	$('[rel="tooltip"]').tipsy({
		gravity: 's',
		offset: 5
	});

	// Borders on images in posts
	$("article .article-content img:not(.avatar)").each(function() {
		if($(this).parent().is("figure")) {
			$(this).parent().addClass("subtle-border");
		}
	});

	// Set up tabs
	$(".tabs").tabs({
		tabContainer: ".tab-container > div",
		activeClass: "tab-current"
	});


	// Show Twitter timeline on frontpage

	$.getJSON("https://api.twitter.com/1/statuses/user_timeline/chalmersit.json?callback=?", function(json, status, xhr) {
		var $list = $("<ul />", {
			"class": "list"
		});

		if(json != null) {
			$.each(json, function() {
				var date = new Date(this.created_at),
					text = "<p>" + Chalmers.linkify(this.text) + "</p><time>"+ date.toDateString() +"</time>";

				var element = $("<li />", {
					"html": text
				});

				$list.append(element);
			});

			$("#tweet-list").append($list);
		}
		else {
			$list.html("<li>Kunde inte hämta tweets från Twitter</li>")
		}
	});

});
