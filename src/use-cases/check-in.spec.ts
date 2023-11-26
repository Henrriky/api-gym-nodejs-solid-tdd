import { beforeEach, describe, afterEach, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumbersOfCheckInsError } from './errors/max-numbers-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check in Use Case', () => {

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -23.612863245866627,
      longitude: -46.48039255795123
    })

    // Antes de cada teste crie o MOCK
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Após cada teste resetar para a data atual
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.612863245866627,
      userLongitude: -46.48039255795123,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.612863245866627,
      userLongitude: -46.48039255795123
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.612863245866627,
        userLongitude: -46.48039255795123,
      })
    ).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.612863245866627,
      userLongitude: -46.48039255795123,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.612863245866627,
      userLongitude: -46.48039255795123,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.603071661598566),
      longitude: new Decimal(-46.482431036784405),
      created_at: new Date()
    })

    await expect(() => 
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.612863245866627,
        userLongitude: -46.48039255795123,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)

  })
})