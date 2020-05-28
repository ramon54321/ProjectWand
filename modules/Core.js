import Utils from '../Utils.js'
import Events from '../Events.js'
import State from '../State.js'

export default {
  identifier: 'Core',
  async init() {
    Events.on("Input", input => {
      const inputSplit = input.split(" ")
      try {
        const currentLocation = State.get(`locations.${State.get("currentLocation")}`)
        currentLocation[inputSplit[0]](inputSplit.slice(1))
      } catch (error) {
        Events.emit("Error", error)
      }
      setImmediate(() => Events.emit("Prompt"))
    })

    Events.on("SetLocation", (newLocationTag) => {
      const currentLocationTag = State.get("currentLocation")
      if (currentLocationTag) {
        const currentLocation = State.get(`locations.${currentLocationTag}`)
        currentLocation.onExit()
      }
      const newLocation = State.get(`locations.${newLocationTag}`)
      newLocation.onEnter()
      State.set("currentLocation", newLocationTag)
    })

    await Utils.loadLocationsIntoState()

    Events.emit("SetLocation", "Bar")
  }
}