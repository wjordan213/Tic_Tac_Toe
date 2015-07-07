(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }


  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.currentPlayer = "x";
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.togglePlayer = function() {
    this.currentPlayer = (this.currentPlayer === "x") ? "o" : "x";
  };

  View.prototype.bindEvents = function () {
    this.$el.on("click", ".pos", function(event) {
      this.makeMove($(event.currentTarget));
    }.bind(this));
  };

  View.prototype.makeMove = function ($square) {
    if ($square.hasClass("marked")) {
      alert("Please try another square ;)");
      return;
    }

    var pos = [$square.data("row"), $square.data("col")];

    if (this.currentPlayer === "x"){
      $square.toggleClass("marked with-x");
    } else {
      $square.toggleClass("marked with-o");
    }

    this.game.board.placeMark(pos, this.currentPlayer);
    this.game.board.print();

    if (this.game.isOver()) {
      this.game.board.print();
      if (this.game.winner()) {
        alert(this.game.winner() + " has won!");
        $(".grid").remove();
        this.setupBoard();
        this.game = new Games.Game();
      } else {
        alert.log("NO ONE WINS!");
      }

    }
    this.togglePlayer();
    // if current player is x, mark x, elsse O

  };
  // <li class="active X"

  View.prototype.setupBoard = function () {
    this.$el.append('<ul class="grid"></ul>');

    var x = "";
    var $ul = this.$el.find("ul");
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        $("<li>")
          .addClass("pos")
          .attr("data-row", row)
          .attr("data-col", col)
          .appendTo($ul);
      }
    }
  };
})();
