import Events from '../Events.js'
import State from '../State.js'

export default {
  identifier: 'Debug',
  async init() {
    Events.on("StatePathSet", (path, value) => {
      console.log(`State change detected:\n\t${path}: ${value}`)
    })

    Events.on("Error", error => {
      Events.emit("Output", error)
      Events.emit("Output", JSON.stringify(State._state, null, 2))
    })

    Events.on("Debug", () => {
      console.log(State._state)
      console.log(Events.getRegisteredEventNames())
    })
  }
}