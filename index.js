import Events from './Events.js'
import Game from './Game.js'
import Utils from './Utils.js'

const main = async () => {
  const moduleNames = (await Utils.loadFile('game.json')).modules
  await Utils.asyncMap(moduleNames, async moduleName => Game.addModule(await Utils.loadModule(moduleName)))
  await Game.init()
  Events.emit("Prompt")
}
main()
