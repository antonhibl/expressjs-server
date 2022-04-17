var game_matrix;
var refreshIntervalID;

function start() {
  refreshIntervalID = setInterval(iterate, 150);
}

function pause() {
  clearInterval(refreshIntervalID);
}

function generate_board() {
  // grab gameboard table
  var gameboard = document.getElementById("gameboard");
  game_matrix = Array(21);

  // generate table rows
  for (var x = 0; x < 22; x++) {
    game_matrix[x] = Array(21);

    // create new table row element
    var new_row = document.createElement("tr");
    // give the row an id #
    new_row.id = `${x}`;
    // insert into the gameboard
    gameboard.appendChild(new_row);
    // grab the row we just inserted
    var table_row = document.getElementById(`${x}`);

    // generate columns in row
    for (var y = 0; y < 22; y++) {
      // create new cell element
      var new_cell = document.createElement("td");
      // give the cell an id #
      new_cell.id = `${x}-${y}`;

      // insert class
      var data = Math.round(Math.random() % 2);
      game_matrix[x][y] = data;

      if (data === 1) {
        new_cell.className = "on";
      } else {
        new_cell.className = "off";
      }

      new_cell.addEventListener("click", toggle_state);

      // insert cell into the row
      table_row.appendChild(new_cell);
    }
  }
}

function neighbors(game_matrix, row, col) {
  // Return number of live neighbors

  let count = 0;

  for (let i = -1; i < 2; i++) {
    //This checks the row above and row below
    if (col + i >= 0 && col + i < 22 - 1) {
      // Check for valid column
      if (row > 0 && game_matrix[row - 1][col + i] == 1) {
        count++;
      }
      if (row < 22 - 1 && game_matrix[row + 1][col + i] == 1) {
        count++;
      }
    }
  }

  if (col - 1 >= 0 && game_matrix[row][col - 1] == 1) {
    // Check left cell
    count++;
  }
  if (col + 1 < 22 - 1 && game_matrix[row][col + 1] == 1) {
    // Check right cell
    count++;
  }

  return count;
}

function clear_board() {
  for (var x = 0; x < 22; x++) {
    for (var y = 0; y < 22; y++) {
      game_matrix[x][y] = 0;
    }
  }
  cloneboard = JSON.parse(JSON.stringify(game_matrix));
  update_screen(game_matrix);
}

var cloneboard;

function update_screen(game_matrix) {
  for (var x = 0; x < 22; x++) {
    for (var y = 0; y < 22; y++) {
      if (game_matrix[x][y] === 1) {
        var cell = document.getElementById(`${x}-${y}`);
        if (cell.className != "on") {
          cell.click();
        }
      } else {
        cell = document.getElementById(`${x}-${y}`);
        if (cell.className != "off") {
          cell.click();
        }
      }
    }
  }
}

function toggle_state() {
  // parse row and columns from id string
  var row = Number(this.id.split("-")[0]);
  var col = Number(this.id.split("-")[1]);

  if (this.className === "off") {
    this.className = "on";
    game_matrix[row][col] = 1;
  } else if (this.className === "on") {
    this.className = "off";
    game_matrix[row][col] = 0;
  }
}

var past_board = [];

function iterate() {
  cloneboard = JSON.parse(JSON.stringify(game_matrix));
  past_board.push(JSON.parse(JSON.stringify(game_matrix)));

  for (var x = 0; x < 22; x++) {
    for (var y = 0; y < 22; y++) {
      var neighbs = neighbors(game_matrix, x, y);
      var cell = document.getElementById(`${x}-${y}`);
      if (game_matrix[x][y] == 1 && neighbs < 2) {
        cell.className = "off";
        cloneboard[x][y] = 0;
      }
      if (game_matrix[x][y] == 1 && neighbs >= 4) {
        cell.className = "off";
        cloneboard[x][y] = 0;
      }
      if (game_matrix[x][y] == 0 && neighbs == 3) {
        cell.className = "on";
        cloneboard[x][y] = 1;
      }
    }
  }
  game_matrix = JSON.parse(JSON.stringify(cloneboard));

  update_screen(game_matrix);
}

function backtrack() {
  game_matrix = JSON.parse(JSON.stringify(past_board.pop()));
  update_screen(game_matrix);
}
