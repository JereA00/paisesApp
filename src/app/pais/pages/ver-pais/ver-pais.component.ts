import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  paisSelect!: Country;
  tipo : any;

  constructor(
    private activatedRoute : ActivatedRoute,
    private paisService: PaisService
  ) { 
  }

  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.paisService.getPaisPorCapital(id)),
      tap( console.log )
    )
    .subscribe( pais => this.paisSelect = pais);

    // this.activatedRoute.params
    // .subscribe( ({id}) => {

    //    this.paisService.getPaisPorCapital(id)
    //    .subscribe(pais => {
    //      //this.paisSelect = pais;
    //      console.log(pais);
    //      this.paisSelect = pais;
    //    }); 

    // })   
    
  }

}
