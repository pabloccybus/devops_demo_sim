const { json } = require('express')
const express = require('express')
const app = express()

app.get('/tolerance', function (req, res) {
  res.send(JSON.stringify({
      min: 18 + (Math.random() + 1),
      max: 29 + (Math.random() + 1)
  }))
})

app.listen(8080)