class Tile {
  constructor(index, state = 'free') {
    this.index = index
    this.state = state
    this.stateSource = 'vehicle'
    this.element = document.createElement('div')
    this.element.classList.add('tile')
    this.element.textContent = ''
    this.element.setAttribute('id', `tile${index}`)

    this.updateState()
  }

  updateState() {
    this.element.classList.remove('occupied', 'free', 'awaiting')
    this.element.classList.add(this.state)
  }

  setState(newState, stateSource) {
    if (['occupied', 'free', 'awaiting'].includes(newState)) {
      this.state = newState
      this.stateSource = stateSource
      this.updateState()
    }
  }

  appendToLane(lane) {
    lane.appendChild(this.element)

    const rect = this.element.getBoundingClientRect()
    this.center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }
}
