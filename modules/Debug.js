import Events from '../Events.js'
import State from '../State.js'

export default {
  async init() {
    console.log('Debug module init')

    Events.on("StatePathSet", (path, value) => {
      console.log(`State change detected:\n\t${path}: ${value}`)
    })

    Events.on("Debug", () => {
      console.log(State._state)
      console.log(Events.getRegisteredEventNames())
    })
  }
}