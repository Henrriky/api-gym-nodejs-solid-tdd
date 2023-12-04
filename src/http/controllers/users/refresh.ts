/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from 'fastify'


export async function refresh(request: FastifyRequest, reply: FastifyReply) {

  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    {
      role: request.user.role
    },
    {
    sign: {
      sub: request.user.sub,
    }
  })

  const refreshToken = await reply.jwtSign(
    {
      role: request.user.role
    },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d'
      }
    }
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // HTTPs, front-end cannot access refresh token cookie
      sameSite: true, // Cookie can only be accessed on the same domain
      httpOnly: true, // Only back-end can access refresh token cookie
    })
    .status(200)
    .send({
      token,
    })
}
