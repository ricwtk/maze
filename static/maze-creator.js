let vm = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    maze: {
      n_row: 6,
      n_col: 7,
      borders: {
        bottom: [ [1,1], [4,1], [3,2], [5,2], [2,3], [0,4], [2,4], [5,4], [6,4], [2,5], [3,5], [5,5] ],
        right: [ [2,0], [0,1], [2,1], [5,1], [3,2], [5,2], [0,3], [1,3], [2,3], [3,3], [4,3], [3,5], [4,5], [5,5] ]
      },
      entrance: [0,3],
      exits: [[4,5], [6,5]]
    },
    m_unit: 100,
    selected: {
      coord: [0,0],
      borders: {
        left: false,
        bottom: false,
        right: false,
        top: false
      },
      type: "normal"
    },
    save_or_load: false,
    dialog: {
      save: false,
      load: false,
      available_mazes: [],
      name_to_save_or_load: "",
      loading_list: false,
      loading_or_saving: false
    },
    name_of_maze: "&lt;Unnamed&gt;",
    maze_name_re: /^[a-zA-Z0-9()_.@-]*$/,
    save_confirmation: false,
  },
  computed: {
    maze_view_box: function () {
      return `0 0 ${(this.maze.n_col+2)*this.m_unit} ${(this.maze.n_row+2)*this.m_unit}`;
    },
    has_entrance: function () {
      return this.maze.entrance.length > 0 
        && this.maze.entrance[0] > -1 
        && this.maze.entrance[0] < this.maze.n_col 
        && this.maze.entrance[1] > -1 
        && this.maze.entrance[1] < this.maze.n_row;
    },
    has_exits: function () {
      return this.maze.exits.filter(exit => exit[0] > -1 && exit[0] < this.maze.n_col && exit[1] > -1 && exit[1] < this.maze.n_row).length > 0;
    }
  },
  watch: {
    save_or_load: function (val) {
      if (val) {
        this.dialog.loading_list = true;
        this.request_maze_list()
          .then(r => {
            this.dialog.available_mazes = r;
            this.dialog.loading_list = false;
          })
      } else {
        this.dialog.name_to_save_or_load = "";
      }
    }
  },
  methods: {
    get_arr_str: function (arr) { return arr.map(v => JSON.stringify(v)); },
    get_y_top: function (r) { return ( this.maze.n_row - r ) * this.m_unit; },
    get_y_bot: function (r) { return ( this.maze.n_row - r ) * this.m_unit + (this.m_unit - 1); },
    get_x_left: function (c) { return ( c + 1 ) * this.m_unit; },
    get_x_right: function (c) { return ( c + 1 ) * this.m_unit + (this.m_unit - 1); },
    check_row: function (value) { 
      if (value < 1) { this.maze.n_row = 1; }
      if (this.selected.coord[1] >= this.maze.n_row) { this.select_cell(this.selected.coord[0],this.maze.n_row-1); }
      return true; 
    },
    check_col: function (value) { 
      if (value < 1) { this.maze.n_col = 1; }
      if (this.selected.coord[0] >= this.maze.n_col) { this.select_cell(this.maze.n_col-1,this.selected.coord[1]); }
      return true; 
    },
    select_cell: function (c,r) { 
      this.selected.coord = [c,r]; 
      this.selected.borders.left = this.get_arr_str(this.maze.borders.right).includes(JSON.stringify([c-1,r]));
      this.selected.borders.bottom = this.get_arr_str(this.maze.borders.bottom).includes(JSON.stringify([c,r]));
      this.selected.borders.right = this.get_arr_str(this.maze.borders.right).includes(JSON.stringify([c,r]));
      this.selected.borders.top = this.get_arr_str(this.maze.borders.bottom).includes(JSON.stringify([c,r+1]));
      this.selected.type = JSON.stringify(this.maze.entrance) == JSON.stringify([c,r]) ? "entrance" : "";
      this.selected.type = this.get_arr_str(this.maze.exits).includes(JSON.stringify([c,r])) ? "exit" : this.selected.type;
      this.selected.type = this.selected.type == "" ? "normal" : this.selected.type;
    },
    change_type: function (new_type) {
      let remove = {
        entrance: false,
        exit: false
      };
      if (new_type == "entrance") {
        this.maze.entrance = this.selected.coord;
        remove.exit = true;
      } else if (new_type == "exit") {
        if (!this.get_arr_str(this.maze.exits).includes(JSON.stringify(this.selected.coord))) {
          this.maze.exits.push(this.selected.coord);
        }
        remove.entrance = true;
      } else {
        remove.entrance = true;
        remove.exit = true;
      }

      if (remove.entrance) { if (JSON.stringify(this.maze.entrance) == JSON.stringify(this.selected.coord)) { this.maze.entrance = []; } }
      if (remove.exit) {
        if (this.get_arr_str(this.maze.exits).includes(JSON.stringify(this.selected.coord))) {
          this.maze.exits.splice(this.get_arr_str(this.maze.exits).indexOf(JSON.stringify(this.selected.coord)),1);
        }
      }
    },
    change_left: function (left) {
      let cell_left = [this.selected.coord[0]-1, this.selected.coord[1]];
      if (left) { this.maze.borders.right.push(cell_left); }
      else { this.maze.borders.right.splice(this.get_arr_str(this.maze.borders.right).indexOf(JSON.stringify(cell_left)),1); }
    },
    change_bottom: function (bottom) {
      if (bottom) { this.maze.borders.bottom.push(this.selected.coord); }
      else { this.maze.borders.bottom.splice(this.get_arr_str(this.maze.borders.bottom).indexOf(JSON.stringify(this.selected.coord)),1); }
    },
    change_right: function (right) {
      if (right) { this.maze.borders.right.push(this.selected.coord); }
      else { this.maze.borders.right.splice(this.get_arr_str(this.maze.borders.right).indexOf(JSON.stringify(this.selected.coord)),1); }
    },
    change_top: function (top) {
      let cell_above = [this.selected.coord[0], this.selected.coord[1]+1];
      if (top) { this.maze.borders.bottom.push(cell_above); }
      else { this.maze.borders.bottom.splice(this.get_arr_str(this.maze.borders.bottom).indexOf(JSON.stringify(cell_above)),1); }
    },
    open_load: function () {
      this.save_or_load = true;
      this.dialog.load = true;
      this.dialog.save = false;
    },
    open_save: function () {
      this.save_or_load = true;
      this.dialog.save = true;
      this.dialog.load = false;
    },
    cancel_dialog: function () {
      this.save_or_load = false;
    },
    request_maze_list: function () {
      const request = new Request("./get-maze-list");
      return fetch(request)
        .then(r => r.json());
    },
    choose_maze: function (maze) {
      if (!this.dialog.loading_or_saving && !this.dialog.loading_list) {
        this.dialog.name_to_save_or_load = maze;
      }
    },
    load_maze: function () {
      if (this.dialog.name_to_save_or_load !== "") {
        this.dialog.loading_or_saving = true;
        const request = new Request(`./get-maze/${this.dialog.name_to_save_or_load}`);
        return fetch(request)
          .then(r => r.json())
          .then(r => {
            this.name_of_maze = this.dialog.name_to_save_or_load;
            this.maze.n_row = r.n_row;
            this.maze.n_col = r.n_col;
            this.maze.borders.bottom = r.borders.bottom;
            this.maze.borders.right = r.borders.right;
            this.maze.entrance = r.entrance;
            this.maze.exits = r.exits;
          })
          .then(() => this.maze_loaded());
      }
    },
    maze_loaded: function () {
      this.dialog.loading_or_saving = false;
      this.save_or_load = false;
    },
    validate_maze_name: function (value) {
      return this.maze_name_re.test(value) || "Only a-z A-Z 0-9 - _ . @ ( ) are allowed";
    },
    save_maze: function () {
      if (this.dialog.name_to_save_or_load !== "") {
        this.dialog.loading_or_saving = true;
        if (this.dialog.available_mazes.includes(this.dialog.name_to_save_or_load)) {
          this.save_confirmation = true;
        } else {
          this.post_to_save_maze();
        }
      }
    },
    post_to_save_maze: function () {
      this.maze.borders.bottom = this.maze.borders.bottom.filter(cell => cell[0] > -1 && cell[0] < this.maze.n_col && cell[1] > -1 && cell[1] < this.maze.n_row);
      this.maze.borders.right = this.maze.borders.right.filter(cell => cell[0] > -1 && cell[0] < this.maze.n_col && cell[1] > -1 && cell[1] < this.maze.n_row);
      this.maze.exits = this.maze.exits.filter(cell => cell[0] > -1 && cell[0] < this.maze.n_col && cell[1] > -1 && cell[1] < this.maze.n_row);
      this.maze.entrance = this.maze.entrance[0] > -1 && this.maze.entrance[0] < this.maze.n_col && this.maze.entrance[1] > -1 && this.maze.entrance[1] < this.maze.n_row ?  this.maze.entrance : [];
      
      const request = new Request(`./save-maze/?name=${this.dialog.name_to_save_or_load}`, 
        {
          method: "POST",
          body: JSON.stringify(this.maze)
        }
      );
      return fetch(request)
        .then(r => r.json())
        .then(r => console.log(r))
        .then(() => this.maze_saved());
    },
    accept_replacement: function () {
      this.save_confirmation = false;
      return this.post_to_save_maze();
    },
    deny_replacement: function () {
      this.save_confirmation = false;
      this.dialog.loading_or_saving = false;
    },
    maze_saved: function () {
      this.dialog.loading_or_saving = false;
      this.save_or_load = false;
    },
    clear_borders: function () {
      this.change_top(false);
      this.change_bottom(false);
      this.change_left(false);
      this.change_right(false);
      this.select_cell(this.selected.coord[0], this.selected.coord[1]);
    },
    clear_all_borders: function () {
      this.maze.borders.bottom = [[]];
      this.maze.borders.right = [[]];
      this.select_cell(this.selected.coord[0], this.selected.coord[1]);
    }
  }
});