import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { FiltroPassagem } from 'src/app/core/types/type';

@Component({
  selector: 'app-filtros-complementares',
  templateUrl: './filtros-complementares.component.html',
  styleUrls: ['./filtros-complementares.component.scss']
})
export class FiltrosComplementaresComponent {
  @Output() realizarBusca = new EventEmitter<FiltroPassagem>();
  constructor(
    public formBuscaService: FormBuscaService) { }

  buscar() {
    if (!this.formBuscaService.filtroEstaValido) {
      this.formBuscaService.formBusca.markAllAsTouched();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      return
    }
    this.realizarBusca.emit(this.formBuscaService.obterFiltros())
  }
}
