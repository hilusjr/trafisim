const hud = document.querySelector('.hud')
const hudContainer = document.querySelector('.hud-container')
const lightsHud = document.querySelector('.lights-hud')
const weEwIndicators = document.querySelectorAll('.we-ew-indicator')
const snNsIndicators = document.querySelectorAll('.sn-ns-indicator')
const tramIndicators = document.querySelectorAll('.tram-indicator')

hudContainer.addEventListener('mouseover', () => {
  lightsHud.style.display = 'block'
})

hudContainer.addEventListener('mouseleave', () => {
  lightsHud.style.display = 'none'
})

function changeIndicators(group, state) {
  if (group === 'we-ew') {
    weEwIndicators.forEach(
      element =>
        (element.style.backgroundImage = `url(img/${state}-light-icon.svg`)
    )
    tramIndicators.forEach(
      element =>
        (element.style.backgroundImage = `url(img/${state}-tram-light.svg`)
    )
  }

  if (group === 'sn-ns') {
    snNsIndicators.forEach(
      element =>
        (element.style.backgroundImage = `url(img/${state}-light-icon.svg`)
    )
  }
}
