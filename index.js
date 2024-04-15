const { checkDB, syncModels } = require('./db/index')
const addRelations = require('./db/relations')

const router = require('./api/routes/index')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

async function dbConnect() {
  try {
    await checkDB()
    addRelations()
    await syncModels()
  } catch (error) {
    console.log(error)
  }
}

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.listen(port, async () => {
  try {
    await dbConnect()
    console.log(`--> Server is running in port ${port}`)
  } catch (error) {
    console.log(error)
  }
})

app.use('/api', router)