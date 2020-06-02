import Utils from '../Utils.js'
import Events from '../Events.js'
import State from '../State.js'
import Location from './core/Location.js'

const identifier = 'Core'

class ModuleUtils {
  static async loadLocationsIntoState(path) {
    const locationFiles = (await Utils.getFilesInDirectory(path)).map(locationFile => `./${identifier}/locations/${locationFile}`)
    const locationModules = await Utils.asyncMap(locationFiles, async locationFile => (await import(locationFile)).default)
    locationModules.forEach(locationModule => State.set(`${identifier}.locations.${[locationModule.name]}`, new locationModule()))
  }

  static getLocationFromTag(locationTag) {
    return State.get(`${identifier}.locations.${locationTag}`)
  }

  static create(itemTag, options = {}) {
    return {
      ...State.get(`${identifier}.items.${itemTag}`),
      ...options
    }
  }
}

export default {
  identifier: identifier,
  moduleUtils: ModuleUtils,
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
      const currentLocation = this.moduleUtils.getLocationFromTag(State.get("currentLocationTag"))
      const doubleWordCommand = [command, args[0]].join(" ")
      const action = currentLocation.actionSet[command]
                  || Location.actionSet[command]
                  || currentLocation.actionSet[doubleWordCommand]
                  || Location.actionSet[doubleWordCommand]
      action(args)
    })

    Events.on("SetLocation", (newLocationTag) => {
      const currentLocationTag = State.get("currentLocationTag")
      if (currentLocationTag) {
        const currentLocation = this.moduleUtils.getLocationFromTag(currentLocationTag)
        currentLocation.onExit()
      }
      const newLocation = this.moduleUtils.getLocationFromTag(newLocationTag)
      newLocation.onEnter()
      State.set("currentLocationTag", newLocationTag)
    })

    Events.on("ModulesLoaded", () => {
      Events.emit("SetLocation", "Bar")
    })
    
    await this.moduleUtils.loadLocationsIntoState(Utils.getModulePath(this.identifier, 'locations'))
    State.set(`assets.${this.identifier}.items`, await Utils.loadFile(Utils.getModulePath(this.identifier, 'items.json')))
  }
}