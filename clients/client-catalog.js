import { RequestError, ServerError } from '../err/errors.js'
import * as HttpUtil from '../utils/request.js'
import { config } from '../api-get-combination-by-id/config.js'



/*
  CLIENT CATALOG IMPLEMENTATION | Acessa a API de catologo vtex
*/

 export class Catalog {
  constructor ( request = new HttpUtil.Request()) {
    this.request = request
    this.appKey = config.appKey  
    this.appToken = config.appToken
    this.accountName = config.accountName
    this.environment = config.environment
  

  }

  async  getDataById (id) {
    try{
      const response = await this.request.get (
        `https://${this.accountName}.${this.environment}.com/api/catalog_system/pub/products/variations/${id}`,
        {
          headers: 
          {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": this.appKey,
            "X-VTEX-API-AppToken": this.appToken
          }
        }
      )
      console.log(JSON.stringify(response.data))
      return  response.data

    } catch (error) {
      const err = this.request.isRequestError(error)
      if ( err ) 
        throw  new RequestError( error )
      
      throw new ServerError( error )
    }

  }

  async normalizeData () {} // possível método privado para moldar os dados 
}




