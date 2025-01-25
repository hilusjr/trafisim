const rulesSettings = document.querySelector('.rules-settings')
const trafficRulesSelection = document.querySelector('.traffic-rules-selection')
const switchButton = document.querySelector('.switch-rules-button')
const mainRoadSign = document.querySelector('.main-road-sign')
const subRoadSign = document.querySelector('.sub-road-sign')
const mainRoadSigns = document.querySelectorAll('.we-ew-sign, .tram-sign')
const subRoadSigns = document.querySelectorAll('.sn-ns-sign')
const removeRulesButton = document.querySelector('.remove-rules-button')

let trafficRulesApplied = false
let trafficRulesSwitched = false

trafficRulesSelection.addEventListener('click', () => {
  trafficRulesApplied = true
  addSelectionContainer.style.display = 'none'
  rulesSettings.style.display = 'flex'
  selected.push('traffic-rules')
})

switchButton.addEventListener('click', () => {
  console.log(mainRoadSign, subRoadSign)
  console.log('Before update:', mainRoadSign.src, subRoadSign.src)

  if (trafficRulesSwitched) {
    mainRoadSign.src = './img/priority-sign.svg'
    subRoadSign.src = './img/giveway-sign.svg'

    mainRoadSigns.forEach(element => {
      element.style.backgroundImage = 'url(/img/priority-sign.svg)'
    })
    subRoadSigns.forEach(element => {
      element.style.backgroundImage = 'url(/img/giveway-sign.svg)'
    })
  } else {
    mainRoadSign.src = './img/giveway-sign.svg'
    subRoadSign.src = './img/priority-sign.svg'
    mainRoadSigns.forEach(element => {
      element.style.backgroundImage = 'url(/img/giveway-sign.svg)'
    })
    subRoadSigns.forEach(element => {
      element.style.backgroundImage = 'url(/img/priority-sign.svg)'
    })
  }

  console.log('After update:', mainRoadSign.src, subRoadSign.src)

  trafficRulesSwitched = !trafficRulesSwitched
})

removeRulesButton.addEventListener('click', () => {
  trafficRulesApplied = false
  trafficRulesSwitched = false
  rulesSettings.style.display = 'none'
  selected = selected.filter(str => str !== 'traffic-rules')
})
