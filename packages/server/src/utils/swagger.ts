import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'

import fs from 'fs'
import YAML from 'yaml'

const options  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(options)

function swaggerDocs(app: Express, port: string) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  console.log(`Docs are on localhost:${port}/docs`) // api/docs?
}

export default swaggerDocs
