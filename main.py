from fastapi import FastAPI, HTTPException, WebSocket
from starlette.endpoints import WebSocketEndpoint
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
import os, importlib
import json

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

players = {}
result_dir = os.path.join("static", "results")
players_json = os.path.join(result_dir, "players.json")

@app.get("/")
async def showFrontend():
  return FileResponse('static/frontend.html')

@app.get("/maze-creator")
async def showMazeCreator():
  return FileResponse('static/maze-creator.html')

@app.get("/get-maze-list")
async def getMazeList():
  maze_list = [f[:-5] for f in os.listdir("mazes") if f.endswith(".json")]
  return JSONResponse(content=maze_list)

@app.get("/get-maze/{maze_name}")
async def getMaze(maze_name):
  maze_file_name = maze_name + ".json"
  if (maze_file_name in os.listdir("mazes")):
    with open("mazes/{}".format(maze_file_name)) as f:
      return JSONResponse(content=json.load(f))
  else:
    raise HTTPException(
      status_code = 404,
      detail = "There is no maze named {}".format(maze_name),
      headers={"X-Error": "Maze not found"},
    )

class borderItem(BaseModel):
  bottom: list = [[]]
  right: list = [[]]

class mazeItem(BaseModel):
  n_row: int = 1
  n_col: int = 1
  borders: borderItem
  entrance: list = [0,0]
  exits: list = [[]]

@app.post("/save-maze/")
async def saveMaze(name: str, mz: mazeItem):
  with open(os.path.join("mazes", name + ".json"), "w") as f:
    json.dump(json.loads(mz.json()), f)
  return JSONResponse(content={"msg": "Maze saved in {}.json".format(name)})

def get_player_details(p):
  with open(os.path.join("players", p, "group.txt"), "r") as f:
    found_member = False
    group = ""
    icon = "mdi-account"
    members = []
    for line in f:
      stripped = line.strip()
      if found_member and stripped:
        members.append(stripped)
      if stripped.lower().startswith("name"):
        group = stripped.split(":")[1].strip()
      elif stripped.lower().startswith("icon"):
        icon = stripped.split(":")[1].strip()
      elif stripped.lower().startswith("members"):
        found_member = True
  return {
    "name": p,
    "group": group,
    "icon": icon,
    "members": members
  }

@app.get("/get-player-list")
async def getPlayerList():
  player_list = [get_player_details(p) for p in os.listdir("players") if not p.startswith(".") and os.path.isdir(os.path.join("players", p)) and os.path.isfile(os.path.join("players", p, "group.txt"))]
  return JSONResponse(content=player_list)

@app.websocket_route("/select-player/{player_name}")
class PlayerWSEndpoint(WebSocketEndpoint):
  async def on_connect(self, websocket: WebSocket):
    await websocket.accept()
    # initialise player
    self.player_name = websocket.url.path.split("/")[-1]
    try:
      mod = importlib.import_module("players.{}.player".format(self.player_name))
      self.player = getattr(mod, 'Player')()    
    except:
      await websocket.send_json({
        "error": True,
        "purpose": "error",
        "data": "{} is not available".format(self.player_name)
      })
    else:
      await websocket.send_json({
        "error": False,
        "purpose": "initialised",
        "data": get_player_details(self.player_name)
      })

  async def on_receive(self, websocket: WebSocket, data_str):
    data = json.loads(data_str)
    print("Data received from frontend", data)
    if data["purpose"] == "restart":
      self.player.reset()
      await websocket.send_json({
        "error": False,
        "purpose": "notification",
        "data": "{} is reset".format(self.player_name)
      })
    elif data["purpose"] == "set_maze":
      self.player.set_maze(data["data"]["maze"], data["data"]["entrance"], data["data"]["exits"])
      await websocket.send_json({
        "error": False,
        "purpose": "notification",
        "data": "player received the maze size and entrance state"
      })
    elif data["purpose"] == "next_node": 
      next_node = self.player.next_node()
      await websocket.send_json({
        "error": False,
        "purpose": "next_node",
        "data": next_node
      })
    elif data["purpose"] == "node_state":
      solution = self.player.set_node_state(data["data"])
      await websocket.send_json({
        "error": False,
        "purpose": "solution",
        "data": solution
      })
    elif data["purpose"] == "search_tree":
      search_tree = self.player.get_search_tree()
      await websocket.send_json({
        "error": False,
        "purpose": "search_tree",
        "data": search_tree
      })

  async def on_disconnect(self, websocket: WebSocket, close_code: int):
    pass

global test_player

@app.get("/test/initialise/{player_name}")
async def test_initialise(player_name: str):
  try:
    mod = importlib.import_module("players.{}.player".format(player_name))
    global test_player
    test_player = getattr(mod, 'Player')()    
  except:
    return JSONResponse({
      "error": True,
      "purpose": "error",
      "data": "{} is not available".format(player_name)
    })
  else:
    return JSONResponse({
      "error": False,
      "purpose": "initialised",
      "data": get_player_details(player_name)
    })

@app.get("/test/reset_player")
async def test_reset():
  try:
    global test_player
    retval = test_player.reset()
  except:
    return JSONResponse({
      "error": True,
      "purpose": "error",
      "data": "reset command failed"
    })
  else:
    return JSONResponse({
      "error": False,
      "purpose": "notification",
      "data": {
        "msg": "player is reset",
        "return_value": retval
      }
    })

@app.get("/test/set_maze")
async def test_set_maze():
  try:
    global test_player
    retval = test_player.set_maze({'n_row': 6, 'n_col': 7}, {'position': [0, 3], 'actions': 's', 'entrance': True, 'exit': False}, [[3,3],[2,2]])
  except:
    return JSONResponse({
      "error": True,
      "purpose": "error",
      "data": "set_maze command failed"
    })
  else:
    return JSONResponse({
      "error": False,
      "purpose": "notification",
      "data": {
        "msg": "maze is set",
        "return_value": retval
      }
    })

@app.get("/test/next_node")
async def test_nextnode():
  try:
    global test_player
    retval = test_player.next_node()
  except:
    return JSONResponse({
      "error": True,
      "purpose": "error",
      "data": "next_node command failed"
    })
  else:
    return JSONResponse({
      "error": False,
      "purpose": "notification",
      "data": {
        "msg": "next node value is returned",
        "return_value": retval
      }
    })

@app.get("/test/node_state")
async def test_node_state():
  try:
    global test_player
    retval = test_player.set_node_state({'position': [0, 0], 'actions': 'en', 'entrance': False, 'exit': False})
  except:
    return JSONResponse({
      "error": True,
      "purpose": "error",
      "data": "set_node_state command failed"
    })
  else:
    return JSONResponse({
      "error": False,
      "purpose": "notification",
      "data": {
        "msg": "the state of node is set",
        "return_value": retval
      }
    })

@app.get("/test/search_tree")
async def test_search_tree():
  try:
    global test_player
    retval = test_player.get_search_tree()
  except:
    return JSONResponse({
      "error": True,
      "purpose": "error",
      "data": "get_search_tree command failed"
    })
  else:
    return JSONResponse({
      "error": False,
      "purpose": "notification",
      "data": {
        "msg": "search tree is returned",
        "return_value": retval
      }
    })