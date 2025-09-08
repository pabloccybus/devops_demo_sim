'use strict'
const statesEnum = Object.freeze({
  idle: 0,
  changeover: 10,
  processing: 20,
  error: 30
})

class Cleaning {
  constructor () {
    this.state = statesEnum.idle
    this.cnt = 0
    this.temperature = 0
    this.pressure = 0
    this.frequency = 0
    this.workpieces = 0
    this.badPart = false

    setInterval(() => {
      // State
      switch (this.state) {
        case statesEnum.idle:
          if ((Math.random() * 1.005) > 1) { // Chance to change state
            if (Math.floor(Math.random() * 10 + 1) % 5 !== 0) {
              this.state = statesEnum.processing
            } else {
              this.state = statesEnum.changeover
            }
          }
          break

        case statesEnum.changeover:
          if ((Math.random() * 1.03) > 1) { // Chance to change state
            this.state = statesEnum.processing
          }
          break

        case statesEnum.processing:
          if ((Math.random() * 1.005) > 1) { // Chance to change state
            if (Math.floor(Math.random() * 10 + 1) % 10 === 0) {
              this.state = statesEnum.error
            } else {
              this.state = statesEnum.idle
            }
            this.cnt = 0
            this.temperature = 0
            this.pressure = 0
            this.frequency = 0
          }
          break

        case statesEnum.error:
          if ((Math.random() * 1.005) > 1) { // Chance to change state
            this.state = statesEnum.idle
          }
          break

        default:
          this.state = statesEnum.error
      }

      // Temperature
      // if (this.state === statesEnum.processing) {
      //   this.temperature = 113 + (Math.random() * 2)
      // } else {
        this.temperature = 20 + (Math.random() + 1)
      // }

      // frequency
      if (this.state === statesEnum.processing) {
        this.frequency = 110_000
      } else {
        this.frequency = 0
      }

      // pressure
      if (this.state === statesEnum.processing) {
        let _pressure = 101_325 - Math.pow(this.cnt, 4)
        if (_pressure < -60000) {
          _pressure = -60000 + (Math.random() * 2)
        }
        this.pressure = _pressure
        this.cnt += 1
      } else {
        this.pressure = 101_325 + (Math.random() * 2)
      }

      // workpieces / bad part
      let _badPart = false
      if (this.state === statesEnum.processing) {
        const _workpieces = this.workpieces + 1
        if (_workpieces > 10_000) {
          this.workpieces = 0
        } else {
          this.workpieces = _workpieces
          _badPart = Math.random() < 0.05
        }
      }
      this.badPart = _badPart
    }, 1000)
  }
}

module.exports = Cleaning
