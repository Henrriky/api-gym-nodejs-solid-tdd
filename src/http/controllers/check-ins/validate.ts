import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumbersOfCheckInsError } from '@/use-cases/errors/max-numbers-of-check-ins-error'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'


export async function validate (request: FastifyRequest, reply: FastifyReply) {

  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.query)

  try {
    const validateCheckInUseCase = makeValidateCheckInUseCase();
    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId,
    })

    return reply.status(204).send({
      checkIn
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }

}
