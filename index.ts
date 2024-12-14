import express from 'express'
import * as core from 'express-serve-static-core'
import { AppRoutes } from './src/routes/routes'
import { configDotenv } from 'dotenv'

const app: core.Express = express()
const cors = require('cors')

configDotenv()

app.use(cors())

// Register routes
const appRoutes = new AppRoutes()
appRoutes.registerRoutes(app)

const port = process.env.PORT ?? 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
