import random

class Player:
  def __init__(self):
    # your code
    #
    #
    #
    #

    pass

  def reset(self):
    # sample code
    self.search_tree = []
    # your code
    #
    #
    #
    #

    pass

  def set_maze(self, maze, entrance):
    # sample code
    self.maze = {
      "n_row": maze["n_row"],
      "n_col": maze["n_col"]
    }
    self.entrance = {
      "position": entrance["position"],
      "actions": entrance["actions"],
      "entrance": entrance["entrance"],
      "exit": entrance["exit"]
    }
    # your code
    #
    #
    #
    #

    pass

  def next_node(self):
    # sample code
    next_node_to_expand = [random.randrange(self.maze["n_col"]),random.randrange(self.maze["n_row"])]
    # your code
    #
    #
    #
    #

    return next_node_to_expand

  def set_node_state(self, state):
    # sample code
    new_node = {
      "position": state["position"],
      "actions": state["actions"],
      "entrance": state["entrance"],
      "exit": state["exit"]
    }
    if random.random() < 0.2:
      sol = [self.entrance["position"]]
      n_step = random.randrange(5,10)
      for n in range(n_step):
        next_step = [sol[-1][0], sol[-1][1]]
        options = [[], []]
        if next_step[0] > 0: options[0].append(-1)
        if next_step[0] < self.maze["n_col"] - 1: options[0].append(1)
        if next_step[1] > 0: options[1].append(-1)
        if next_step[1] < self.maze["n_row"] - 1: options[1].append(1)
        h_or_v = random.choice([0,1])
        next_step[h_or_v] += random.choice(options[h_or_v])
        sol.append(next_step)
      solution = {
        "found": True,
        "solution": sol
      }
    else:
      solution = {
        "found": False,
        "solution": []
      }
    # your code
    #
    #
    #
    #

    return solution

  def get_search_tree(self):
    # sample code
    search_tree = [{
      'id': 1,
      'state': [1,1],
      'children': [2,3,4],
      'actions': ['n', 's', 'e'],
      'removed': False,
      'parent': None
    }, {
      'id': 2,
      'state': [1,2],
      'children': [5,6,7],
      'actions': ['n', 's', 'w'],
      'removed': False,
      'parent': None
    }, {
      'id': 3,
      'state': [1,0],
      'children': [8,9],
      'actions': ['s', 'w'],
      'removed': False,
      'parent': None
    }, {
      'id': 4,
      'state': [0,0],
      'children': [],
      'actions': [],
      'removed': True,
      'parent': None
    }, {
      'id': 5,
      'state': [0,0],
      'children': [10,11],
      'actions': ['n', 's', 'w'],
      'removed': False,
      'parent': None
    }, {
      'id': 6,
      'state': [0,0],
      'children': [12,13],
      'actions': ['w', 'e'],
      'removed': False,
      'parent': None
    }, {
      'id': 7,
      'state': [0,0],
      'children': [],
      'actions': [],
      'removed': False,
      'parent': None
    }, {
      'id': 8,
      'state': [0,0],
      'children': [],
      'actions': [],
      'removed': False,
      'parent': None
    }, {
      'id': 9,
      'state': [0,0],
      'children': [],
      'actions': [],
      'removed': False,
      'parent': None
    }, {
      'id': 10,
      'state': [0,0],
      'children': [],
      'actions': [],
      'removed': False,
      'parent': None
    }, {
      'id': 11,
      'state': [0,0],
      'children': [],
      'actions': [],
      'removed': False,
      'parent': None
    }, {
      'id': 12,
      'state': [0,0],
      'children': [],
      'actions': [],
      'removed': False,
      'parent': None
    }, {
      'id': 13,
      'state': [0,0],
      'children': [],
      'actions': [],
      'removed': False,
      'parent': None
    }]
    # your code
    #
    #
    #
    #

    return search_tree
