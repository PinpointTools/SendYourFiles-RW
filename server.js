const express = require('express')
const path = require('path')

const app = express()
const port = 34537 // which stans for "files" :3
const os = require('os')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'))
})

const figlet = `
  ______   _______
 / ___\\ \\ / /  ___|
 \\___ \\\\ V /| |_
  ___) || | |  _|
 |____/ |_| |_|
`

app.listen(port, () => {
  console.log(`${figlet}`)
  console.log(`Server started at http://localhost:${port}`)
})