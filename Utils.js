import State from './State.js'
import * as FS from 'fs'

export default class Utils {
  static async loadFile(path) {
    const fileContents = await FS.readFileSync(path)
    if (fileContents) {
      return JSON.parse(fileContents)
    }
  }

  static loadLocationIntoState(location) {
    const statePath = `locations.${location.tag}`
    State.set(statePath, location)
  }
}