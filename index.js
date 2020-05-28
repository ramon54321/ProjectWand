import { Events } from './Events.js'
import Game from './Game.js'
import Utils from './Utils.js'

const main = async () => {

  Game.addModule(await Utils.loadModule('Core'))
  Game.addModule(await Utils.loadModule('Health'))
  Game.addModule(await Utils.loadModule('Input'))
  Game.addModule(await Utils.loadModule('Output'))
  Game.addModule(await Utils.loadModule('Debug'))
  await Game.init()

  // Gameplay Simulation
  Events.emit("Output")
}
main()
