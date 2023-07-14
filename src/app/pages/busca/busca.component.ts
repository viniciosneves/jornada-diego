import { Component, OnInit } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { PassagemService } from 'src/app/core/services/passagem.service';
import { FiltroPassagem } from 'src/app/core/types/type';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  
  constructor(private formBuscaService: FormBuscaService,
    private passagemService: PassagemService) {

  }

  ngOnInit(): void {
    const filtroPadrao: FiltroPassagem = {
      dataIda: new Date().toISOString(),
      pagina: 1,
      porPagina: 50
    }
    const filtro = this.formBuscaService.filtroEstaValido ?
      this.formBuscaService.obterFiltros()
      : filtroPadrao
    this.obterPassagens(filtro)
  }

  obterPassagens(filtro: FiltroPassagem): void {
    this.passagemService.getPassagens(filtro).subscribe(
      res => {
        console.log(res)
      }
    )
  }

}
