import Events from '../Events.js'

export default {
  identifier: 'Output',
  async init() {
    Events.on("Output", output => {
      console.log(` -- ${output}`)
    })
  }
}