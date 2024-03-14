const express = require("express")
const { clickWorker } = require("./clickWorker")

const app = express()

const PORT = process.env.PORT || 4000

app.get("/", (req, res) => {

})
app.get("/keep-alive", (req, res) => {
  res.send("Alive {200}!");
  console.log("THE SERVER WAS PINGED");
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
