import Events from '../Events.js'
import State from '../State.js'

export default {
  async init() {
    console.log('Renderer module init')

    Events.on("Render", () => {
      console.log("This is the current state: " + JSON.stringify(State._state))
    })
  }
}