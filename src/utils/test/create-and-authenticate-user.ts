import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Henrriky',
    email: 'riky.123@gmail.com',
    password: 'riky123'
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'riky.123@gmail.com',
    password: 'riky123'
  })

  const { token } = authResponse.body
  return {
    token,
  }
}