import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MyServiceService {

  constructor( private _myService: HttpClient ) {}

  pets_get(){
    return this._myService.get( "pets" );
  }

  pets_get_one( id ){
    return this._myService.get( `/pets/${id}` );
  }

  pets_create( new_pet ){
    return this._myService.post( "/pets", new_pet )
  }

  pets_update( id, updated_pet ){
    return this._myService.put( `/pets/${id}`, updated_pet );
  }
}
