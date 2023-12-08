import {fastify} from 'fastify'
import {DatabaseMemory} from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
  return 'Rota Padrão'
})

server.post('/monitor', (request, reply) => {
  const {npedido, preco, polegadas} = request.body

  database.create({
    npedido: npedido,
    preco: preco,
    polegadas: polegadas,
  })
  
  return reply.status(201).send
})

server.get('/monitor', (request) => {
  const search = request.query.search
  console.log(search)
  const monitores = database.list(search)
  console.log(monitores)
  return monitores
})

server.put('/monitores/:id', (request, reply) => {
  const monitorId = request.params.id
  const { npedido, preco, polegadas} = request.body
  const monitor = database.update(monitorId, {
    npedido: npedido,
    preco: preco,
    polegadas: polegadas,
  })
  return reply.status(204).send()
})

server.delete('/monitores/:id', (request, reply) => {
  const monitorId = request.params.id

  database.delete(monitorId)

  return reply.status(204).send()
})

server.listen({
  port: 3333,
})
