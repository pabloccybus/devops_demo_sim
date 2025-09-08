'use strict'
const statesEnum = Object.freeze({
  idle: 0,
  changeover: 10,
  processing: 20,
  error: 30
})

class CNC {
  constructor () {
    this.state = statesEnum.idle
    this.x = 0
    this.y = 0
    this.posCnt = 0
    this.maxCordX = 400_000
    this.maxCordY = 400_000
    this.directionCordX = true
    this.directionCordY = true
    this.rpm = 0
    this.current = 0
    this.workpieces = 0
    this.badPart = false

    setInterval(() => {
      // State
      switch (this.state) {
        case statesEnum.idle:
          if ((Math.random() * 1.005) > 1) { // Chance to change state
            if (Math.floor(Math.random() * 10 + 1) % 5 !== 0) {
              this.state = statesEnum.processing
              this.y = 200_000
              this.directionCordX = true
              this.directionCordY = true
            } else {
              this.state = statesEnum.changeover
            }
          }
          break

        case statesEnum.changeover:
          if ((Math.random() * 1.03) > 1) { // Chance to change state
            this.state = statesEnum.processing
            this.y = 200_000
            this.directionCordX = true
            this.directionCordY = true
          }
          break

        case statesEnum.processing:
          if ((Math.random() * 1.005) > 1) { // Chance to change state
            if (Math.floor(Math.random() * 10 + 1) % 10 === 0) {
              this.state = statesEnum.error
            } else {
              this.state = statesEnum.idle
            }
            this.posCnt = 0
            this.x = 0
            this.y = 0
            this.rpm = 0
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

      // RPM
      if (this.state === statesEnum.processing) {
        let _rpm = Math.pow(this.posCnt, 4)
        if (_rpm > 18_000) {
          _rpm = 18_000 + (Math.random() * 2)
        }
        this.rpm = _rpm
        this.posCnt += 1
      } else {
        this.rpm = 0
      }
    }, 1000)

    setInterval(() => {
      // Current
      if (this.state === statesEnum.processing) {
        this.current = 10 + (Math.random() * 2)
      } else {
        this.current = 2 + (Math.random() + 1)
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
    }, 30000)

    setInterval(() => {
      // X & Y
      if (this.state === statesEnum.processing) {
        if (this.directionCordX) {
          this.x += 50000
        } else {
          this.x -= 50000
        }

        if (this.x >= this.maxCordX || this.x <= 0) {
          this.directionCordX = !this.directionCordX
        }

        if (this.directionCordY) {
          this.y += 50000
        } else {
          this.y -= 50000
        }

        if (this.y >= this.maxCordY || this.y <= 0) {
          this.directionCordY = !this.directionCordY
        }
      }
    }, 3000)
  }
}

module.exports = CNC
