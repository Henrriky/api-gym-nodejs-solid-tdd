import { CheckIn, Prisma } from "@prisma/client"
import { CheckInsRepository } from "../check-ins-repository"
import { randomUUID } from "node:crypto"
import dayjs from "dayjs"

export class InMemoryCheckInsRepository implements CheckInsRepository {

  public itens: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('day')
    const endOfTheDay = dayjs(date).endOf('date')
    const checkInOnSameDate = this.itens.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at)
      const isOnSameDate = (
        (checkInDate.isAfter(startOfTheDay) || checkInDate.isSame(startOfTheDay)) && 
        (checkInDate.isBefore(endOfTheDay) || checkInDate.isSame(startOfTheDay))
      )
      return (checkin.user_id === userId && isOnSameDate)
    })

    if (!checkInOnSameDate) {
      return null
    }
    
    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {

    const indexStart = (page-1) * 20
    const indexEnd = (page*20)

    return this.itens.
      filter(checkin => checkin.user_id === userId)
     .slice(indexStart, indexEnd)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.itens.filter((item) => item.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }
    this.itens.push(checkIn)

    return checkIn
  }

}