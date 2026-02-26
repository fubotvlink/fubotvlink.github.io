/*  StreamActivate Guide — Minimal Vanilla JS
    Handles: Mobile nav toggle, FAQ accordion, Back-to-top  */

(function () {
    "use strict";

    /* --- Mobile Navigation Toggle --- */
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("main-nav");

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", open);
            toggle.innerHTML = open ? "&#10005;" : "&#9776;";
        });

        /* Close nav on link click (mobile) */
        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.innerHTML = "&#9776;";
            });
        });
    }

    /* --- FAQ Accordion --- */
    document.querySelectorAll(".faq-question").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var expanded = this.getAttribute("aria-expanded") === "true";
            var answer = document.getElementById(
                this.getAttribute("aria-controls")
            );

            /* Close all others in same group */
            var parent = this.closest(".faq-group, .page-wrap, main");
            if (parent) {
                parent.querySelectorAll(".faq-question").forEach(function (b) {
                    if (b !== btn) {
                        b.setAttribute("aria-expanded", "false");
                        var a = document.getElementById(
                            b.getAttribute("aria-controls")
                        );
                        if (a) a.style.maxHeight = null;
                    }
                });
            }

            if (expanded) {
                this.setAttribute("aria-expanded", "false");
                answer.style.maxHeight = null;
            } else {
                this.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* --- Back to Top --- */
    var btt = document.getElementById("backToTop");
    if (btt) {
        window.addEventListener(
            "scroll",
            function () {
                if (window.pageYOffset > 400) {
                    btt.classList.add("is-visible");
                } else {
                    btt.classList.remove("is-visible");
                }
            },
            { passive: true }
        );
    }
})();