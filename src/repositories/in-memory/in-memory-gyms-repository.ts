import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-two-coordinates";

export class InMemoryGymsRepository implements GymsRepository {

  public itens: Gym[] = []

  async findById(id: string) {
    const gym = this.itens.find(item => item.id === id)
    if (!gym) {
      return null
    }

    return gym
  }

  async findManyNearby(coordinates: FindManyNearbyParams) {
    return this.itens.filter(item => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: coordinates.latitude, longitude: coordinates.longitude },
        { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
      )
      return distance < 10
    })
  }

  async searchMany(query: string, page: number) {

    const indexStart = (page - 1) * 20
    const indexEnd = (page * 20)

    return this.itens
      .filter((item) => item.title.includes(query))
      .slice(indexStart, indexEnd)
  }

  async create(data: Prisma.GymCreateInput) {

    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date()
    }


    this.itens.push(gym)

    return gym

  }
}