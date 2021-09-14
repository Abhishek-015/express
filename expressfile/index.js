const express = require('express')
const app = express()
const user=require("./MOCK_DATA.json")
const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome to Homepage')
})

app.get('/about', (req, res) => {
  res.send(user)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
