import Events from './Events.js'
import Engine from './Engine.js'
import Utils from './Utils.js'

const main = async () => {
  const moduleNames = (await Utils.loadFile('engine.json')).modules
  await Utils.asyncMap(moduleNames, async moduleName => Engine.addModule(await Utils.loadModule(moduleName)))
  await Engine.init()
  Events.emit("Prompt")
}
main()
