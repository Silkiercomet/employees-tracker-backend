const express = require("express")
const app = express()

const cors = require("cors")
// se inicializa dotenv y se define la ruta donde se encuentra el archivo env
require("dotenv").config({ path: "./config.env"})

const port = process.env.PORT || 5173
app.use(cors())
app.use(express.json())
app.use(require("./routes/records"))

// get driver connection
const db = require("./db/conn.js")

app.listen(port, () => {
    db.connectToServer(function (err) {
        if(err) console.log(err)
    })
    console.log("server is running")
})