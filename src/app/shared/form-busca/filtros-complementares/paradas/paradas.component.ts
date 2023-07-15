import { Component } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';

interface OpcaoDeParada {
  display: string
  value: string
}

@Component({
  selector: 'app-paradas',
  templateUrl: './paradas.component.html',
  styleUrls: ['./paradas.component.scss']
})
export class ParadasComponent {

  selecionada?: OpcaoDeParada

  opcoes: OpcaoDeParada[] = [
    {
      display: "Direto",
      value: "0"
    },
    {
      display: "1 conexão",
      value: "1"
    },
    {
      display: "2 conexões",
      value: "2"
    },
    {
      display: "Mais de 2 conexões",
      value: "3"
    },
  ]

  constructor(
    private formBuscaService: FormBuscaService) { }

  alternarParada(opcao: OpcaoDeParada, checked: boolean): void {
    if (!checked) {
      this.selecionada = undefined
      this.formBuscaService.formBusca.patchValue({
        conexoes: null
      })
      return
    }
    this.selecionada = opcao  
    this.formBuscaService.formBusca.patchValue({
      conexoes: Number(opcao.value)
    })
  }

  paradaSelecionada(opcao: OpcaoDeParada): boolean {
    return this.selecionada == opcao
  }

  paradaInclusa(opcao: OpcaoDeParada): boolean {
    if (!this.selecionada) {
      return false
    }
    return this.selecionada.value > opcao.value
  }

  
}
