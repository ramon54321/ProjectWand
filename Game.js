import Events from "./Events.js"

export default class Game {
  static modules = []

  static addModule(module) {
    this.modules.push(module)
  }

  static async init() {
    for(const module of this.modules) {
      console.log(`Initializing Module: ${module.identifier}`)
      await module.init()
    }
    Events.emit("ModulesLoaded")
  }
}