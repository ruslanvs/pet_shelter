import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  pets_one = {};
  

  constructor(
    private _myServiceService: MyServiceService
    
  ) { }

  ngOnInit() {
    this.pets_get_one( "5a905b6541654b1509f5984f" );//>> fix
    
  }

  pets_get_one( id ){
    let observable = this._myServiceService.pets_get_one( id );
    observable.subscribe( data => {
      this.pets_one = data["data"][0];
      console.log( "pets_get_one in details.component.ts:", this.pets_one );
    })
  }

  pets_update( form_data ){
    let observable = this._myServiceService.pets_update( form_data._id, form_data );
    observable.subscribe( data => {
      console.log( "pets_update in edit.component.ts:", data );
    })
  }


}
