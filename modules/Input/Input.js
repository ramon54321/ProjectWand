import Events from '../../Events.js'
import Readline from 'readline'

export default {
  identifier: 'Input',
  async init() {
    const rl = Readline.createInterface(process.stdin, process.stdout)
    rl.on('close', () => {
      process.exit(0)
    })

    Events.on("Prompt", () => {
      rl.question('\n -> ', input => {
        Events.emit("Input", input)
      })
    })
  }
}