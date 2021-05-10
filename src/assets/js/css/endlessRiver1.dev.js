"use strict";

jQuery.fn.endlessRiver1 = function (settings) {
  settings = jQuery.extend({
    speed: 100,
    pause: true,
    buttons: false
  }, settings);
  return this.each(function () {
    var j = jQuery;
    var $line = j(this);
    var id = "ER_" + new Date().getTime();
    $line.wrap('<div id="' + id + '"></div>');
    $line.css({
      margin: "0 !important",
      padding: "0 !important"
    });
    var currentSpazio, currentTempo;
    var run = true;
    var initialOffset = $line.offset().left;
    var lineWidth = 1;
    $line.children("li.tick-clones").remove(); //elimina cloni se ci sono - Serve in caso io aggiorni dinamicamente il contenuto

    $line.addClass("newsticker");
    var $mask = $line.wrap("<div class='mask'></div>");
    var $tickercontainer = $line.parent().wrap("<div class='tickercontainer'></div>");
    var elements = $line.children("li");

    var fill = function fill() {
      lineWidth = 1;
      $line.append(elements.clone(true).addClass("tick-clones"));
      $line.children("li").each(function (i) {
        lineWidth += j(this, i).outerWidth(true); //outherWidth con argomento true ritorna larghezza compresi margini
      });
    };

    var l = $tickercontainer.outerWidth(true);

    while (lineWidth < l) {
      fill();
    }

    $line.width(lineWidth);
    $line.height($line.parent().height());

    function scrollnews(spazio, tempo) {
      $line.animate({
        left: "-=" + spazio
      }, tempo, "linear", function () {
        $line.children("li:first").appendTo($line);
        $line.css("left", 0);
        currentSpazio = $line.children("li:first").outerWidth(true);
        currentTempo = tempo / spazio * currentSpazio;
        if (run) scrollnews(currentSpazio, currentTempo);
      });
    } //BOOT


    currentSpazio = $line.children("li:first").outerWidth(true);
    currentTempo = currentSpazio / settings.speed * 1000; //x 1000 perch� tempo � in millisecondi

    scrollnews(currentSpazio, currentTempo);

    function setHover() {
      $line.hover(pause, resume);
    }

    function pause() {
      run = false;
      $line.stop();
    }

    function resume() {
      run = true;
      var offset = $line.offset().left;
      var residualSpace = offset + $line.children("li:first").outerWidth(true) - initialOffset;
      var residualTime = currentTempo / currentSpazio * residualSpace;
      scrollnews(residualSpace, residualTime);
    }

    if (settings.pause) setHover();
  });
};