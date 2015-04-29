(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.el = $el;
    this.currentPlayer = "X";
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.togglePlayer = function() {
    this.currentPlayer = (this.currentPlayer === "X") ? "O" : "X";
  };

  View.prototype.bindEvents = function () {
    console.log(this)
    this.el.on("click", ".pos", function(event) {
      console.log(event.currentTarget);
      this.makeMove($(event.currentTarget));
    }.bind(this));
  };

  View.prototype.makeMove = function ($square) {
    console.log($square);
    if ($square.hasClass("marked")) {
      alert("Please try another square ;)");
      return;
    }
    if (this.currentPlayer === "X"){
      $square.toggleClass("marked with-x");
    } else {
      $square.toggleClass("marked with-o");
    }
    this.togglePlayer();
    // if current player is x, mark x, elsse O

  };
  // <li class="active X"

  View.prototype.setupBoard = function () {
    this.el.append('<ul class="grid"></ul>');


    var listEl = '<li class="pos"></li>';
    var x = "";

    for (var i = 0; i < 9; i++) { x += listEl; }

    var $pos = $(x);

    this.el.find(".grid").append($pos);
  };
})();
