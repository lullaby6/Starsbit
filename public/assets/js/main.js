const server="http://localhost:3000",socket=io.connect(server,{transports:["websocket","polling","flashsocket"],upgrade:!1,reconnection:!1});import{Game}from"../libs/Dazzle.js";import Player from"../GameObjects/Player.js";import Star from"../GameObjects/Star.js";import World from"../GameObjects/World.js";const game=new Game({backgroundColor:"rgb(10, 10, 30)",fps:60,cursor:!1,fullWindow:!0,scenes:{main:{custom:{worldLimit:1e3,players:[],stars:[],maxStars:7},gameObjects:{world:World,player:{...Player,custom:{...Player.custom,local:!0}}},load:e=>{for(;e.stars.length<e.maxStars;){var a=e.game.instantGameObject(Star);e.stars.push(a)}},update:e=>{var a=e.game.getGameObject("player");e.game.cameraTarget(a,3)}}},keyDown:({event:e,current:a})=>{"f"==e.key&&a.setFullscreen(!a.fullScreen)}});socket.on("player",e=>{var a=game.getGameObject("player");a.id!==e.id&&(game.getGameObject(e.id)?(game.scenes[game.activeScene].gameObjects[e.id].x=e.x,game.scenes[game.activeScene].gameObjects[e.id].y=e.y,game.scenes[game.activeScene].gameObjects[e.id].headPosition=e.headPosition,game.scenes[game.activeScene].gameObjects[e.id].speedX=e.speedX,game.scenes[game.activeScene].gameObjects[e.id].speedY=e.speedY,game.scenes[game.activeScene].gameObjects[e.id].moveLeft=e.moveLeft,game.scenes[game.activeScene].gameObjects[e.id].moveRight=e.moveRight,game.scenes[game.activeScene].gameObjects[e.id].moveDown=e.moveDown,game.scenes[game.activeScene].gameObjects[e.id].moveUp=e.moveUp):(game.createGameObject(e.id,{...Player,...e,custom:{...Player.custom,headPosition:e.headPosition,playerColor:e.playerColor,speedX:e.speedX,speedY:e.speedY,moveLeft:e.moveLeft,moveRight:e.moveRight,moveDown:e.moveDown,moveUp:e.moveUp}}),game.scenes[game.activeScene].gameObjects[e.id].createBullets(game.scenes[game.activeScene].gameObjects[e.id])),a.sendSocket(a))}),socket.on("shot",e=>{game.getGameObject("player").id!==e&&(e=game.getGameObject(e))&&e.shot(e)}),socket.on("displayer",e=>{game.removeGameObject(e)});