class Vehicle {
  constructor(type, route, priority) {
    this.type = type
    this.route = route
    this.priority = priority
    this.state = ''
    this.position = { x: null, y: null }
    this.currentTileIndex = 0

    this.element = document.createElement('div')
    this.element.classList.add('vehicle')
    this.element.setAttribute('type', type)
    vehicles.appendChild(this.element)

    this.spawn()
  }

  spawn() {
    const { x, y } = tiles[this.route[0]].center
    this.position = { x, y }

    Object.assign(this.element.style, {
      left: `${x}px`,
      top: `${y}px`,
    })

    this.setImage()
    this.handleMovement()
    this.updateTiles()
  }

  setImage() {
    const carId = Math.floor(Math.random() * 13) + 1
    const imageElement = document.createElement('img')
    imageElement.src =
      this.type === 'tram' ? 'img/tram.webp' : `img/car${carId}.webp`
    if (this.type === 'tram')
      imageElement.style.transform = 'translate(-93%, -50%)'
    this.element.appendChild(imageElement)
  }

  rotateVehicle(distanceX, distanceY) {
    const rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI)
    this.element.style.transform = `rotate(${rotation}deg)`
  }

  updatePosition(distanceX, distanceY) {
    this.position.x += distanceX
    this.position.y += distanceY

    Object.assign(this.element.style, {
      left: `${this.position.x}px`,
      top: `${this.position.y}px`,
    })
  }

  handleAnimation() {
    if (this.currentTileIndex >= this.route.length) return // Ensure currentTileIndex is within bounds

    const twoAheadIndex = this.currentTileIndex + 2
    if (twoAheadIndex >= this.route.length) return // Ensure twoAheadIndex is valid

    const twoAhead = tiles[this.route[twoAheadIndex]]
    const transitionTimingFunction =
      this.state === 'stopped'
        ? 'cubic-bezier(0.42,0,0.58,1)'
        : 'cubic-bezier(0,0,0.58,1)'

    this.element.style.transitionDuration =
      twoAhead?.state === 'occupied' ? '700ms' : '300ms'
    this.element.style.transitionTimingFunction =
      twoAhead?.state === 'occupied' ? transitionTimingFunction : 'linear'
  }

  updateTiles() {
    const [
      sixBehind,
      fiveBehind,
      fourBehind,
      threeBehind,
      twoBehind,
      oneBehind,
      currentTile,
      nextTile,
      twoAhead,
      threeAhead,
    ] = this.getTiles(-6, 3)

    if (this.type === 'tram') {
      sixBehind?.setState(
        sixBehind?.index !== tramStopEW.index &&
          sixBehind?.index !== tramStopWE.index
          ? 'free'
          : 'occupied',
        'vehicle'
      )
      fiveBehind?.setState('occupied', 'vehicle')
      fourBehind?.setState('occupied', 'vehicle')
      threeBehind?.setState('occupied', 'vehicle')
      twoBehind?.setState('occupied', 'vehicle')
      if (
        nextTile?.index === tramStopWE.index ||
        nextTile?.index === tramStopEW.index
      ) {
        setTimeout(() => this.freeTheStop(nextTile.index), 3000)
      }
    }

    if (this.type === 'car') {
      twoBehind?.setState(
        twoBehind?.stateSource === 'lights' && twoBehind?.state === 'occupied'
          ? 'occupied'
          : 'free',
        twoBehind?.stateSource === 'lights' && twoBehind?.state === 'occupied'
          ? 'lights'
          : 'vehicle'
      )
    }

    oneBehind?.setState(
      'occupied',
      oneBehind?.stateSource === 'lights' && oneBehind?.state === 'occupied'
        ? 'lights'
        : 'vehicle'
    )
    currentTile?.setState('occupied', 'vehicle')

    if (nextTile?.state === 'occupied') return

    if (this.priority && trafficRulesApplied) {
      nextTile?.setState('awaiting', 'vehicle')
      if (twoAhead?.state !== 'occupied')
        twoAhead?.setState('awaiting', 'vehicle')
      if (threeAhead?.state !== 'occupied')
        threeAhead?.setState('awaiting', 'vehicle')
    }
  }

  handleMovement() {
    this.interval = setInterval(() => {
      if (this.currentTileIndex >= this.route.length - 1) {
        this.despawn()
        return
      }

      // THIS IS WHAT MAKES VEHICLE STOP
      const nextTile = tiles[this.route[this.currentTileIndex + 1]]
      const twoAhead = tiles[this.route[this.currentTileIndex + 2]]
      if (nextTile?.state === 'occupied') {
        this.state = 'stopped'
        return
      }
      if (
        (nextTile?.state === 'awaiting' || twoAhead?.state === 'awaiting') &&
        !this.priority
      ) {
        this.state = 'stopped'
        return
      }

      if (this.currentTileIndex < this.route.length) {
        this.handleAnimation()
      }
      const { x, y } = nextTile.center
      this.rotateVehicle(x - this.position.x, y - this.position.y)
      this.updatePosition(x - this.position.x, y - this.position.y)

      this.currentTileIndex++
      this.updateTiles()
      this.state = 'moving'
    }, 300)
  }

  freeTheStop(TILE_ID) {
    if (tiles[TILE_ID].stateSource !== 'lights')
      tiles[TILE_ID].setState('free', 'vehicle')
  }

  getTiles(rangeStart = -6, rangeEnd = 1) {
    return Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) =>
        tiles[this.route[this.currentTileIndex + rangeStart + i]] || null
    )
  }

  stopMoving() {
    clearInterval(this.interval)
  }

  despawn() {
    const tilesToFree = this.getTiles(-6, 1)
    if (this.type === 'tram') {
      tilesToFree.slice(0, 5).forEach(tile => tile?.setState('free', 'vehicle'))
    }
    tilesToFree.slice(5, 7).forEach(tile => tile?.setState('free', 'vehicle'))

    this.stopMoving()
    this.element.remove()
  }
}
