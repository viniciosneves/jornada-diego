import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
export class ParadasComponent implements OnInit {

  selecionada: OpcaoDeParada | null = null

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
  conexoesControl: FormControl<number | null>

  constructor(private formBuscaService: FormBuscaService) {

    this.conexoesControl = this.formBuscaService.obterControle<number | null>('conexoes')

  }

  ngOnInit(): void {

    this.conexoesControl.valueChanges.subscribe(value => {
      if (!value) {
        this.selecionada = null
      }
    })
  }

  alternarParada(opcao: OpcaoDeParada, checked: boolean): void {
    if (!checked) {
      this.selecionada = null
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
    return this.selecionada === opcao
  }

  paradaInclusa(opcao: OpcaoDeParada): boolean {
    if (!this.selecionada) {
      return false
    }
    return this.selecionada.value > opcao.value
  }


}
