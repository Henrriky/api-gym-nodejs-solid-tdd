import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../check-in"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeCheckInUseCase() {

  const gymsRepository = new PrismaGymsRepository()
  const checkInsRepository = new PrismaCheckInsRepository()
  const usecase = new CheckInUseCase(checkInsRepository, gymsRepository)
  return usecase
}