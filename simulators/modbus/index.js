'use strict'

const net = require('net')
const modbus = require('jsmodbus')
const CNC = require('./src/cnc')

const netServer = new net.Server()
const machine = new CNC()

const holding = Buffer.alloc(24)
const server = new modbus.server.TCP(netServer, {
  holding: holding
})

netServer.listen(5502)

setInterval(() => {
  server.holding.writeUInt16BE(machine.state, 0)
  server.holding.writeUInt32BE(machine.x, 2)
  server.holding.writeUInt32BE(machine.y, 6)
  server.holding.writeFloatBE(machine.rpm, 10)
  server.holding.writeFloatBE(machine.current, 14)
  server.holding.writeUInt32BE(machine.workpieces, 18)
  server.holding.writeUInt16BE(machine.badPart, 22)
}, 1000)

server.on('connection', function (client) {
  console.log('New Connection')
})
