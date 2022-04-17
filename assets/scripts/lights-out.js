/* eslint-disable @typescript-eslint/no-var-requires */
const { table } = require("console");
const { createElementAccess } = require("typescript");

var moves;

// function to generate table
function generate_empty_table() {
  // grab gameboard table
  var gameboard = document.getElementById("gameboard");

  // generate table rows
  for (var x = 0; x < 5; x++) {
    // create new table row element
    var new_row = document.createElement("tr");
    // give the row an id #
    new_row.id = `${x}`;
    // insert into the gameboard
    gameboard.appendChild(new_row);
    // grab the row we just inserted
    var table_row = document.getElementById(`${x}`);

    // generate columns in row
    for (var y = 0; y < 5; y++) {
      // create new cell element
      var new_cell = document.createElement("td");
      // give the cell an id #
      new_cell.id = `${x}-${y}`;

      // insert class
      new_cell.className = "off";

      moves = 0;

      new_cell.addEventListener("click", cell_click);

      // insert cell into the row
      table_row.appendChild(new_cell);
    }
  }

  for (x = 0; x < 5; x++) {
    for (y = 0; y < 5; y++) {
      // generate a random state for the board via random bools
      var data = Math.round(Math.random() % 2);

      if (data === 1) {
        var cello = document.getElementById(`${x}-${y}`);

        cello.click();
        moves = 0;
      }
    }
  }
}

function reset_board() {
  for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5; y++) {
      var cell = document.getElementById(`${x}-${y}`);
      var data = Math.round(Math.random() % 2);
      if (data === 1) {
        cell.click();
      }
    }
  }
  moves = 0;
}

function check_element(element) {
  if (element) {
    if (element.className === "on") {
      element.className = "off";
    } else if (element.className === "off") {
      element.className = "on";
    }
  }
}

function affect_neighbors(row, col) {
  var five = document.getElementById(`${row}-${col}`);
  var elements = [five];

  var negrow = row - 1;
  if (negrow === -1) {
    negrow = row;
  } else {
    var two = document.getElementById(`${negrow}-${col}`);
    elements = elements.concat(two);
  }

  var posrow = row + 1;
  if (posrow === 6) {
    posrow = row;
  } else {
    var eight = document.getElementById(`${posrow}-${col}`);
    elements = elements.concat(eight);
  }

  var negcol = col - 1;
  if (negcol === -1) {
    negcol = col;
  } else {
    var four = document.getElementById(`${row}-${negcol}`);
    elements = elements.concat(four);
  }

  var poscol = col + 1;
  if (poscol === 6) {
    poscol = col;
  } else {
    var six = document.getElementById(`${row}-${poscol}`);
    elements = elements.concat(six);
  }

  elements.forEach(check_element);
}

function check_board() {
  moves = moves + 1;

  // set win flag to true by default
  var win = false;

  // grab all on cells
  var lights = document.getElementsByClassName("on");

  // if no on cells
  if (lights.length === 0) {
    // set win flag
    win = true;
  }

  // check win flag
  if (win) {
    // alert the player
    alert(`You won in ${moves} moves!`);
  }
}

// function to handle clicks on table cells
function cell_click() {
  // parse row and columns from id string
  var row = Number(this.id.split("-")[0]);
  var col = Number(this.id.split("-")[1]);

  affect_neighbors(row, col);
  check_board();
}
