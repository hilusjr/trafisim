class LightsSettings {
  constructor(lights) {
    this.lights = lights
    this.settingsElement = null

    this.init()
  }

  init() {
    const settingsElement = document.createElement('div')
    settingsElement.classList.add('lights-settings')
    settingsElement.innerHTML = `
      <div>Traffic lights ${this.lights.codename.toUpperCase()}</div>
    `
    lightsSettingsContainer.appendChild(settingsElement)
  }
}
