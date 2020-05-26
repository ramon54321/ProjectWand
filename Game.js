export default class Game {
  static modules = []

  static addModule(module) {
    this.modules.push(module)
  }

  static async init() {
    for(const module of this.modules) {
      await module.init()
    }
  }
}