import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { PassagemService } from 'src/app/core/services/passagem.service';

@Component({
  selector: 'app-precos',
  templateUrl: './precos.component.html',
  styleUrls: ['./precos.component.scss']
})
export class PrecosComponent {
  precoMin?: number
  precoMax?: number
  precoMinControl: FormControl<number>; 
  precoMaxControl: FormControl<number>; 
  constructor(public formBuscaService: FormBuscaService,
    public passagemService: PassagemService) {
    this.precoMinControl = formBuscaService.obterControle('precoMin')
    this.precoMaxControl = formBuscaService.obterControle('precoMax')
  }
}
