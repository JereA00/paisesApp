import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino : string = ''
  hayError: boolean = false;
  paises : Country[] = [];

  paisesSugeridos : Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  buscar( termino : string ){
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino).
    subscribe(paises =>{
      this.paises = paises;
    }, err => {
      this.hayError = true;
      this.paises = [];
    });
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    //Crear sugerencias

    this.paisService.buscarPais(termino)
    .subscribe( 
      paises =>{
        if(paises.length > 0){
          this.paisesSugeridos = paises.splice(0,5);
        }
        else{
          this.paisesSugeridos = [];
        }
        
      }, 
      error => this.paisesSugeridos = []
    
    );
  }

  buscarSugerido (termino: string){
    this.buscar(termino);
  }
}
