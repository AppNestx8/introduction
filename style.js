(function () {
  function updateClosestCard() {
    var cards = document.querySelectorAll('.card');
    if (!cards.length) return;
    var vh = window.innerHeight;
    var centerY = vh / 2;
    var zoneTop = vh * 0.25;
    var zoneBottom = vh * 0.75;
    var closest = null;
    var closestDist = Infinity;
    for (var i = 0; i < cards.length; i++) {
      var rect = cards[i].getBoundingClientRect();
      var cardCenterY = rect.top + rect.height / 2;
      if (cardCenterY >= zoneTop && cardCenterY <= zoneBottom) {
        var dist = Math.abs(cardCenterY - centerY);
        if (dist < closestDist) {
          closestDist = dist;
          closest = cards[i];
        }
      }
    }
    var rowTop = closest ? closest.getBoundingClientRect().top : null;
    var rowTolerance = 40;
    cards.forEach(function (card) {
      var inSameRow = rowTop !== null &&
        Math.abs(card.getBoundingClientRect().top - rowTop) <= rowTolerance;
      card.classList.toggle('is-center', inSameRow);
    });
  }

  var ticking = false;
  function onScrollOrResize() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateClosestCard();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);
  updateClosestCard();
})();
