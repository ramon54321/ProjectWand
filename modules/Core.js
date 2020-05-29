import Utils from '../Utils.js'
import Events from '../Events.js'
import State from '../State.js'
import Location from './core/Location.js'

export default {
  identifier: 'Core',
  async init() {
    Events.on("Input", input => {
      const inputSplit = input.split(" ")
      try {
        const command = inputSplit[0]
        const args = inputSplit.slice(1)
        Events.emit("Action", command, args)
      } catch (error) {
        Events.emit("Error", error)
      }
      setImmediate(() => Events.emit("Prompt"))
    })

    Events.on("Action", (command, args) => {
      const currentLocation = State.get(`locations.${State.get("currentLocation")}`)
      const action = currentLocation.actionSet[command] || Location.actionSet[command]
      action(args)
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

    Events.on("ModulesLoaded", () => {
      Events.emit("SetLocation", "Bar")
    })
    
    await Utils.loadLocationsIntoState('./modules/Core/locations')
  }
}