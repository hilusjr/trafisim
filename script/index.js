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

window.addEventListener('load', () => {
  createBoard()
  setTramStops()
  // setTimeout(createVehicle, 500)
  setInterval(createVehicle, 1000)
})

function createVehicle() {
  const vehicleType = Math.random() < 0.95 ? vehicleTypes[0] : vehicleTypes[1]
  // console.log(vehicleType)
  const vehicleRoute =
    vehicleType == 'tram'
      ? tramRoutes[Math.floor(Math.random() * tramRoutes.length)]
      : routes[Math.floor(Math.random() * routes.length)]
  // console.log(vehicleRoute)

  const vehicle = new Vehicle(vehicleType, vehicleRoute)

  // const stopButton = document.getElementById('stopButton')
  // stopButton.addEventListener('click', () => vehicle.stopMoving())

  // const unButton = document.getElementById('unButton')
  // unButton.addEventListener('click', () => tile273.setState('free'))
}

function setTramStops() {
  tramStopWE = tiles[170]
  tramStopEW = tiles[121]

  tramStopWE.setState('occupied', 'vehicle')
  tramStopEW.setState('occupied', 'vehicle')
}
