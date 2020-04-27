# Solving maze

1. Go to [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

2. Click <span class="button"><span class="mdi mdi-account-switch-outline"></span> PLAYER NAME <span class="mdi mdi-account"></span></span> to load your AI player.

3. Click <span class="button"><span class="mdi mdi-map-marker-distance"></span> DEFAULT <span class="mdi mdi-map-outline"></span></span> to load different mazes.

## After your AI player is loaded

| Icon | Function |
|:----:|----------|
| <span class="button mdi mdi-restart"></span> | resets the player | 
|<span class="button mdi mdi-play"></span>&nbsp;/&nbsp;<span class="button mdi mdi-pause"></span> | automates the process of communication between maze and player until paused or solution is found |
| <span class="button mdi mdi-skip-next"></span> | steps the communication between maze and player |
| <span class="button mdi mdi-graph-outline"></span> | shows search tree as provided by `Player.get_search_tree` |

## When a solution is found

The solution will be displayed on the maze.

<video controls width="100%">
  <source src="../tutorials/A1.5.Run.Maze.mp4" type="video/mp4" />
</video>
