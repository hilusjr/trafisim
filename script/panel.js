const addButton = document.querySelector('.add-button')
const addSelectionContainer = document.querySelector('.add-selection-container')
const trafficLightsSelection = document.querySelector(
  '.traffic-lights-selection'
)
const removeLightsButton = document.querySelector('.remove-lights-button')
const setTimingButton = document.querySelector('.set-timing-button')

addButton.addEventListener('click', () => {
  addSelectionContainer.style.display = 'flex'
})

trafficLightsSelection.addEventListener('click', () => {
  createSettingsCard()
  createTrafficLights()
})

removeLightsButton.addEventListener('click', removeTrafficLights)

setTimingButton.addEventListener('click', setTrafficLightsTiming)
