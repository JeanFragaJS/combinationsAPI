import { RequestError, ServerError } from '../err/errors.js'
import * as HttpUtil from '../utils/request.js'



/*
  DB IMPLEMENTATION | Acessa o Vtex MasterData 
*/

 export class Db {
  constructor ( request = new HttpUtil.Request()) {
    this.request = request
    this.appKey =  process.env.APP_KEY
    this.appToken = process.env.APP_TOKEN 
    this.accountName = process.env.ACCOUNT_NAME 
    this.environment = process.env.ENVIRONMENT 
    this.entityName = process.env.ENTITY_NAME
    this.docId = process.env.DOCUMENT_ID

  }

  async  getDocByFields () {
    try{
      const response = await this.request.get (
        `http://${this.accountName}.${this.environment}.com/api/dataentities/${this.entityName}/documents/${this.docId}?_fields=combinations,topCombinations`,
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
          
      return  response.data

    } catch (error) {
      const err = this.request.isRequestError(error)
      if ( err ) 
        throw  new RequestError( error )
      
      throw new ServerError( error )
    }

  }
}




