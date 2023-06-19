import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true, // all front-end URLs can access our back-end
  // TO-DO
  // origin: ['http://localhost:3000'] // Recommended to add production urls
})

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('✈  HTTP server running on http://localhost:3333')
  })
