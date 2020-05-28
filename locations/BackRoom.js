import Location from '../Location.js'

export default class BackRoom extends Location {
  onEnter() {
    this.on("listen", () => {
      console.log("There are strange creeking noises coming from the walls...")
      Events.emit("Fear", 3)
    })
  }
}