import { Events } from '../Events.js'
import State from '../State.js'

export default {
  identifier: 'Output',
  async init() {
    Events.on("Output", () => {
      const currentLocation = State.get(`locations.${State.get('currentLocation')}`)
      console.log(`You are in ${currentLocation.name}`)
    })

    Events.on("Output", () => {
      Events.emit("PromptRequest")
    })
  }
}