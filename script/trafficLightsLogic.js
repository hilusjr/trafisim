const redInput = document.querySelector('.red-input')
const greenInput = document.querySelector('.green-input')
const lightsSettings = document.querySelector('.lights-settings')
const alertSpan = document.createElement('span')

let isValidated = true
let isRemoved = true
let trafficLights = []
let trafficLightIntervals = []
let activeTimeouts = []

let weEwTime = {
  green: 5000,
  red: 8000,
  delay: 2000,
}

let snNsTime = {
  green: weEwTime.red - 2 * weEwTime.delay,
  red: weEwTime.green + weEwTime.delay,
  delay: weEwTime.delay,
}

function createSettingsCard() {
  redInput.value = weEwTime.red / 1000
  greenInput.value = weEwTime.green / 1000
}

function createTrafficLights() {
  removeTrafficLights()
  isRemoved = false

  trafficLights = [
    new TrafficLight('car', 'we', weEwTime, [220, 266]),
    new TrafficLight('car', 'ew', weEwTime, [25, 71]),
    new TrafficLight('tram', 'we', weEwTime, [tramStopWE.index]),
    new TrafficLight('tram', 'ew', weEwTime, [tramStopEW.index]),
    new TrafficLight('car', 'sn', snNsTime, [302]),
    new TrafficLight('car', 'ns', snNsTime, [345]),
  ]

  synchronizeLights(trafficLights)

  addSelectionContainer.style.display = 'none'
  hud.style.display = 'block'
  lightsSettings.style.display = 'flex'
}

function synchronizeLights(trafficLights) {
  const weEwGroup = trafficLights.filter(
    light => light.codename === 'we' || light.codename === 'ew'
  )
  const snNsGroup = trafficLights.filter(
    light => light.codename === 'sn' || light.codename === 'ns'
  )

  function toggleGroup(group, state) {
    group.forEach(light => light.setLights(state))
  }

  function runCycle() {
    if (isRemoved) return
    console.log('Cycle started:', new Date().getTime() / 1000)
    toggleGroup(weEwGroup, 'red')
    toggleGroup(snNsGroup, 'red')
    changeIndicators('we-ew', 'red')
    changeIndicators('sn-ns', 'red')

    activeTimeouts.push(
      setTimeout(() => {
        if (isRemoved) return
        toggleGroup(weEwGroup, 'green')
        changeIndicators('we-ew', 'green')
        activeTimeouts.push(setTimeout(setTramStops, 500))

        console.log('WE/EW green:', new Date().getTime() / 1000)

        activeTimeouts.push(
          setTimeout(() => {
            if (isRemoved) return
            toggleGroup(weEwGroup, 'red')
            changeIndicators('we-ew', 'red')
            console.log('WE/EW red:', new Date().getTime() / 1000)
          }, weEwTime.green)
        )
      }, weEwTime.red)
    )

    activeTimeouts.push(
      setTimeout(() => {
        if (isRemoved) return
        toggleGroup(snNsGroup, 'green')
        changeIndicators('sn-ns', 'green')
        console.log('SN/NS green:', new Date().getTime() / 1000)

        activeTimeouts.push(
          setTimeout(() => {
            if (isRemoved) return
            toggleGroup(snNsGroup, 'red')
            changeIndicators('sn-ns', 'red')
            console.log('SN/NS red:', new Date().getTime() / 1000)
          }, snNsTime.green)
        )
      }, snNsTime.delay)
    )
  }

  runCycle()
  const interval = setInterval(() => {
    if (!isRemoved) runCycle()
    console.log(snNsTime.red, snNsTime.green, snNsTime.delay)
  }, weEwTime.green + weEwTime.red)

  trafficLightIntervals.push(interval)
}

function setTrafficLightsTiming() {
  isValidated = true
  validateTiming()
  if (!isValidated) return
  alertSpan.remove()
  removeTrafficLights()
  isRemoved = false
  weEwTime = {
    green: greenInput.value * 1000,
    red: redInput.value * 1000,
    delay: weEwTime.delay,
  }
  snNsTime = {
    green: weEwTime.red - 2 * weEwTime.delay,
    red: weEwTime.green + weEwTime.delay,
    delay: weEwTime.delay,
  }
  createTrafficLights()
  console.log(snNsTime.red, snNsTime.green, snNsTime.delay)
}

function removeTrafficLights() {
  isRemoved = true

  trafficLightIntervals.forEach(interval => clearInterval(interval))
  trafficLightIntervals = []

  activeTimeouts.forEach(timeout => clearTimeout(timeout))
  activeTimeouts = []

  trafficLights.forEach(light => {
    light.targetTiles.forEach(tileIndex => {
      tiles[tileIndex]?.setState('free', 'lights')
    })
    light.lightsElement?.remove()
  })

  setTramStops()

  trafficLights = []
  console.log('Traffic lights removed and tiles reset.')
  hud.style.display = 'none'
  lightsSettings.style.display = 'none'
}

function validateTiming() {
  alertSpan.style.color = 'red'
  if (redInput.value < 5) {
    alertSpan.textContent = 'Red light timing must be greater or equal to 5!'
    lightsSettings.appendChild(alertSpan)
    redInput.value = weEwTime.red / 1000
    isValidated = false
  }
  if (redInput.value < greenInput.value) {
    alertSpan.textContent =
      'Red light timing must be greater or equal to green light!'
    lightsSettings.appendChild(alertSpan)
    isValidated = false
  }
  if (greenInput.value < 1) {
    alertSpan.textContent = 'Green light timing cannot be less than 1 second!'
    lightsSettings.appendChild(alertSpan)
    greenInput.value = weEwTime.green / 1000
    isValidated = false
  }
}
