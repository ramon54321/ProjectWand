import State from './State.js'
import * as FS from 'fs'

export default class Utils {
  static async getFilesInDirectory(path) {
    return await FS.readdirSync(path)
  }

  static async loadFile(path) {
    const fileContents = await FS.readFileSync(path)
    if (fileContents) {
      return JSON.parse(fileContents)
    }
  }

  static async loadLocationsIntoState() {
    const locationFiles = (await Utils.getFilesInDirectory('locations')).map(locationFile => `./locations/${locationFile}`)
    const locationModules = await Utils.asyncMap(locationFiles, async locationFile => (await import(locationFile)).default)
    locationModules.forEach(locationModule => State.set(`locations.${[locationModule.name]}`, new locationModule()))
  }

  static async loadModule(moduleName) {
    return (await import(`./modules/${moduleName}.js`)).default
  }

  static async asyncMap(array, fn) {
    const result = []
    for (const i of array) {
      result.push(await fn(i))
    }
    return result
  }
}