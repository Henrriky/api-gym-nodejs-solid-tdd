/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify from 'fastify'
import { register } from 'module'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)