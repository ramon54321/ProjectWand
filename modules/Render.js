import Events from '../Events.js'
import State from '../State.js'

export default {
  identifier: 'Render',
  async init() {
    Events.on("Render", () => {
      console.log("This is the current state: " + JSON.stringify(State._state))
    })
  }
}