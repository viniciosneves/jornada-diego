import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { PassagemService } from 'src/app/core/services/passagem.service';
import { Destaques, FiltroPassagem, Passagem, Resultado } from 'src/app/core/types/type';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

  passagens: Passagem[] = []
  destaques?: Destaques

  constructor(private formBuscaService: FormBuscaService,
    private passagemService: PassagemService) {

  }

  ngOnInit(): void {
    const filtroPadrao: FiltroPassagem = {
      dataIda: new Date().toISOString(),
      pagina: 1,
      porPagina: 50,
      somenteIda: false,
      passageirosAdultos: 1,
      tipo: 'Executiva'
    }
    const filtro = this.formBuscaService.filtroEstaValido ?
      this.formBuscaService.obterFiltros()
      : filtroPadrao
    this.passagemService.getPassagens(filtro)
      .pipe(take(1))
      .subscribe(
        res => {
          this.passagens = res.resultado
          this.formBuscaService.formBusca.patchValue({
            precoMin: res.precoMin,
            precoMax: res.precoMax
          })
          this.obterDestaques()
        } 
      )
  }

  obterPassagens(filtro: FiltroPassagem): void {
    console.log('filtro => ', filtro)
    this.passagemService.getPassagens(filtro).subscribe(
      res => {
        this.passagens = res.resultado
      }
    )
  }

  obterDestaques() {
    this.destaques = this.passagemService.encontrarPassagens(this.passagens)
  }
}
