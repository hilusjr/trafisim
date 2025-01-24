const container = document.querySelector('.container')
const vehicles = document.querySelector('.vehicles')

let tramStopWE = null
let tramStopEW = null

const tiles = []
const vehicleTypes = ['car', 'tram']
const tramRoutes = [routeTramWE(), routeTramEW()]
const routes = [
  routeCarWE1(),
  routeCarWE2(),
  routeCarWN(),
  routeCarWS(),
  routeCarEW1(),
  routeCarEW2(),
  routeCarEN(),
  routeCarES(),
  routeCarNS(),
  routeCarNW(),
  routeCarNE(),
  routeCarSN(),
  routeCarSW(),
  routeCarSE(),
]

document.addEventListener('keydown', event => {
  if (event.key === 'F11') {
    window.location.reload()
  }
})

let viewportMeta = document.querySelector('meta[name="viewport"]')

if (!viewportMeta) {
  viewportMeta = document.createElement('meta')
  viewportMeta.name = 'viewport'
  document.head.appendChild(viewportMeta)
}

if (window.innerWidth <= 1920)
  viewportMeta.content =
    'width=device-width, initial-scale=0.67, maximum-scale=0.67, user-scalable=no'

window.addEventListener('load', () => {
  createBoard()
  setTramStops()
  setInterval(createVehicle, 500)
})

function createVehicle() {
  const vehicleType = Math.random() < 0.95 ? vehicleTypes[0] : vehicleTypes[1]

  const vehicleRoute =
    vehicleType == 'tram'
      ? tramRoutes[Math.floor(Math.random() * tramRoutes.length)]
      : routes[Math.floor(Math.random() * routes.length)]

  new Vehicle(vehicleType, vehicleRoute)
}

function setTramStops() {
  tramStopWE = tiles[170]
  tramStopEW = tiles[121]

  tramStopWE.setState('occupied', 'vehicle')
  tramStopEW.setState('occupied', 'vehicle')
}
