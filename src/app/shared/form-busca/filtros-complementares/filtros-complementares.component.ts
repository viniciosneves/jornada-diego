import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { PassagemService } from 'src/app/core/services/passagem.service';
import { FiltroPassagem } from 'src/app/core/types/type';

@Component({
  selector: 'app-filtros-complementares',
  templateUrl: './filtros-complementares.component.html',
  styleUrls: ['./filtros-complementares.component.scss']
})
export class FiltrosComplementaresComponent {
  @Output() realizarBusca = new EventEmitter<FiltroPassagem>();
  constructor(
    public formBuscaService: FormBuscaService,
    private passagensService: PassagemService) { }

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

  limparFiltrosComplementares () {
    this.formBuscaService.formBusca.patchValue({
      conexoes: null,
      companhias: null,
      precoMin: this.passagensService.precoMin,
      precoMax: this.passagensService.precoMax,
    })
  }
}
