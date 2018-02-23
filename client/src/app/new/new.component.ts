import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
// import { AllComponent } from "./../all/all.component";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  new_pet = {};
  pets_create_res = {};

  constructor(
    private _myServiceService: MyServiceService,
    // private _allComponent: AllComponent
  ) { }

  ngOnInit() {
  }

  pets_create(){
    let observable = this._myServiceService.pets_create( this.new_pet )
    observable.subscribe( data => {
      this.pets_create_res = data
      console.log( "pets_create in new.component.ts:", this.pets_create_res )
      // this._allComponent.pets_get();
    })
    this.new_pet = {
      name: "",
      type: "",
      desc: "",
      skill1: "",
      skill2: "",
      skill3: "",
    }
    
    
  }

}
