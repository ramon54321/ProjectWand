import { Events } from '../Events.js'
import State from '../State.js'

export default {
  identifier: 'Output',
  async init() {
    Events.on("Output", () => {
      const currentLocation = State.get(`locations.${State.get('currentLocation')}`)
      console.log(`You are in ${currentLocation.name}`)
      console.log(`You can:`)
      currentLocation.actions.forEach((action, index) => console.log(`\t${index}: ${action}`))
    })

    Events.on("Output", () => {
      Events.emit("PromptRequest")
    })
  }
}