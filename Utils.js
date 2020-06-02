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

  static getFromOptions(options) {
    if (typeof options !== "array") {
      return options
    }
    const length = options.length
    const index = Math.floor(Math.random() * length)
    return options[index]
  }

  static getModulePath(moduleIdentifier, subpath = '') {
    return `./modules/${moduleIdentifier}/${subpath}`
  }
}