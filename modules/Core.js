import Utils from '../Utils.js'
import { Events, Actions } from '../Events.js'
import State from '../State.js'

export default {
  identifier: 'Core',
  async init() {
    Events.on("Answer", answer => {
      const answerSplit = answer.split(" ")
      Actions.emit(answerSplit[0], answerSplit.slice(1))
      Events.emit("Output")
    })

    Events.on("SetLocation", (newLocationTag) => {
      const currentLocationTag = State.get("currentLocation")
      if (currentLocationTag) {
        const currentLocation = State.get(`locations.${currentLocationTag}`)
        currentLocation.onExit()
        currentLocation.onExitAnyLocation()
      }
      const newLocation = State.get(`locations.${newLocationTag}`)
      newLocation.onEnterAnyLocation()
      newLocation.onEnter()
      State.set("currentLocation", newLocationTag)
    })

    await Utils.loadLocationsIntoState()

    Events.emit("SetLocation", "Bar")
  }
}