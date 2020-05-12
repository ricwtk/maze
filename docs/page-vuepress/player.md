# `Player` class

```Python
class Player:
  def __init__(self):
    pass

  def reset(self):
    pass

  def set_maze(self, maze, entrance, exits):
    pass

  def next_node(self):
    return next_node_to_expand

  def set_node_state(self, state):
    return solution

  def get_search_tree(self):
    return search_tree
```

## `__init__`

```Python
def __init__(self):
  pass
```

This is the function that's called during initialisation. 

This function neither takes any input nor provides outputs.

## `reset`

```Python
def reset(self):
  pass
```

This is the function that reset the player to only contain the size of the maze, and the information of the entrance, as if we have only called `__init__()` and `set_maze(...)`.

This function neither takes any input nor provides outputs.

## `set_maze`

```Python
def set_maze(self, maze, entrance, exits):
  pass
```

This is the function to receive the information of maze from the maze application.

This function takes three positional inputs, `maze`, `entrance`, and `exits`.

```Python
maze = {
  "n_row": 5,
  "n_col": 7
}
```

`maze["n_row"]` gives the number of rows of the maze.

`maze["n_col"]` gives the number of columns of the maze.

```Python
entrance = {
  "position": [2,1],
  "actions": "nswe",
  "entrance": True,
  "exit": False
}
```

`entrance["position"]` gives the coordinates of the cell.

`entrance["actions"]` gives the available actions from the cell (north, south, west, east).

`entrance["entrance"]` is `True` if it's an entrance else `False`.

`entrance["exit"]` is `True` if it's an exit else `False`.

This is in the same format as the other node state provided by the maze.

```Python
exits = [[3,3], [2,2]]
```

`exits` is a list of coordinates for the exits.

## `next_node`

```Python
def next_node(self):
  return next_node_to_expand
```

This function returns the next node to be expanded. The output will be sent to maze application to request for information.

`next_node_to_expand = [1,3]`

## `set_node_state`

```Python
def set_node_state(self, state):
  return solution
```

The maze application sends the state of a node using this function.

This function takes one input, `state`, and gives one output, `solution`.

```Python
state = {
  "position": [3,4],
  "actions": "nw",
  "entrance": False,
  "exit": False
}
```

`state["position"]` gives the coordinates of the cell.

`state["actions"]` gives the available actions from the cell (north, south, west, east).

`state["entrance"]` is `True` if it's an entrance else `False`.

`state["exit"]` is `True` if it's an exit else `False`.

```Python
solution = {
  "found": False,
  "solution": []
}

solution = {
  "found": True,
  "solution": [[1,2], [1,3], [2,3], [3,3]]
}
```

`solution["found"]` is `True` if solution is found else `False`.

`solution["solution"]` gives the solution (sequence of cells)  if `solution["found"]` is `True` else `[]`.

## `get_search_tree`

```Python
def get_search_tree(self):
  return search_tree
```

This function returns the search tree up to the current stage. This function does not take any input.

The output of the function is a list/array of the nodes in the search tree.

```Python
search_tree = [{
  'id': 1,
  'state': [1,1],
  'children': [2,3,4],
  'actions': ['n','s','e'],
  'removed': False,
  'parent': None
}, ...]
```

Each node has a unique `id`.

`state` is the coordinates of a cell.

`children` is a list of the `id`s of its children. If there is no children, it should be `[]`.

```Python
search_tree = [{
  'id': 1,
  'state': [1,1],
  'children': [2,3,4],
  'actions': ['n','s','e'],
  'removed': False,
  'parent': None
}, ...]
```

`actions` is a list of actions that lead to its children, the sequence is corresponding to the sequence of `children`.

`removed` is `True` if the node is removed and will not be expanded.

`parent` is the id of its parent. The root node/initial state has no parent, and therefore it is `None`.


### Example of search tree
  
```Python
search_tree = [{
  'id': 1,
  'state': [1,1],
  'children': [2,3,4],
  'actions': ['n','s','e'],
  'removed': False,
  'parent': None
}, {
  'id': 2,
  'state': [1,2],
  'children': [5,6,7],
  'actions': ['n','s','w'],
  'removed': False,
  'parent': 1
}, {
  'id': 3,
  'state': [1,0],
  'children': [8,9],
  'actions': ['n','w'],
  'removed': False,
  'parent': 1
}, {
  'id': 4,
  'state': [2,1],
  'children': [],
  'actions': [],
  'removed': True,
  'parent': 1
}, {
  'id': 5,
  'state': [1,3],
  'children': [10,11],
  'actions': ['n','s','w'],
  'removed': False,
  'parent': 2
}, {
  'id': 6,
  'state': [1,1],
  'children': [],
  'actions': [],
  'removed': True,
  'parent': 2
}, {
  'id': 7,
  'state': [0,2],
  'children': [12,13],
  'actions': ['n','s'],
  'removed': False,
  'parent': 2
}, {
  'id': 8,
  'state': [1,1],
  'children': [],
  'actions': [],
  'removed': False,
  'parent': 3
}, {
  'id': 9,
  'state': [0,0],
  'children': [],
  'actions': [],
  'removed': False,
  'parent': 3
}, {
  'id': 10,
  'state': [1,4],
  'children': [],
  'actions': [],
  'removed': False,
  'parent': 5
}, {
  'id': 11,
  'state': [1,2],
  'children': [],
  'actions': [],
  'removed': True,
  'parent': 5
}, {
  'id': 12,
  'state': [0,3],
  'children': [],
  'actions': [],
  'removed': False,
  'parent': 7
}, {
  'id': 13,
  'state': [0,1],
  'children': [],
  'actions': [],
  'removed': False,
  'parent': 7
}]
```

