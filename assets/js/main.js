(function () {
	"use strict";

	var navbar = document.getElementById("navbar");
	var navToggle = document.getElementById("navToggle");
	var navMenu = document.getElementById("navMenu");
	var navLinks = navMenu.querySelectorAll("a");

	// Mobile nav toggle
	navToggle.addEventListener("click", function () {
		var open = navMenu.classList.toggle("open");
		navToggle.setAttribute("aria-expanded", open);
		navbar.classList.toggle("menu-open", open);
	});

	navLinks.forEach(function (link) {
		link.addEventListener("click", function () {
			navMenu.classList.remove("open");
			navbar.classList.remove("menu-open");
			navToggle.setAttribute("aria-expanded", "false");
		});
	});

	// Navbar background on scroll
	function onScroll() {
		navbar.classList.toggle("scrolled", window.scrollY > 40);
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	// Scroll-spy: highlight the nav link of the section in view
	var sections = ["projects", "about", "contact"]
		.map(function (id) { return document.getElementById(id); })
		.filter(Boolean);

	var spy = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				navLinks.forEach(function (link) {
					link.classList.toggle(
						"active",
						link.getAttribute("href") === "#" + entry.target.id
					);
				});
			});
		},
		{ rootMargin: "-40% 0px -55% 0px" }
	);
	sections.forEach(function (section) { spy.observe(section); });

	// Scroll-reveal animations
	var reveals = document.querySelectorAll(".reveal");
	var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (reducedMotion || !("IntersectionObserver" in window)) {
		reveals.forEach(function (el) { el.classList.add("visible"); });
	} else {
		var revealer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					entry.target.classList.add("visible");
					revealer.unobserve(entry.target);
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
		);
		reveals.forEach(function (el) { revealer.observe(el); });
	}
})();
