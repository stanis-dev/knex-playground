import express from 'express'
import { knexPlayground } from './knex-playground'

const app = express()

knexPlayground()

export default app