<svg id="search-tree-example" viewBox="0 -10 760 370" width="100%" style="font-size:12px; background-color:rgba(255,255,255,0.9); border-radius:.5em;">
  <rect x="455" y="0" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="480" y="25" font-weight="thin" dominant-baseline="middle" text-anchor="middle">1 • 1</text>
  <!---->
  <!---->
  <rect x="205" y="100" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="230" y="125" font-weight="thin" dominant-baseline="middle" text-anchor="middle">1 • 2</text>
  <line x1="480" y1="50" x2="230" y2="100" stroke="gray"></line>
  <text x="355" y="75" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">n</text>
  <rect x="555" y="100" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="580" y="125" font-weight="thin" dominant-baseline="middle" text-anchor="middle">1 • 0</text>
  <line x1="480" y1="50" x2="580" y2="100" stroke="gray"></line>
  <text x="530" y="75" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">s</text>
  <rect x="705" y="100" width="50" height="50" stroke="red" fill="none"></rect>
  <text x="730" y="125" font-weight="thin" dominant-baseline="middle" text-anchor="middle">2 • 1</text>
  <line x1="480" y1="50" x2="730" y2="100" stroke="gray"></line>
  <text x="605" y="75" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">e</text>
  <rect x="55" y="200" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="80" y="225" font-weight="thin" dominant-baseline="middle" text-anchor="middle">1 • 3</text>
  <line x1="230" y1="150" x2="80" y2="200" stroke="gray"></line>
  <text x="155" y="175" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">n</text>
  <rect x="205" y="200" width="50" height="50" stroke="red" fill="none"></rect>
  <text x="230" y="225" font-weight="thin" dominant-baseline="middle" text-anchor="middle">1 • 1</text>
  <line x1="230" y1="150" x2="230" y2="200" stroke="gray"></line>
  <text x="230" y="175" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">s</text>
  <rect x="355" y="200" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="380" y="225" font-weight="thin" dominant-baseline="middle" text-anchor="middle">0 • 2</text>
  <line x1="230" y1="150" x2="380" y2="200" stroke="gray"></line>
  <text x="305" y="175" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">w</text>
  <rect x="505" y="200" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="530" y="225" font-weight="thin" dominant-baseline="middle" text-anchor="middle">1 • 1</text>
  <line x1="580" y1="150" x2="530" y2="200" stroke="gray"></line>
  <text x="555" y="175" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">n</text>
  <rect x="605" y="200" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="630" y="225" font-weight="thin" dominant-baseline="middle" text-anchor="middle">0 • 0</text>
  <line x1="580" y1="150" x2="630" y2="200" stroke="gray"></line>
  <text x="605" y="175" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">w</text>
  <!---->
  <!---->
  <!---->
  <!---->
  <rect x="5" y="300" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="30" y="325" font-weight="thin" dominant-baseline="middle" text-anchor="middle">1 • 4</text>
  <line x1="80" y1="250" x2="30" y2="300" stroke="gray"></line>
  <text x="55" y="275" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">n</text>
  <rect x="105" y="300" width="50" height="50" stroke="red" fill="none"></rect>
  <text x="130" y="325" font-weight="thin" dominant-baseline="middle" text-anchor="middle">1 • 2</text>
  <line x1="80" y1="250" x2="130" y2="300" stroke="gray"></line>
  <text x="105" y="275" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">s</text>
  <!---->
  <!---->
  <!---->
  <!---->
  <rect x="305" y="300" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="330" y="325" font-weight="thin" dominant-baseline="middle" text-anchor="middle">0 • 3</text>
  <line x1="380" y1="250" x2="330" y2="300" stroke="gray"></line>
  <text x="355" y="275" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">n</text>
  <rect x="405" y="300" width="50" height="50" stroke="gray" fill="none"></rect>
  <text x="430" y="325" font-weight="thin" dominant-baseline="middle" text-anchor="middle">0 • 1</text>
  <line x1="380" y1="250" x2="430" y2="300" stroke="gray"></line>
  <text x="405" y="275" stroke="white" stroke-width=".5pt" font-weight="900" dominant-baseline="middle" text-anchor="middle">s</text>
  <!---->
  <!---->
  <!---->
  <!---->
  <!---->
  <!---->
  <!---->
  <!---->
  <!---->
  <!---->
  <!---->
  <!---->
</svg>

A sample player is provided as `players/test_player`.