class TrafficLight {
  constructor(type, codename, time, targetTiles) {
    this.type = type
    this.codename = codename.toLowerCase()
    this.time = time
    this.targetTiles = targetTiles
    this.lightsElement = null
    this.isGreen = false

    this.init()
  }

  init() {
    this.createLightsElement()
  }

  createLightsElement() {
    this.lightsElement = document.createElement('div')
    this.lightsElement.classList.add(
      `car-lights-${this.codename === 'we' || this.codename === 'ew' ? 1 : 2}`
    )
    this.lightsElement.classList.add(`${this.codename}-${this.type}-lights`)
    hud.appendChild(this.lightsElement)
  }

  setLights(state) {
    this.isGreen = state === 'green'
    this.targetTiles.forEach(tileIndex => {
      tiles[tileIndex]?.setState(
        state === 'green' ? 'free' : 'occupied',
        'lights'
      )
    })
  }
}
