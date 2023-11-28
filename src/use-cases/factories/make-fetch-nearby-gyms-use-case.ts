import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const usecase = new FetchNearbyGymsUseCase(gymsRepository)

  return usecase
}