# Instructions

1. You are required to create an AI player as a Python class. This AI player will be placed into a maze application.

2. After initialisation, the AI player will have the information of the maze including
                
    - size of the maze
    - coordinate of the entrance
    - possible actions from the entrance

3. The maze application will request the next node to be expanded from the AI player. 
							
4. This next node is a coordinate of a cell on the maze.

5. The maze will then inform the AI player information of that cell including

    - possible actions from the cell
    - whether it is an entrance
    - whether it is an exit

6. The AI player will then inform the maze if he/she has found the solution.

7. If the AI player has found the solution, the maze will display the solution.

8. If not, the process will repeat from requesting next node

<style>
  .fcn { font-family: 'Courier New', Courier, monospace; }
</style>

## Flowchart of the maze application

<svg width="100%" viewBox="-400 -20 1000 1000">
  <text x="0" y="0" dominant-baseline="middle" text-anchor="middle" fill="black" style="font-size:28px">
    <tspan>initialisation</tspan>
    <tspan x="0" dy="160">update maze info</tspan>
    <tspan x="0" dy="160">[maze] request next node</tspan>
    <tspan x="0" dy="160">[AI] send next node</tspan>
    <tspan x="0" dy="160">[maze] inform about node</tspan>
    <tspan x="0" dy="160">[AI] solution?</tspan>
    <tspan x="0" dy="160">[maze] display</tspan>
  </text>
  <path d="M 0 40 v 80 l 10 -10 l -10 3 l -10 -3 l 10 10" stroke="black" fill="black" />
  <path d="M 0 200 v 80 l 10 -10 l -10 3 l -10 -3 l 10 10" stroke="black" fill="black" />
  <path d="M 0 360 v 80 l 10 -10 l -10 3 l -10 -3 l 10 10" stroke="black" fill="black" />
  <path d="M 0 520 v 80 l 10 -10 l -10 3 l -10 -3 l 10 10" stroke="black" fill="black" />
  <path d="M 0 680 v 80 l 10 -10 l -10 3 l -10 -3 l 10 10" stroke="black" fill="black" />
  <path d="M 0 840 v 80 l 10 -10 l -10 3 l -10 -3 l 10 10" stroke="black" fill="black" />
  <path d="M 130 800 h 250 V 320 h -140" stroke="black" fill="none" />
  <path d="M 240 320 l 10 10 l -3 -10 l 3 -10 l -10 10" stroke="black" fill="black" />
  <text x="220" y="800" dominant-baseline="text-after-edge" text-anchor="start" fill="black" style="font-size:25px">no</text>
  <text x="20" y="880" dominant-baseline="middle" text-anchor="start" fill="black" style="font-size:25px">yes</text>
</svg>

## Interaction between maze and player

<svg width="100%" viewBox="-450 -20 1100 800">
  <text x="-50" y="0" text-anchor="end" dominant-baseline="middle" fill="black" style="font-size:28px">
    <tspan>Maze</tspan>
    <tspan x="-50" dy="40">load player</tspan>
    <tspan x="-50" dy="80">send maze info</tspan>
    <tspan x="-50" dy="160">request next node</tspan>
    <tspan x="-50" dy="80">provide node state and actions</tspan>
    <tspan x="-50" dy="160">reset player</tspan>
    <tspan x="-50" dy="160">request for search tree</tspan>
  </text>
  <text x="50" y="0" text-anchor="start" dominant-baseline="middle" fill="black" style="font-size:28px">
    <tspan x="50">AI Player</tspan>
    <tspan x="50" dy="80">initialisation, <tspan class="fcn">__init__()</tspan></tspan>
    <tspan x="50" dy="80">save maze info, <tspan class="fcn">set_maze()</tspan></tspan>
    <tspan x="50" dy="160">send next node, <tspan class="fcn">next_node()</tspan></tspan>
    <tspan x="50" dy="80">update node info, <tspan class="fcn">set_node_state()</tspan></tspan>
    <tspan x="50" dy="160">reset player, <tspan class="fcn">reset()</tspan></tspan>
    <tspan x="50" dy="160">send search tree, <tspan class="fcn">get_search_tree()</tspan></tspan>
  </text>
  <path d="M -40 40 h 80 l -10 -5 l 3 5 l -3 5 l 10 -5" transform="rotate(21.8,-45,40)" stroke="black" fill="black" />
  <path d="M -40 120 h 80 l -10 -5 l 3 5 l -3 5 l 10 -5" transform="rotate(21.8,-40,120)" stroke="black" fill="black" />
  <path d="M -40 280 h 80 l -10 -5 l 3 5 l -3 5 l 10 -5" transform="rotate(21.8,-40,280)" stroke="black" fill="black" />
  <path d="M -40 360 h 80 l -10 -5 l 3 5 l -3 5 l 10 -5" transform="rotate(21.8,-40,360)" stroke="black" fill="black" />
  <path d="M -40 520 h 80 l -10 -5 l 3 5 l -3 5 l 10 -5" transform="rotate(21.8,-40,520)" stroke="black" fill="black" />
  <path d="M -40 680 h 80 l -10 -5 l 3 5 l -3 5 l 10 -5" transform="rotate(21.8,-40,680)" stroke="black" fill="black" />
  <path d="M 40 80 h -80 l 10 -5 l -3 5 l 3 5 l -10 -5" transform="rotate(-21.8,40,80)" stroke="black" fill="black" />
  <path d="M 40 320 h -80 l 10 -5 l -3 5 l 3 5 l -10 -5" transform="rotate(-21.8,40,320)" stroke="black" fill="black" />
</svg>