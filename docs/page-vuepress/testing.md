# Testing

1. Before solving a maze with the AI player, it's good idea to check if your code works.

2. Go to [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

    (Your port might be different, <br>check with the terminal output when you started the application)

3. Run each of the `/test/...` and <br>make sure the responses are JSON objects with `"error": false`.

<video controls width="100%">
  <source src="../tutorials/A1.4.Testing.mp4" type="video/mp4" />
</video>

4. If any of the test returns a response with `"error": true`, check the corresponding method in the `Player` class.

    | test | method |
    |------|--------|
    |`/test/initialise/{player_name}` | `__init__` |
    |`/test/reset_player` | `reset` |
    |`/test/set_maze` | `set_maze` |
    |`/test/next_node` | `next_node` |
    |`/test/node_state` | `set_node_state` |
    |`/test/search_tree` | `get_search_tree` |

5. For errors, go to the terminal in which you executed `uvicorn main:app --reload` and check the logs. 

6. If there is no error, or all errors are cleared, you can go ahead to the next step - solving the maze with your AI player.
