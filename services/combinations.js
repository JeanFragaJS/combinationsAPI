import { Db, Catalog} from '../clients/index.js'
import { NotFoundError } from '../err/errors.js'



export class ServicesCombinations {

  async getById ( productId ) {

    const retrieve = []

    const db = new Db()
    const { combinations } = await db.getDocByFields()
    
    if ( !combinations[productId] ) {
      throw new NotFoundError()
    } 
      const product = combinations[productId]

    for (let i in  product.combinations ) {
      const [ key ] = Object.getOwnPropertyNames(product.combinations[i])
      const catalog = new Catalog()

      const catalogItem = await catalog.getDataById(key)
      retrieve.push(catalogItem)
    }

    let message
    retrieve.length > 0 ? retrieve : message = { message: "There are no combinations for this product"}
 
    return retrieve;
  }
}
