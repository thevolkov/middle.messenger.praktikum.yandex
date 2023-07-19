const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3030
const buildDir = path.join(__dirname, 'dist')
const index = path.join(buildDir, 'index.html')

app.use(express.static(buildDir))

app.get('*', function (request, response) {
  response.sendFile(index)
})

app.listen(PORT, function () {
  console.log(`// СЕРВЕР ЗАПУЩЕН // ПОРТ: ${PORT}`)
})
