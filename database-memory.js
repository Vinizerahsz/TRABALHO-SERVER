import { randomUUID } from "crypto"

export class DatabaseMemory{
#monitores = new Map()

  list(search){
    return Array.from(this.#monitores.entries()).map((monitoresArray) =>{

      const id = monitoresArray[0]
      const data = monitoresArray[1]

      return {
        id,
        ...data
      }
    })
    .filter(monitor => {
      if (search){
        return monitor.titulo.includes(search)
      }
      return true
    })
  }
  create(monitor){
    const monitorId = randomUUID()
    this.#monitores.set(monitorId, monitor)
  }
  update(id, monitor){
    this.#monitores.set(id, monitor)
  }
  delete(id, monitor){
    this.#monitores.delete(id, monitor)
  }
}
