import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcrypt'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {

    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -23.612863245866627,
      longitude: -46.48039255795123
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})