/* ============================================================
   THE SECRET NEXT DOOR — Website Script
   Two simple jobs:
   1. Open and close the menu on phones.
   2. Highlight the nav link of the section you are reading.
   All comments are in simple English.
   ============================================================ */

// Wait until the page is fully loaded before we touch it.
document.addEventListener("DOMContentLoaded", function () {

    /* ---- 1. Mobile menu (hamburger button) ---- */
    var menuButton = document.querySelector(".menu-toggle");
    var navLinks = document.querySelector(".nav-links");

    // When we click the button, show or hide the menu.
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });

    // When we click a link, close the menu again (good for phones).
    var links = document.querySelectorAll(".nav-links a");
    links.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
        });
    });

    /* ---- 2. Highlight the active section in the navbar ---- */
    // This only works on a one-page layout (links that start with "#").
    // On a separate page (like the Design Brief), the links go to
    // "index.html#...", so we skip this and keep the manual active link.
    var hasInPageLinks = Array.prototype.some.call(links, function (link) {
        return link.getAttribute("href").charAt(0) === "#";
    });
    if (!hasInPageLinks) {
        return;
    }

    var sections = document.querySelectorAll("section[id], header[id]");

    // This runs every time the user scrolls the page.
    function setActiveLink() {
        var current = "";

        // Find which section is near the top of the screen.
        sections.forEach(function (section) {
            var top = section.offsetTop - 120;  // small offset for the navbar
            if (window.scrollY >= top) {
                current = section.getAttribute("id");
            }
        });

        // Add the "active" class only to the matching link.
        links.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink(); // run once at the start
});
