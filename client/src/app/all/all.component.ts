import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
// import { ActivatedRoute, Params, Router } from "@angular/router";
import { Router } from "@angular/router";


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  pets_all = {};
  // pets_one = {};
  

  constructor(
    private _myServiceService: MyServiceService,
    private router: Router
  ){}

  ngOnInit() {
    this.pets_get();
  }

  pets_get(){
    let observable = this._myServiceService.pets_get();
    observable.subscribe( data => {
      this.pets_all = data;
      console.log( "pets_get in all.component.ts says:", this.pets_all );
    })
  }

  // pets_get_one( id ){
  //   let observable = this._myServiceService.pets_get_one( id );
  //   observable.subscribe( data => {
  //     this.pets_one = data;
  //     console.log( "pets_get_one in details.component.ts:", this.pets_one );
  //   })
  // }

  details( id ){
    this.router.navigate([`/details/${id}`]);
  }

  edit( id ){
    this.router.navigate([`/edit/${id}`]);
  }

}
