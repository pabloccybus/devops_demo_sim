'use strict'

const snap7 = require('node-snap7')
const Cleaning = require('./src/cleaning')

const s7server = new snap7.S7Server()
const machine = new Cleaning()

// Set up event listener
s7server.on('event', function (event) {
  console.log(s7server.EventText(event))
})

// Create a new Buffer and register it to the server as DB1
const db1 = Buffer.alloc(19)
s7server.RegisterArea(s7server.srvAreaDB, 1, db1)

// Start the server
s7server.StartTo('0.0.0.0')

setInterval(() => {
  // state
  db1.writeInt16BE(machine.state, 0)

  // temperature
  db1.writeFloatBE(machine.temperature, 2)

  // pressure
  db1.writeFloatBE(machine.pressure, 6)

  // frequency
  db1.writeFloatBE(machine.frequency, 10)

  // workpieces
  db1.writeInt32BE(machine.workpieces, 14)

  // badPart
  db1.writeUInt8(machine.badPart, 18)

  s7server.SetArea(s7server.srvAreaDB, 1, db1)
}, 1000)
