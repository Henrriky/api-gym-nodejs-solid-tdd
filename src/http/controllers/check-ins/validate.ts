import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'


export async function validate (request: FastifyRequest, reply: FastifyReply) {

  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

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
