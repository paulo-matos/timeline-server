import 'dotenv/config'

import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'

import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { memoriesRoutes } from './routes/memories'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true, // all front-end URLs can access our back-end
  // TO-DO
  // origin: ['http://localhost:3000'] // Recommended to add production urls
})

app.register(jwt, {
  secret: `${process.env.JWT_SECRET}`,
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('✈  HTTP server running on http://localhost:3333')
  })
