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
    # your code
    #
    #
    #
    #

    return search_tree
