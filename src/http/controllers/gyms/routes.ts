import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { search } from "./search";
import { nearby } from "./nearby";


export async function gymsRoutes(app: FastifyInstance) {

  app.addHook('onRequest', verifyJWT) // Todos as nossas rotas abaixo do nosso hook executarão verifyJWT
 
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}