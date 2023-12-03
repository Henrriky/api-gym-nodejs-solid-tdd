import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumbersOfCheckInsError } from '@/use-cases/errors/max-numbers-of-check-ins-error'


export async function create (request: FastifyRequest, reply: FastifyReply) {

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }), 
  })


  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.query)
  const { sub: userId } = request.user

  try {
    const checkInUseCase = makeCheckInUseCase();
    const { checkIn } = await checkInUseCase.execute({
      userId,
      gymId,
      userLongitude: longitude,
      userLatitude: latitude
    })

    return reply.status(201).send({
      checkIn
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof MaxDistanceError) {
      return reply.status(400).send({ message: error.message })
    }
    if (error instanceof MaxNumbersOfCheckInsError) {
      return reply.status(403).send({ message: error.message })
    }

    throw error
  }

}
