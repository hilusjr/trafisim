const sensorsSelection = document.querySelector('.sensors-selection')
const sensorsSettings = document.querySelector('.sensors-settings')
const setSensorsButton = document.querySelector('.set-sensors-button')
const sensorsInput = document.querySelector('.sensors-input')
const removeSensorsButton = document.querySelector('.remove-sensors-button')

let spawnInterval = 3000
let requests = []
let isBusy = false
let isWeEwLocked = false
let isSnNsLocked = false
let sensorLightsWeEwGroup = []
let sensorLightsSnNsGroup = []
let sensorLightsTime = {
  green: 4000,
  delay: 1000,
}

sensorsSelection.addEventListener('click', () => {
  createSensorTrafficLights()
  setSensors()
  setVehicleSpawnRate(spawnInterval)
  addSelectionContainer.style.display = 'none'
  panel.style.display = 'flex'
  sensorsSettings.style.display = 'flex'
  sensorsInput.value = spawnInterval / 1000
  hud.style.display = 'block'
  lightsSettings.style.display = 'none'
  rulesSettings.style.display = 'none'
  removeTrafficLights()
  removeTrafficRules()
  selected = ['traffic-lights', 'sensors']
})

setSensorsButton.addEventListener('click', () => {
  setVehicleSpawnRate(sensorsInput.value * 1000)
})

removeSensorsButton.addEventListener('click', removeSensors)

function createSensorTrafficLights() {
  sensorLightsWeEwGroup = [
    new TrafficLight('car', 'we', null, [220, 266]),
    new TrafficLight('car', 'ew', null, [25, 71]),
    new TrafficLight('tram', 'we', null, [tramStopWE.index]),
    new TrafficLight('tram', 'ew', null, [tramStopEW.index]),
  ]
  sensorLightsSnNsGroup = [
    new TrafficLight('car', 'sn', null, [302]),
    new TrafficLight('car', 'ns', null, [345]),
  ]

  sensorLightsWeEwGroup.forEach(lights => lights.setLights('red'))
  sensorLightsSnNsGroup.forEach(lights => lights.setLights('red'))
}

function setSensors() {
  const sensorsIds = [
    [217, 'weew'],
    [219, 'weew'],
    [263, 'weew'],
    [265, 'weew'],
    [74, 'weew'],
    [72, 'weew'],
    [28, 'weew'],
    [26, 'weew'],
    [348, 'snns'],
    [346, 'snns'],
    [299, 'snns'],
    [301, 'snns'],
    [122, 'weew'],
    [169, 'weew'],
  ]
  sensorsIds.forEach(index => {
    tiles[index[0]].isSensor = true
    tiles[index[0]].lightsAssigned = index[1]
  })
}

function requestGreenLight(lightsAssigned, nextTile) {
  if (nextTile?.state === 'occupied') {
    if (!requests.includes(lightsAssigned)) {
      requests.push(lightsAssigned)
      console.log('Request added:', lightsAssigned, 'Queue:', requests)
    }
  }

  if (!isBusy) changeLights(requests[0])
}

function changeLights(lightsAssigned) {
  if (!lightsAssigned) {
    console.log('No valid lights assigned. Exiting.')
    return
  }

  if (isBusy) {
    console.log('Lights are busy. Waiting for the current cycle to finish.')
    return
  }

  isBusy = true
  console.log('Changing lights for:', lightsAssigned)

  if (lightsAssigned === 'weew') {
    sensorLightsWeEwGroup.forEach(lights => lights.setLights('green'))
    changeIndicators('we-ew', 'green')
    setTimeout(() => {
      sensorLightsWeEwGroup.forEach(lights => lights.setLights('red'))
      changeIndicators('we-ew', 'red')
      finishRequest(lightsAssigned)
    }, sensorLightsTime.green)
  } else if (lightsAssigned === 'snns') {
    sensorLightsSnNsGroup.forEach(lights => lights.setLights('green'))
    changeIndicators('sn-ns', 'green')
    setTimeout(() => {
      sensorLightsSnNsGroup.forEach(lights => lights.setLights('red'))
      changeIndicators('sn-ns', 'red')
      finishRequest(lightsAssigned)
    }, sensorLightsTime.green)
  } else {
    console.error('Unknown lightsAssigned:', lightsAssigned)
    isBusy = false
  }
}

function finishRequest(lightsAssigned) {
  console.log('Finishing request for:', lightsAssigned)
  requests = requests.filter(req => req !== lightsAssigned)
  isBusy = false

  if (requests.length > 0) {
    console.log('Processing next request:', requests[0])
    changeLights(requests[0])
  } else {
    console.log('No more pending requests.')
  }
}

function removeSensors() {
  location.reload()
}
