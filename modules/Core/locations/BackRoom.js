import Location from '../Location.js'
import Events from '../../../Events.js'

export default class BackRoom extends Location {
  tag = 'BackRoom'
  aliases = ['bar back room', 'back room', 'room', 'door', 'room door']
  name = 'Glorod\'s Back Room'
  description = {
    sight: 'The oak walls look as thought they have seen better days... rot creeping in perhaps... the woods looks weak, and the book shelves look as though they might be hiding something sinister...',
    smell: 'Oaky and moldy',
    hearing: 'Quiet... with just the distant low rumble of the drinkers outside the door...'
  }
  connections = ['Bar']
  actionSet = {
    id: 'BackRoom',
    listen: () => {
      Location.actionSet.listen()
      Events.emit("Output", "There are strange creeking noises coming from the walls...")
      Events.emit("Fear", 3)
    },
    sniff: () => {
      Location.actionSet.sniff()
      Events.emit("Nausea", 1)
    }
  }
  onEnter() {
    Events.emit("Output", "You enter the back room of the bar... it seems there is much to analyze here...")
  }
}