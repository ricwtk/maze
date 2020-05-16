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
    load_interface: false,
    dialog: {
      maze: false,
      player: false,
      available_mazes: [],
      available_players: [],
      name_to_load: "",
      loading_list: false,
      loading: false
    },
    name_of_maze: "<default>",
    player: {
      name: "<player name>",
      icon: "mdi-account",
      group: "",
      members: [],
      position: [-1,-1]
    },
    player_socket: null,
    next_player_to_load: "",
    st_dialog: {
      show: false,
      loading: false,
      search_tree: null,
      prop: {
        node_height: 50,
        node_width: 50,
        link_height: 50,
        node_sep: 50 
      },
      tree_width: 100,
      tree_height: 100
    },
    continuous: false,
    log_enabler: true,
    logs: [],
    solution: {
      found: false,
      solution: []
    }
  },
  computed: {
    maze_view_box: function () {
      return `0 0 ${(this.maze.n_col+2)*this.m_unit} ${(this.maze.n_row+2)*this.m_unit}`;
    },
    search_tree_array: function () {
      let st_arr = [];
      if (this.st_dialog.search_tree) {
        st_arr.push([[this.st_dialog.search_tree.find(v => !v.parent)]]);
        while (!st_arr[st_arr.length - 1].every(arr => arr.every(v => v < 1))) {
          st_arr.push(
            st_arr[st_arr.length - 1].flat()
            .map(n => n < 1 ?
                [n - 1]
                : (n.children.length == 0 ? [0] : n.children.map(i => this.st_dialog.search_tree.find(v => v.id == i)))
            )
          );
        }
      }
      return st_arr;
    },
    search_tree_view_box: function () {
      let vb = "0 0 0 0";
      if (this.search_tree_array.length > 0) {
        let width = this.search_tree_array[this.search_tree_array.length - 1].length * this.st_dialog.prop.node_width
                    + (this.search_tree_array[this.search_tree_array.length - 1].length - 1) * this.st_dialog.prop.node_sep + 10;
        let height = (this.search_tree_array.length - 1)* this.st_dialog.prop.node_height
                    + (this.search_tree_array.length - 2) * this.st_dialog.prop.link_height;
        vb = `0 0 ${width} ${height}`;
      }
      return vb;
    },
    node_x: function () {
      let x = [];
      if (this.search_tree_array.length > 0) {
        x.push(this.search_tree_array[this.search_tree_array.length - 2].flat().map((node,n) => n * (this.st_dialog.prop.node_width + this.st_dialog.prop.node_sep) + 5));
        for ( let i = this.search_tree_array.length - 3; i > -1; i-- ) {
          x.push(
            this.search_tree_array[i].flat().map((node,n) => {
              let first_child_idx = this.search_tree_array[i+1].slice(0,n).reduce((acc,curr) => acc + curr.length, 0);
              let last_child_idx = first_child_idx + this.search_tree_array[i+1][n].length - 1;
              return (x[x.length - 1][first_child_idx] + x[x.length - 1][last_child_idx])/2;
            })
          );
        }
      }
      return x.reverse();
    },
    linkage: function () {
      let links = [];
      if (this.search_tree_array.length > 0) {
        for ( let i = this.search_tree_array.length - 2; i > 0; i-- ) {
          links.push(
            this.search_tree_array[i].flatMap((siblings,s) => {
              let parent = this.node_x[i-1][s];
              let parent_node = this.search_tree_array[i-1].flat()[s];
              return siblings.map((node,n) => {
                let node_idx = this.search_tree_array[i].slice(0,s).reduce((acc,curr) => acc + curr.length, 0) + n;
                return {
                  parent_loc: parent,
                  child_loc: this.node_x[i][node_idx],
                  label: parent_node.actions ? parent_node.actions[n] : ''
                }
              });
            })
          );
        }
      }
      return links.reverse();
    },
    player_coord: function () {
      let coord = this.player.position;
      if (coord[0] < 0 || coord[0] > this.maze.n_col - 1) { coord[0] = this.maze.entrance[0]; }
      if (coord[1] < 0 || coord[1] > this.maze.n_row - 1) { coord[1] = this.maze.entrance[1]; }
      return coord;
    },
    solution_path: function () {
      let path = "";
      if (this.solution.found) {
        path = `M ${this.get_x_center(this.solution.solution[0][0])} ${this.get_y_center(this.solution.solution[0][1])}`;
        path += this.solution.solution.slice(1).map(c => ` L ${this.get_x_center(c[0])} ${this.get_y_center(c[1])}`).join('');
      }
      return path;
    }
  },
  watch: {
    load_interface: function (val) {
      if (val) {
        this.dialog.loading_list = true;
        if (this.dialog.maze) {
          this.request_maze_list()
            .then(r => {
              this.dialog.available_mazes = r;
              this.dialog.loading_list = false;
            });
        } else {
          this.request_player_list()
            .then(r => {
              console.log(r);
              this.dialog.available_players = JSON.parse(JSON.stringify(r));
              this.dialog.loading_list = false;
              console.log(this.dialog.available_players);
            });
        }
      } else {
        this.dialog.name_to_load = "";
      }
    }
  },
  methods: {
    get_arr_str: function (arr) { return arr.map(v => JSON.stringify(v)); },
    get_y_top: function (r) { return ( this.maze.n_row - r ) * this.m_unit; },
    get_y_bot: function (r) { return ( this.maze.n_row - r ) * this.m_unit + (this.m_unit - 1); },
    get_y_center: function (r) { return ( this.maze.n_row - r ) * this.m_unit + .5 * this.m_unit; },
    get_x_left: function (c) { return ( c + 1 ) * this.m_unit; },
    get_x_right: function (c) { return ( c + 1 ) * this.m_unit + (this.m_unit - 1); },
    get_x_center: function (c) { return ( c + 1 ) * this.m_unit + .5 * this.m_unit; },
    get_states: function (coord) {
      let c = coord[0];
      let r = coord[1];
      let actions = "";
      actions += ((c == 0) || this.get_arr_str(this.maze.borders.right).includes(JSON.stringify([c-1,r])))                    ? "" : "w";
      actions += ((c == this.maze.n_col - 1) || this.get_arr_str(this.maze.borders.right).includes(JSON.stringify([c,r])))    ? "" : "e";
      actions += ((r == this.maze.n_row - 1) || this.get_arr_str(this.maze.borders.bottom).includes(JSON.stringify([c,r+1]))) ? "" : "n";
      actions += ((r == 0) || this.get_arr_str(this.maze.borders.bottom).includes(JSON.stringify([c,r])))                     ? "" : "s";
      return {
        position: coord,
        actions: actions,
        entrance: JSON.stringify(this.maze.entrance) == JSON.stringify([c,r]),
        exit: this.get_arr_str(this.maze.exits).includes(JSON.stringify([c,r]))
      };
    },
    open_maze_loading: function () {
      this.dialog.maze = true;
      this.dialog.player = false;
      this.load_interface = true;
    },
    open_player_loading: function () {
      this.dialog.maze = false;
      this.dialog.player = true;
      this.load_interface = true;
    },
    cancel_dialog: function () {
      this.load_interface = false;
    },
    request_maze_list: function () {
      const request = new Request("./get-maze-list");
      return fetch(request)
        .then(r => r.json());
    },
    choose_maze: function (maze) {
      if (!this.dialog.loading && !this.dialog.loading_list) {
        this.dialog.name_to_load = maze;
      }
    },
    load_maze: function () {
      if (this.dialog.name_to_load !== "") {
        this.dialog.loading = true;
        const request = new Request(`./get-maze/${this.dialog.name_to_load}`);
        return fetch(request)
          .then(r => r.json())
          .then(r => {
            this.name_of_maze = this.dialog.name_to_load;
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
      this.add_to_log({
        type: 'notification',
        text: `Maze ${this.dialog.name_to_load} is loaded`
      });
      this.dialog.loading = false;
      this.load_interface = false;
      this.solution.found = false;
      this.solution.solution = [];
      if (this.player_socket) {
        this.player_socket.close();
        this.next_player_to_load = this.player.name;
      }
    },
    request_player_list: function () {
      const request = new Request("./get-player-list");
      return fetch(request)
        .then(r => r.json());
    },
    choose_player: function (player) {
      if (!this.dialog.loading && !this.dialog.loading_list) {
        this.dialog.name_to_load = player.name;
      }
    },
    load_player: function () {
      if (this.dialog.name_to_load !== "") {
        this.dialog.loading = true;
        if (this.player_socket) {
          this.player_socket.close();
          this.next_player_to_load = this.dialog.name_to_load;
        } else {
          this.create_web_socket(this.dialog.name_to_load);
        }
      }
    },
    create_web_socket: function (player_name) {
      this.player_socket = new WebSocket(`ws://${location.host}/select-player/${player_name}`);
      this.player_socket.onopen = (event) => {
        console.log(event);
        event.target.send(JSON.stringify({
          purpose: "set_maze",
          data: {
            maze: { n_row: this.maze.n_row, n_col: this.maze.n_col },
            entrance: this.get_states(this.maze.entrance),
            exits: this.maze.exits.filter(exit => exit[0] > -1 && exit[0] < this.maze.n_col && exit[1] > -1 && exit[1] < this.maze.n_row)
          }
        }));
      };
      
      this.player_socket.onclose = (event) => {
        console.log("Web socket closed");
        this.player_socket = null;
        if (this.next_player_to_load) { 
          this.create_web_socket(this.next_player_to_load); 
          this.next_player_to_load = "";
        }
      };

      this.player_socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        console.log(data);
        if (data.error) {
          this.add_to_log({
            type: 'error',
            text: data.data
          });
        } else if (data.purpose == "initialised") {
          this.add_to_log({
            type: 'notification',
            text: `${data.data.name} is initialised`
          });
          this.player.name = data.data.name;
          this.player.icon = data.data.icon;
          this.player.group = data.data.group;
          this.player.members = data.data.members;
          this.player.position = [-1,-1];
          this.solution.found = false;
          this.solution.solution = []; 
          this.player_loaded();
        } else if (data.purpose == "notification") {
          this.add_to_log({
            type: 'notification',
            text: data.data
          });
        } else if (data.purpose == "next_node") {
          this.add_to_log({
            type: 'notification',
            text: `sending state of [${data.data}] to player`
          });
          this.player.position = data.data;
          event.target.send(JSON.stringify({
            purpose: "node_state",
            data: this.get_states(data.data)
          }));
        } else if (data.purpose == "solution") {
          if (data.data.found) {
            this.continuous = false;
            this.solution.found = true;
            this.solution.solution = data.data.solution;
            this.add_to_log({
              type: 'notification',
              text: 'solution is found'
            });
            this.add_to_log({
              type: 'notification',
              text: `solution is ${ data.data.solution.map(n => `[${n[0]},${n[1]}]`).join(' → ') }`
            });
          } else {
            if (this.continuous) {
              this.search_next();
            }
          }
        } else if (data.purpose == "search_tree") {
          this.st_dialog.loading = false;
          this.st_dialog.search_tree = data.data;
          this.add_to_log({
            type: 'notification',
            text: 'search tree is updated'
          });
        }
      };
    },
    player_loaded: function () {
      this.dialog.loading = false;
      this.load_interface = false;
    },
    reset_player: function () {
      this.solution.found = false;
      this.solution.solution = [];
      this.player.position = [-1,-1];
      this.player_socket.send(JSON.stringify({
        purpose: "restart",
        data: ""
      }));
    },
    continuous_search: function () {
      this.continuous = true;
      this.search_next();
    },
    stop_continuous_search: function () {
      this.continuous = false;
    },
    search_next: function () {
      this.player_socket.send(JSON.stringify({
        purpose: "next_node",
        data: ""
      }));
    },
    show_search_tree: function () {
      this.st_dialog.show = true;
      this.st_dialog.loading = true;
      this.player_socket.send(JSON.stringify({
        purpose: "search_tree",
        data: ""
      }));
    },
    add_to_log: function (l) {
      if (this.log_enabler) {
        this.logs.push(l);
      }
    }
  }
});