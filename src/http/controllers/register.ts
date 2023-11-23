/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcrypt'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'


export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  try {
    const prismaRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaRepository)
    await registerUseCase.execute({
      name,
      email,
      password
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
