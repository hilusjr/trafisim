const container = document.querySelector('.container')
const vehicles = document.querySelector('.vehicles')
const unprettyButton = document.querySelector('.unpretty-button')
const covers = document.querySelector('.covers')
const welcomeScreen = document.querySelector('.welcome-screen')
const understandButton = document.querySelector('.understand-button')

let isPretty = true
let resizeTimeout
let tramStopWE = null
let tramStopEW = null
let isPriority = trafficRulesSwitched

const isWelcomed = localStorage.getItem('isWelcomed')
const tiles = []
const vehicleTypes = ['car', 'tram']
const tramRoutes = [routeTramWE(), routeTramEW()]
const routes = [
  routeCarWE1(),
  routeCarWE2(),
  routeCarEW1(),
  routeCarEW2(),
  routeCarWN(),
  routeCarWS(),
  routeCarEN(),
  routeCarES(),
  routeCarNS(),
  routeCarNW(),
  routeCarNE(),
  routeCarSN(),
  routeCarSW(),
  routeCarSE(),
]

if (isWelcomed) welcomeScreen.remove()

understandButton.addEventListener('click', () => {
  welcomeScreen.remove()
  localStorage.setItem('isWelcomed', true)
})

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout) // Clear the timeout on each resize event
  resizeTimeout = setTimeout(() => {
    location.reload() // Reloads the page after resizing stops
  }, 200) // Adjust the delay as needed
})

window.addEventListener('load', () => {
  createBoard()
  setTramStops()
  // tiles[346].setState('awaiting')
  // createVehicle()
  setInterval(createVehicle, 800)
})

function createVehicle() {
  const vehicleType = Math.random() < 0.95 ? vehicleTypes[0] : vehicleTypes[1]

  const vehicleRoute =
    vehicleType === 'tram'
      ? tramRoutes[Math.floor(Math.random() * tramRoutes.length)]
      : Math.random() < 0.4
      ? routes[Math.floor(Math.random() * 4)]
      : routes[Math.floor(Math.random() * (routes.length - 4)) + 4]

  if (routes.slice(0, 8).includes(vehicleRoute) || vehicleType === 'tram') {
    isPriority = !isPriority
  }
  new Vehicle(vehicleType, vehicleRoute, isPriority)
  isPriority = trafficRulesSwitched
}

function setTramStops() {
  tramStopWE = tiles[170]
  tramStopEW = tiles[121]

  tramStopWE.setState('occupied', 'vehicle')
  tramStopEW.setState('occupied', 'vehicle')
}

unprettyButton.addEventListener('click', () => {
  const styleSheet = document.styleSheets[0] // Get the first stylesheet

  if (isPretty) {
    document.body.style.backgroundColor = 'white'
    covers.style.display = 'none'
    container.style.backgroundImage = 'none'
    styleSheet.insertRule(
      '.free { background-color: rgba(0, 114, 34, 0.74); }',
      styleSheet.cssRules.length
    )
    styleSheet.insertRule(
      '.awaiting { background-color: rgba(165, 126, 0, 0.77); }',
      styleSheet.cssRules.length
    )
    styleSheet.insertRule(
      '.occupied { background-color: rgba(165, 38, 0, 0.78); }',
      styleSheet.cssRules.length
    )
    styleSheet.insertRule(
      '.tile { border: 1px solid rgb(104, 104, 104); }',
      styleSheet.cssRules.length
    )
    tiles.forEach(tile => (tile.element.textContent = tile.index))
  } else {
    covers.style.display = 'block'
    container.style.backgroundImage = 'url(../img/bg.webp)'
    document.body.style.backgroundColor = 'rgb(0, 12, 34)'
    tiles.forEach(tile => (tile.element.textContent = ''))
    for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
      const rule = styleSheet.cssRules[i]
      if (
        rule.selectorText === '.free' ||
        rule.selectorText === '.awaiting' ||
        rule.selectorText === '.occupied' ||
        rule.selectorText === '.tile' // Include the last rule for deletion
      ) {
        styleSheet.deleteRule(i)
      }
    }
  }

  isPretty = !isPretty // Toggle state
})
