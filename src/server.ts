import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true, // all front-end URLs can access our back-end
  // TO-DO
  // origin: ['http://localhost:3000'] // Recommended to add production urls
})

app.register(jwt, {
  secret: `${process.env.JWT_SECRET}`,
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('✈  HTTP server running on http://localhost:3333')
  })
