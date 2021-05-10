"use strict";

$(document).ready(function () {
  /* Slick silder https://kenwheeler.github.io/slick/ */
  $("#newsSlider").slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    variableWidth: true
  });
  $("#myUl").endlessRiver();
  $("#myUl2").endlessRiver();
  $("#myUl3").endlessRiver();
  /* Modal
  ============================*/

  $("[data-modal]").on("click", function (event) {
    event.preventDefault();
    var modal = $(this).data("modal");
    $("body").addClass("no-scroll");
    $(modal).addClass("show");
  });
  $("[data-modal-close]").on("click", function (event) {
    event.preventDefault();
    var modal = $(this).parents(".modal");
    modal.removeClass("show");
    $("body").removeClass("no-scroll");
  });
});