import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { FiltroPassagem } from 'src/app/core/types/type';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  @Output() realizarBusca = new EventEmitter<FiltroPassagem>();
  constructor( 
    public formBuscaService : FormBuscaService) {}

  buscar () {
    if (this.formBuscaService.filtroEstaValido) {
      this.realizarBusca.emit(this.formBuscaService.obterFiltros())
    }
  }
}
