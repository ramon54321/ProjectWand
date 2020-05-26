import Events from './Events.js'
import Game from './Game.js'

import CoreModule from './modules/Core.js'
import HealthModule from './modules/Health.js'
import RenderModule from './modules/Render.js'
import DebugModule from './modules/Debug.js'

const main = async () => {
  Game.addModule(CoreModule)
  Game.addModule(HealthModule)
  Game.addModule(RenderModule)
  Game.addModule(DebugModule)
  await Game.init()

  // Gameplay Simulation
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Render")
  Events.emit("Debug")
}
main()
