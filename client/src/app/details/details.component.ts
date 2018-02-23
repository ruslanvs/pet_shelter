import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

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

}
